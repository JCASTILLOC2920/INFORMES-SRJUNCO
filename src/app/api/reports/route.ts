import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ReportSchema } from '@/types/ReportSchema';
import { Prisma } from '@prisma/client';

/**
 * PROTOCOLO ANTIGRAVITY - GENERACIÓN ATÓMICA DE CÓDIGO
 * Genera el siguiente código de atención en una transacción para evitar colisiones.
 */
async function getNextAttentionCode(tx: Prisma.TransactionClient) {
  const currentYearShort = new Date().getFullYear().toString().slice(-2);
  const prefix = `JQ${currentYearShort}-`;
  
  // Buscamos el último código del año actual
  const lastReport = await tx.report.findFirst({
    where: {
      attentionCode: {
        startsWith: prefix
      }
    },
    orderBy: {
      attentionCode: 'desc'
    },
    select: {
      attentionCode: true
    }
  });

  let nextNumber = 529; // Número base inicial de seguridad
  if (lastReport) {
    const parts = lastReport.attentionCode.split('-');
    if (parts.length > 1) {
      const lastNum = parseInt(parts[1], 10);
      if (!isNaN(lastNum)) {
        nextNumber = lastNum + 1;
      }
    }
  }

  return `${prefix}${nextNumber}`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 200);
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const where: any = {};
    const attentionCode = searchParams.get('attentionCode');
    const dni = searchParams.get('dni');
    const name = searchParams.get('name');
    const type = searchParams.get('type');
    const patientFirstName = searchParams.get('patientFirstName');
    const patientLastName = searchParams.get('patientLastName');
    const solicitor = searchParams.get('solicitor');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (attentionCode) where.attentionCode = { contains: attentionCode, mode: 'insensitive' };
    if (dni) where.patientDni = { contains: dni };
    if (patientFirstName) where.patientFirstName = { contains: patientFirstName, mode: 'insensitive' };
    if (patientLastName) where.patientLastName = { contains: patientLastName, mode: 'insensitive' };
    if (solicitor) where.solicitor = { contains: solicitor, mode: 'insensitive' };
    
    if (name) {
      where.OR = [
        { patientFirstName: { contains: name, mode: 'insensitive' } },
        { patientLastName: { contains: name, mode: 'insensitive' } },
        { patientDni: { contains: name } },
      ];
    }
    
    if (type && type !== 'ALL') {
      where.serviceType = type;
    }

    if (startDate || endDate) {
      where.receptionDate = {};
      if (startDate) where.receptionDate.gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.receptionDate.lte = end;
      }
    }

    const reports = await prisma.report.findMany({
      where,
      orderBy: [
        { receptionDate: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit,
      skip: offset,
      select: {
        id: true,
        attentionCode: true,
        patientDni: true,
        patientFirstName: true,
        patientLastName: true,
        age: true,
        gender: true,
        serviceType: true,
        solicitor: true,
        sampleType: true,
        receptionDate: true,
        reportDate: true,
        cost: true,
        prepayment: true,
        balance: true,
        expectedDeliveryDate: true,
        macroscopy: true,
        microscopy: true,
        diagnosis: true,
        studyMotive: true,
        clinic: true,
        contactName: true,
        contactPhone: true
      }
    });
    
    return NextResponse.json(reports);
  } catch (error) {
    console.error('[ANTIGRAVITY_AUDIT] GET Error:', error);
    return NextResponse.json({ error: 'Uplink Failure' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID de registro requerido' }, { status: 400 });

    await prisma.report.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Registro purgado exitosamente.' });
  } catch (error: any) {
    console.error('[ANTIGRAVITY_API] DELETE Error:', error);
    return NextResponse.json({ error: 'Fallo en purga de datos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    
    // 1. VALIDACIÓN RIGUROSA (MILITARY GRADE)
    const result = ReportSchema.safeParse(rawBody);
    if (!result.success) {
      return NextResponse.json({ 
        errors: result.error.issues.map((e: any) => `${e.path.join('.')}: ${e.message}`) 
      }, { status: 400 });
    }

    const data = result.data;

    // 2. EJECUCIÓN ATÓMICA
    const report = await (prisma as any).$transaction(async (tx: any) => {
      // Si el cliente no envió código (o para asegurar unicidad), generamos uno nuevo
      const finalCode = data.attentionCode || await getNextAttentionCode(tx);
      
      return await tx.report.create({
        data: {
          attentionCode: finalCode,
          patientDni: data.patientDni || '',
          patientFirstName: data.patientFirstName,
          patientLastName: data.patientLastName,
          age: data.age,
          phone: data.phone,
          gender: data.gender,
          serviceType: data.serviceType,
          solicitor: data.solicitor,
          sampleType: data.sampleType,
          receptionDate: data.registrationDate ? (() => {
            const d = new Date(data.registrationDate);
            const now = new Date();
            // Inyectar precisión temporal para evitar colisiones a medianoche (00:00:00)
            d.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
            return d;
          })() : new Date(),
          macroscopy: data.macroscopy,
          microscopy: data.microscopy,
          diagnosis: data.diagnosis,
          cost: data.cost,
          transportCost: data.transportCost,
          isPendingPayment: data.isPendingPayment,
          prepayment: data.prepayment,
          balance: (data.cost + data.transportCost) - data.prepayment,
          contactName: data.contactName,
          contactPhone: data.contactPhone,
          studyMotive: data.studyMotive,
          clinic: data.clinic,
          expectedDeliveryDate: data.expectedDeliveryDate ? new Date(data.expectedDeliveryDate) : null,
        },
      });
    }, {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable // Máximo aislamiento para unicidad
    });

    return NextResponse.json(report);

  } catch (error: any) {
    console.error('[ANTIGRAVITY_API] POST Error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ errors: ['CÓDIGO DE ATENCIÓN REPETIDO'] }, { status: 409 });
    }
    return NextResponse.json({ error: 'Critical System Failure' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const result = ReportSchema.safeParse(updateData);
    if (!result.success) {
      return NextResponse.json({ errors: result.error.issues.map((e: any) => e.message) }, { status: 400 });
    }

    const { data } = result;

    const report = await prisma.report.update({
      where: { id },
      data: {
        ...data,
        receptionDate: data.registrationDate ? new Date(data.registrationDate) : undefined,
        expectedDeliveryDate: data.expectedDeliveryDate ? new Date(data.expectedDeliveryDate) : undefined,
        balance: (data.cost + data.transportCost) - data.prepayment,
      } as any,
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error('[ANTIGRAVITY_API] PATCH Error:', error);
    return NextResponse.json({ error: 'Uplink Modification Failure' }, { status: 500 });
  }
}
