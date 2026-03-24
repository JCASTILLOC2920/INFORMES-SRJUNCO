import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import ImageModule from 'docxtemplater-image-module-free';
import { saveAs } from 'file-saver';

export interface ReportData {
  atendido: string;
  nombre: string;
  dni: string;
  edad: string;
  procede: string;
  material: string;
  macroscopia: string;
  microscopia: string;
  diagnostico: string;
  paga: string;
  adelanta: string;
  resta: string;
  fecha_ext: string;
  img1?: ArrayBuffer | null;
  img2?: ArrayBuffer | null;
  img3?: ArrayBuffer | null;
  img4?: ArrayBuffer | null;
}

export const generateWordReport = async (data: ReportData) => {
  try {
    const response = await fetch('/plantilla.docx');
    if (!response.ok) throw new Error('No se pudo cargar la plantilla (.docx)');
    
    const arrayBuffer = await response.arrayBuffer();
    const zip = new PizZip(arrayBuffer);

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
        return [300, 225]; // slightly smaller to fit multiple on a page
      }
    };

    const imageModule = new (ImageModule as any)(imageOptions);

    const doc = new Docxtemplater(zip, {
      linebreaks: true,
      paragraphLoop: true,
      modules: [imageModule]
    });

    // Mirroring legacy data structure exactly
    const templateData = {
      atendido: data.atendido || '--',
      nombre: data.nombre || '--',
      dni: data.dni || '--',
      edad: data.edad || '--',
      procede: data.procede || '--',
      material: data.material || '--',
      macroscopia: data.macroscopia || 'No se registraron hallazgos.',
      microscopia: data.microscopia || 'No se registraron hallazgos.',
      diagnostico: data.diagnostico || 'Pendiente.',
      paga: data.paga || '0',
      adelanta: data.adelanta || '0',
      resta: data.resta || '0',
      fecha_ext: data.fecha_ext || '--',
      img1: data.img1,
      img2: data.img2,
      img3: data.img3,
      img4: data.img4
    };

    await doc.renderAsync(templateData);

    const out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const fileName = `Informe_${data.atendido}_${data.nombre.replace(/\s+/g, '_')}.docx`;
    saveAs(out, fileName);
    
    return true;
  } catch (error) {
    console.error('Error in Word generation:', error);
    throw error;
  }
};
