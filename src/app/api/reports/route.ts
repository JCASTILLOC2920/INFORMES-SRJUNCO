import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Validation Helper for Medical Reports
function validateReportData(body: any) {
  const errors: string[] = [];

  // Mandatory Clinical Fields
  if (!body.attentionCode) errors.push('Código de Atención es requerido.');
  if (body.attentionCode && !/^[QIC]-/.test(body.attentionCode)) {
    errors.push('El Código de Atención debe empezar con Q-, I- o C-.');
  }

  if (!body.patientDni) errors.push('DNI del paciente es requerido.');
  if (body.patientDni && !/^\d{8}$/.test(body.patientDni)) {
    errors.push('El DNI debe tener exactamente 8 dígitos.');
  }

  if (!body.patientFirstName) errors.push('Nombres del paciente son requeridos.');
  if (!body.patientLastName) errors.push('Apellidos del paciente son requeridos.');
  if (!body.gender || body.gender === 'SELECCIONAR') errors.push('Género es requerido.');
  if (!body.serviceType || body.serviceType === 'SELECCIONAR') errors.push('Tipo de servicio es requerido.');

  // Numeric Validation
  const age = parseInt(body.age);
  if (!isNaN(age) && (age < 0 || age > 120)) {
    errors.push('La edad debe estar entre 0 y 120 años.');
  }

  const cost = parseFloat(body.cost) || 0;
  const prepayment = parseFloat(body.prepayment) || 0;
  const transportCost = parseFloat(body.transportCost) || 0;

  if (cost < 0 || prepayment < 0 || transportCost < 0) {
    errors.push('Los valores financieros no pueden ser negativos.');
  }

  if (prepayment > (cost + transportCost)) {
    errors.push('El adelanto no puede ser mayor que el costo total.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    parsedData: {
      cost,
      prepayment,
      transportCost,
      age: isNaN(age) ? null : age,
      balance: (cost + transportCost) - prepayment
    }
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100'); // Aumentado por defecto
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Filtros
    const attentionCode = searchParams.get('attentionCode');
    const dni = searchParams.get('dni');
    const name = searchParams.get('name');
    const solicitor = searchParams.get('solicitor');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type'); // Q, I, C

    const where: any = {};

    if (attentionCode) where.attentionCode = { contains: attentionCode, mode: 'insensitive' };
    if (dni) where.patientDni = { contains: dni };
    if (solicitor) where.solicitor = { contains: solicitor, mode: 'insensitive' };
    
    if (name) {
      where.OR = [
        { patientFirstName: { contains: name, mode: 'insensitive' } },
        { patientLastName: { contains: name, mode: 'insensitive' } },
      ];
    }

    if (type && type !== 'ALL') {
      where.attentionCode = { ...where.attentionCode, startsWith: type };
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
      orderBy: { receptionDate: 'desc' }, // Ordenar por fecha de recepción mejor
      take: Math.min(limit, 200),
      skip: offset,
    });
    return NextResponse.json(reports);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateReportData(body);

    if (!validation.isValid) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    const { parsedData } = validation;

    const report = await prisma.report.create({
      data: {
        attentionCode: body.attentionCode,
        patientDni: body.patientDni,
        patientFirstName: body.patientFirstName,
        patientLastName: body.patientLastName,
        age: parsedData.age,
        phone: body.phone,
        gender: body.gender,
        serviceType: body.serviceType,
        solicitor: body.solicitor,
        sampleType: body.sampleType,
        receptionDate: body.registrationDate ? new Date(body.registrationDate) : new Date(),
        reportDate: body.reportDate ? new Date(body.reportDate) : null,
        macroscopy: body.macroscopy,
        microscopy: body.microscopy,
        diagnosis: body.diagnosis,
        cost: parsedData.cost,
        transportCost: parsedData.transportCost,
        isPendingPayment: body.isPendingPayment || false,
        prepayment: parsedData.prepayment,
        balance: parsedData.balance,
        contactName: body.contactName,
        contactPhone: body.contactPhone,
        studyMotive: body.studyMotive,
        clinic: body.clinic,
        expectedDeliveryDate: body.expectedDeliveryDate ? new Date(body.expectedDeliveryDate) : null,
        hasImages: body.hasImages || false,
        imageUrls: body.imageUrls || [],
      },
    });
    return NextResponse.json(report);
  } catch (error: any) {
    console.error('API Report Error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ errors: ['El Código de Atención ya existe en el sistema.'] }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const validation = validateReportData(body);
    if (!validation.isValid) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    const { parsedData } = validation;

    const report = await prisma.report.update({
      where: { id },
      data: {
        attentionCode: body.attentionCode,
        patientDni: body.patientDni,
        patientFirstName: body.patientFirstName,
        patientLastName: body.patientLastName,
        age: parsedData.age,
        phone: body.phone,
        gender: body.gender,
        serviceType: body.serviceType,
        solicitor: body.solicitor,
        sampleType: body.sampleType,
        macroscopy: body.macroscopy,
        microscopy: body.microscopy,
        diagnosis: body.diagnosis,
        cost: parsedData.cost,
        transportCost: parsedData.transportCost,
        prepayment: parsedData.prepayment,
        balance: parsedData.balance,
        contactName: body.contactName,
        contactPhone: body.contactPhone,
        studyMotive: body.studyMotive,
        clinic: body.clinic,
        expectedDeliveryDate: body.expectedDeliveryDate ? new Date(body.expectedDeliveryDate) : undefined,
      },
    });
    return NextResponse.json(report);
  } catch (error) {
    console.error('API Update Error:', error);
    return NextResponse.json({ error: 'Failed to update report' }, { status: 500 });
  }
}


