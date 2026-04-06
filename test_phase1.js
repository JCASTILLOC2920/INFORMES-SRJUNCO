const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testPhase1() {
  console.log('--- INICIANDO TEST FASE 1: REFUERZO DE API ---');
  
  const dateStr = '2026-04-05';
  const prefix = 'TEST-';
  const code1 = `${prefix}001`;
  const code2 = `${prefix}002`;

  try {
    // 1. Limpiar basura previa
    await prisma.report.deleteMany({
      where: { attentionCode: { startsWith: prefix } }
    });

    console.log('1. Creando primer reporte (Simulación de POST)...');
    const d1 = new Date(dateStr);
    const now1 = new Date();
    d1.setHours(now1.getHours(), now1.getMinutes(), now1.getSeconds(), now1.getMilliseconds());
    
    await prisma.report.create({
      data: {
        attentionCode: code1,
        patientDni: '11111111',
        patientFirstName: 'Test1',
        patientLastName: 'Batch1',
        receptionDate: d1,
        serviceType: 'HEMATOXILINA EOSINA',
        solicitor: 'DR. TEST'
      }
    });

    // Esperar un poco para asegurar diferencia en createdAt y precision temporal
    await new Promise(r => setTimeout(r, 1000));

    console.log('2. Creando segundo reporte (Simulación de POST) para el mismo día...');
    const d2 = new Date(dateStr);
    const now2 = new Date();
    d2.setHours(now2.getHours(), now2.getMinutes(), now2.getSeconds(), now2.getMilliseconds());

    await prisma.report.create({
      data: {
        attentionCode: code2,
        patientDni: '22222222',
        patientFirstName: 'Test2',
        patientLastName: 'Batch1',
        receptionDate: d2,
        serviceType: 'HEMATOXILINA EOSINA',
        solicitor: 'DR. TEST'
      }
    });

    console.log('3. Consultando registros (Simulación de GET)...');
    const reports = await prisma.report.findMany({
      where: { attentionCode: { startsWith: prefix } },
      orderBy: [
        { receptionDate: 'desc' },
        { createdAt: 'desc' }
      ],
      take: 2
    });

    console.log('Resultados obtenidos:');
    reports.forEach((r, i) => {
      console.log(`[${i}] Code: ${r.attentionCode}, ReceptionDate: ${r.receptionDate.toISOString()}, CreatedAt: ${r.createdAt.toISOString()}`);
    });

    if (reports[0].attentionCode === code2 && reports[1].attentionCode === code1) {
      console.log('✅ EXITO: El reporte mas reciente aparece primero.');
    } else {
      console.log('❌ FALLO: El ordenamiento no es el esperado.');
    }

  } catch (error) {
    console.error('Error durante el test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPhase1();
