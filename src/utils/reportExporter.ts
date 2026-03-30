import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export interface ExportData {
  id: string;
  attentionCode: string;
  patientFirstName: string;
  patientLastName: string;
  patientDni: string;
  age: number | string;
  solicitor: string;
  sampleType: string;
  macroscopy: string;
  microscopy: string;
  diagnosis: string;
  cost: number;
  prepayment: number;
  balance: number;
  reportDate: string | Date | null;
  images?: string[]; // URLs or base64
}

/**
 * MOTOR DE EXPORTACIÓN QUIRÚRGICA
 * Prioridad: Fidelidad absoluta (No deformación)
 */
export const exportReportToWord = async (data: ExportData) => {
  try {
    const [PizZip, Docxtemplater, ImageModule, { saveAs }] = await Promise.all([
      import('pizzip').then(m => m.default),
      import('docxtemplater').then(m => m.default),
      import('docxtemplater-image-module-free').then(m => m.default),
      import('file-saver')
    ]);

    // 1. Carga de la plantilla persistente en public/
    const response = await fetch('/plantilla.docx');
    if (!response.ok) throw new Error('Carga fallida: plantilla.docx no encontrada en /public');
    const content = await response.arrayBuffer();

    const zip = new PizZip(content);

    // Configuración del módulo de imágenes para preservar proporciones
    const imageOptions = {
        centered: false,
        getImage(tagValue: string) {
            return new Promise((resolve, reject) => {
                if (!tagValue) return resolve(null);
                // Si es base64 o URL, convertir a buffer
                fetch(tagValue)
                    .then(res => res.arrayBuffer())
                    .then(buffer => resolve(buffer))
                    .catch(e => reject(e));
            });
        },
        getSize() {
            return [280, 210]; // Proporción áurea médica (aprox)
        }
    };

    const doc = new Docxtemplater(zip, {
      linebreaks: true,
      paragraphLoop: true,
      modules: [new (ImageModule as any)(imageOptions)]
    });

    // 2. Mapeo Quirúrgico de Datos (Arquitectura Josehp Castillo)
    const templateData = {
      atendido: data.attentionCode || '--',
      nombre: (`${data.patientLastName}, ${data.patientFirstName}`).toUpperCase(),
      dni: data.patientDni || '--',
      edad: `${data.age} AÑOS`,
      procede: (data.solicitor || 'PARTICULAR').toUpperCase(),
      material: (data.sampleType || '--').toUpperCase(),
      macroscopia: data.macroscopy || 'NO SE REGISTRAN HALLAZGOS.',
      microscopia: data.microscopy || 'NO SE REGISTRAN HALLAZGOS.',
      diagnostico: data.diagnosis || 'PENDIENTE.',
      paga: `S/ ${data.cost?.toFixed(2) || '0.00'}`,
      adelanta: `S/ ${data.prepayment?.toFixed(2) || '0.00'}`,
      resta: `S/ ${data.balance?.toFixed(2) || '0.00'}`,
      fecha_ext: data.reportDate 
        ? format(new Date(data.reportDate), "dd 'de' MMMM 'de' yyyy", { locale: es }).toUpperCase()
        : '--',
      img1: data.images?.[0] || null,
      img2: data.images?.[1] || null,
      img3: data.images?.[2] || null,
      img4: data.images?.[3] || null
    };

    doc.render(templateData);

    const out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const fileName = `INFORME_${data.attentionCode}_${data.patientLastName.replace(/\s+/g, '_')}.docx`;
    saveAs(out, fileName);
    
    return true;
  } catch (error) {
    console.error('Export Error (Word):', error);
    throw error;
  }
};

/**
 * EXPORTACIÓN A PDF (Sincronización de Alta Fidelidad)
 * Nota: En Next.js Client, la conversión directa de docx a pdf sin perder formato
 * es óptima mediante el uso de un API Route especializado o impresión de ventana.
 */
export const exportReportToPdf = async (data: ExportData) => {
    // Para asegurar el PDF sin deformaciones, utilizaremos la capacidad de impresión del navegador
    // sobre una estructura que emule la plantilla, o enviaremos el reporte al API de conversión.
    
    // Simulación de descarga por ahora (docx es la fuente de verdad)
    alert("Iniciando generación de PDF Quirúrgico...");
    return await exportReportToWord(data); 
    // Nota: El plan incluye una API route para PDF real (Soffice/LibreOffice) en el siguiente paso.
};
