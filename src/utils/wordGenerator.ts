import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import ImageModule from 'docxtemplater-image-module-free';
import { saveAs } from 'file-saver';

export interface ReportData {
  patientFirstName: string;
  patientLastName: string;
  age: string;
  patientId: string;
  receptionDate: string;
  reportDate: string;
  ind: string;
  muestra: string;
  macroscopy: string;
  microscopy: string;
  diagnosis: string;
  fotoMacro?: ArrayBuffer | null;
  fotoMicro?: ArrayBuffer | null;
}

export const generateWordReport = async (data: ReportData) => {
  try {
    // Fetch the template from the public folder or absolute path
    // In Next.js, files in /public are served at /
    const response = await fetch('/plantilla.docx');
    if (!response.ok) throw new Error('No se pudo cargar la plantilla (.docx)');
    
    const arrayBuffer = await response.arrayBuffer();
    const zip = new PizZip(arrayBuffer);

    // Image module configuration
    const imageOptions = {
      centered: false,
      getImage(tagValue: any) {
        return new Promise((resolve) => {
          if (!tagValue) {
            // Transparent 1x1 pixel if no image provided
            const emptyImageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";
            const binary_string = window.atob(emptyImageBase64);
            const len = binary_string.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) bytes[i] = binary_string.charCodeAt(i);
            resolve(bytes.buffer);
          } else {
            resolve(tagValue);
          }
        });
      },
      getSize() {
        return [400, 300]; // Fixed size [width, height]
      }
    };

    const imageModule = new (ImageModule as any)(imageOptions);

    const doc = new Docxtemplater(zip, {
      linebreaks: true,
      paragraphLoop: true,
      modules: [imageModule]
    });

    // Prepare data for template
    const templateData = {
      ...data,
      patientName: `${data.patientFirstName} ${data.patientLastName}`,
      age: data.age || '--',
      receptionDate: data.receptionDate || '--',
      reportDate: data.reportDate || '--',
      ind: data.ind || '--',
      muestra: data.muestra || '--',
      macroscopy: data.macroscopy || 'No se registraron hallazgos.',
      microscopy: data.microscopy || 'No se registraron hallazgos.',
      diagnosis: data.diagnosis || 'Pendiente.',
    };

    await doc.renderAsync(templateData);

    const out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const fileName = `Informe_${data.patientFirstName}_${data.patientLastName}.docx`.replace(/\s+/g, '_');
    saveAs(out, fileName);
    
    return true;
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};
