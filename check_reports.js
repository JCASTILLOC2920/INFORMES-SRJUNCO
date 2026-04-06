const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    console.log('--- AUDITORÍA DE RECUPERACIÓN DE DATOS (ANTIGRAVITY) ---');
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
          id: true,
          attentionCode: true,
          patientFirstName: true,
          patientLastName: true,
          createdAt: true
      }
    });

    if (reports.length === 0) {
      console.log('ALERTA: La base de datos está VACÍA o no contiene reportes.');
    } else {
      console.log(`Se encontraron ${reports.length} reportes recientes:`);
      reports.forEach(r => {
        console.log(`[${r.createdAt.toISOString()}] ID: ${r.id} | CODE: ${r.attentionCode} | PACIENTE: ${r.patientLastName}, ${r.patientFirstName}`);
      });
    }
  } catch (error) {
    console.error('ERROR CRÍTICO AL CONECTAR A LA DB:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
