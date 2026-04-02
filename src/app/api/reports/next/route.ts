import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * API DE CONSULTA DE CORRELATIVO
 * Devuelve el próximo código de atención disponible sin confirmarlo.
 */
export async function GET() {
  try {
    const currentYearShort = new Date().getFullYear().toString().slice(-2);
    const prefix = `JQ${currentYearShort}-`;
    
    // Buscamos el último código del año actual en la base de datos
    const lastReport = await prisma.report.findFirst({
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

    let nextNumber = 529; // Número base inicial de seguridad coincidiendo con la lógica principal
    if (lastReport) {
      const parts = lastReport.attentionCode.split('-');
      if (parts.length > 1) {
        const lastNum = parseInt(parts[1], 10);
        if (!isNaN(lastNum)) {
          nextNumber = lastNum + 1;
        }
      }
    }

    const nextCode = `${prefix}${nextNumber}`;
    return NextResponse.json({ nextCode });
  } catch (error) {
    console.error('[ANTIGRAVITY_API] NEXT_CODE Error:', error);
    return NextResponse.json({ error: 'Fallo al consultar correlativo' }, { status: 500 });
  }
}
