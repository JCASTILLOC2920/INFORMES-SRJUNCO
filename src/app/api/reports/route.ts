import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // OPTIMIZACIÓN O(1): Paginación técnica para escalabilidad masiva
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
      take: Math.min(limit, 100), // Cap de seguridad
      skip: offset,
    });
    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Ensure numeric values are valid
    const cost = parseFloat(body.cost) || 0;
    const prepayment = parseFloat(body.prepayment) || 0;
    const balance = cost - prepayment;
    const age = parseInt(body.age) || null;

    const report = await prisma.report.create({
      data: {
        attentionCode: body.attentionCode,
        patientDni: body.patientDni,
        patientFirstName: body.patientFirstName,
        patientLastName: body.patientLastName,
        age: age,
        // @ts-ignore
        phone: body.phone,
        gender: body.gender,
        serviceType: body.serviceType,
        solicitor: body.solicitor,
        sampleType: body.sampleType,
        receptionDate: body.receptionDate ? new Date(body.receptionDate) : null,
        reportDate: body.reportDate ? new Date(body.reportDate) : null,
        macroscopy: body.macroscopy,
        microscopy: body.microscopy,
        diagnosis: body.diagnosis,
        cost: cost,
        transportCost: parseFloat(body.transportCost) || 0,
        isPendingPayment: body.isPendingPayment || false,
        prepayment: prepayment,
        balance: balance,
        contactName: body.contactName,
        contactPhone: body.contactPhone,
        studyMotive: body.studyMotive,
        clinic: body.clinic,
        expectedDeliveryDate: body.expectedDeliveryDate ? new Date(body.expectedDeliveryDate) : null,
        hasImages: body.hasImages || false,
      },
    });
    return NextResponse.json(report);
  } catch (error) {
    console.error('API Report Error:', error);
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const cost = parseFloat(body.cost) || 0;
    const prepayment = parseFloat(body.prepayment) || 0;
    const balance = cost - prepayment;

    const report = await prisma.report.update({
      where: { id },
      data: {
        attentionCode: body.attentionCode,
        patientDni: body.patientDni,
        patientFirstName: body.patientFirstName,
        patientLastName: body.patientLastName,
        age: body.age ? parseInt(body.age) : undefined,
        // @ts-ignore
        phone: body.phone,
        gender: body.gender,
        serviceType: body.serviceType,
        solicitor: body.solicitor,
        sampleType: body.sampleType,
        macroscopy: body.macroscopy,
        microscopy: body.microscopy,
        diagnosis: body.diagnosis,
        cost,
        prepayment,
        balance,
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


