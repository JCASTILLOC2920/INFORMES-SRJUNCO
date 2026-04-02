/**
 * ANTIGRAVITY STRESS SIMULATOR v1.2
 * Objetivo: Validar la integridad atómica de la generación de IDs bajo carga concurrente.
 * Alineado con el Esquema Zod de Producción.
 */

const API_URL = 'http://localhost:3003/api/reports'; 
const CONCURRENT_REQUESTS = 10;

const mockPatient = () => ({
  patientDni: Math.random().toString().slice(2, 10),
  patientFirstName: "STRESS",
  patientLastName: `TEST_${Math.floor(Math.random() * 1000)}`,
  age: "30", // Zod expects string for transform
  gender: "MASCULINO",
  serviceType: "HEMATOXILINA EOSINA",
  solicitor: "SIMULADOR ANTIGRAVITY",
  sampleType: "SANGRE_CONTROL",
  registrationDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  cost: "100", // Zod expects string for transform
  prepayment: "50", // Zod expects string for transform
  transportCost: "0",
  isPendingPayment: true,
  macroscopy: "Simulación de carga masiva para prueba de resiliencia.",
  microscopy: "Validación de concurrencia en transacción serializable.",
  diagnosis: "SISTEMA ESTABLE"
});

async function runSimulation() {
  console.log(`[ANTIGRAVITY] Iniciando simulación de ${CONCURRENT_REQUESTS} registros concurrentes...`);
  
  const start = Date.now();
  const promises = Array.from({ length: CONCURRENT_REQUESTS }).map(async (_, i) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockPatient())
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, code: data.attentionCode, id: i };
      } else {
        return { success: false, error: data.errors || data.error, id: i };
      }
    } catch (err) {
      return { success: false, error: err.message, id: i };
    }
  });

  const results = await Promise.all(promises);
  const end = Date.now();

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const codes = successful.map(r => r.code);
  const uniqueCodes = new Set(codes);

  console.log('\n--- RESULTADOS DE SIMULACIÓN ---');
  console.log(`Tiempo total: ${end - start}ms`);
  console.log(`Exitosos: ${successful.length}`);
  console.log(`Fallidos: ${failed.length}`);
  console.log(`Códigos únicos generados: ${uniqueCodes.size} / ${successful.length}`);

  if (successful.length > 0) {
    console.log('Códigos generados:', codes.sort());
  }

  if (uniqueCodes.size === successful.length && failed.length === 0) {
    console.log('\n✅ PRUEBA SUPERADA: No se detectaron colisiones de ID ni fallos de concurrencia.');
    console.log('El aislamiento SERIALIZABLE de la base de datos ha funcionado correctamente.');
  } else {
    console.error('\n❌ PRUEBA FALLIDA: Se detectaron inconsistencias.');
    if (failed.length > 0) {
      console.log('Errores detectados:', failed.map(f => f.error));
    }
  }
}

runSimulation();
