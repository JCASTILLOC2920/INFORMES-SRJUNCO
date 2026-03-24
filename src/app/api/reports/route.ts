import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const report = await prisma.report.create({
      data: {
        attentionCode: body.attentionCode,
        patientDni: body.patientDni,
        patientFirstName: body.patientFirstName,
        patientLastName: body.patientLastName,
        age: parseInt(body.age) || null,
        solicitor: body.solicitor,
        sampleType: body.sampleType,
        receptionDate: body.receptionDate ? new Date(body.receptionDate) : null,
        reportDate: body.reportDate ? new Date(body.reportDate) : null,
        macroscopy: body.macroscopy,
        microscopy: body.microscopy,
        diagnosis: body.diagnosis,
        cost: parseFloat(body.cost) || 0,
        prepayment: parseFloat(body.prepayment) || 0,
        balance: parseFloat(body.cost) - parseFloat(body.prepayment) || 0,
        hasImages: body.hasImages || false,
      },
    });
    return NextResponse.json(report);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 });
  }
}
