import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * SERVICIO DE GESTIÓN DE MÉDICOS (MED-CORE)
 * Implementa el motor CRUD para la base de datos de especialistas del JC Path Lab.
 */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    const where = query ? {
      OR: [
        { name: { contains: query, mode: 'insensitive' as const } },
        { licenseNumber: { contains: query } }
      ]
    } : {};

    const doctors = await prisma.doctor.findMany({
      where,
      orderBy: { name: 'asc' }
    });
    
    return NextResponse.json(doctors);
  } catch (error) {
    console.error('[MED_CORE] GET ERROR:', error);
    return NextResponse.json({ error: 'Uplink Failure' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const doctor = await prisma.doctor.create({
      data: {
        type: data.type,
        province: data.province,
        name: data.name,
        specialization: data.specialization,
        licenseNumber: data.licenseNumber,
        phone: data.phone,
        email: data.email,
        signatureUrl: data.signatureUrl
      }
    });
    return NextResponse.json(doctor);
  } catch (error: any) {
    console.error('[MED_CORE] POST ERROR:', error);
    return NextResponse.json({ 
      error: 'Data Persist Failure', 
      details: error.message || String(error)
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    
    await prisma.doctor.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[MED_CORE] DELETE ERROR:', error);
    return NextResponse.json({ error: 'Purge Failure' }, { status: 500 });
  }
}
