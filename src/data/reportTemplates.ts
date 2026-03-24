export interface ReportTemplate {
  name: string;
  material: string;
  macroscopia: string;
  microscopia: string;
  diagnostico: string;
}

export const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    name: "Gastritis Crónica",
    material: "Biopsia Gástrica (Antro/Cuerpo)",
    macroscopia: "Se reciben múltiples fragmentos de tejido pardo-grisáceo, de consistencia blanda, miden en conjunto 0.4 x 0.3 x 0.2 cm.",
    microscopia: "Los cortes histológicos muestran mucosa gástrica con arquitectura conservada. La lámina propia presenta un infiltrado inflamatorio crónico de tipo linfo-plasmocitario de intensidad moderada, asociado a congestión vascular. No se observa actividad neutrofílica ni metaplasia intestinal. No se identifican bacilos compatibles con Helicobacter pylori en la coloración de H-E.",
    diagnostico: "GASTRITIS CRÓNICA MODERADA.\n- ACTIVIDAD: NEGATIVO.\n- HELICOBACTER PYLORI: NO SE OBSERVA (H-E)."
  },
  {
    name: "Apendicitis Aguda",
    material: "Apéndice Cecal",
    macroscopia: "Se recibe órgano tubular que mide 7.5 x 1.2 cm. La superficie externa es congestiva, con áreas recubiertas por material fibrino-purulento. Al corte, la luz está ocupada por material fecalito y pus. La pared mide 0.4 cm de espesor.",
    microscopia: "Se reconoce pared apendicular con ulceración de la mucosa y denso infiltrado inflamatorio agudo transmural compuesto por neutrófilos, que alcanza la serosa. Se observa congestión vascular marcada y focos de hemorragia reciente.",
    diagnostico: "APENDICITIS AGUDA SUPURADA.\n- PERIAPENDICITIS AGUDA."
  },
  {
    name: "Colecistitis Crónica",
    material: "Vesícula Biliar",
    macroscopia: "Vesícula biliar de 8.5 x 4.0 cm. La serosa es lisa y brillante. Al corte, la pared mide 0.3 cm de espesor. La mucosa es aterciopelada de color verde oscuro. Se encuentran múltiples cálculos facetados de color amarillento que miden entre 0.5 y 1.2 cm.",
    microscopia: "Los cortes muestran pared vesicular con aplanamiento de los pliegues mucosos. La lámina propia y la muscular presentan fibrosis e infiltrado inflamatorio crónico linfo-mononuclear escaso. Se observan senos de Rokitansky-Aschoff.",
    diagnostico: "COLECISTITIS CRÓNICA CALCULOSA."
  },
  {
    name: "Pólipo Adenomatoso",
    material: "Pólipo de Colon",
    macroscopia: "Se recibe fragmento de tejido polipoide de 0.8 x 0.6 cm, de superficie lobulada y color parduzco.",
    microscopia: "Los cortes muestran una proliferación neoplásica epitelial benigna dispuesta en túbulos revestidos por células con núcleos elongados, hipercromáticos y pseudoestratificados. Se observa pérdida de la mucosecreción habitual. No hay evidencia de invasión a la submucosa.",
    diagnostico: "ADENOMA TUBULAR CON DISPLASIA DE BAJO GRADO.\n- MÁRGENES DE RESECCIÓN LIBRES."
  }
];
