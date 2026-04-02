import { z } from 'zod';

export const ReportSchema = z.object({
  attentionCode: z.string().optional(), // Now optional as the server will generate it if missing
  patientDni: z.string().regex(/^\d{8}$/, 'El DNI debe tener 8 dígitos').or(z.literal('')),
  patientFirstName: z.string().min(1, 'Nombres requeridos'),
  patientLastName: z.string().min(1, 'Apellidos requeridos'),
  age: z.string().transform((val) => (val === '' ? null : parseInt(val, 10)))
    .pipe(z.number().min(0).max(120).nullable()),
  gender: z.enum(['MASCULINO', 'FEMENINO', 'SELECCIONAR']).refine((val) => val !== 'SELECCIONAR', 'Sexo requerido'),
  serviceType: z.enum(['PAPANICOLAO', 'HEMATOXILINA EOSINA', 'SELECCIONAR']).refine((val) => val !== 'SELECCIONAR', 'Servicio requerido'),
  registrationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido'),
  cost: z.string().transform((val) => parseFloat(val || '0')),
  prepayment: z.string().transform((val) => parseFloat(val || '0')),
  transportCost: z.string().transform((val) => parseFloat(val || '0')),
  isPendingPayment: z.boolean().default(false),
  phone: z.string().optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  solicitor: z.string(),
  studyMotive: z.string().optional(),
  clinic: z.string().optional(),
  expectedDeliveryDate: z.string().optional(),
  sampleType: z.string().optional(),
  macroscopy: z.string().optional(),
  microscopy: z.string().optional(),
  diagnosis: z.string().optional(),
});

export type ReportInput = z.infer<typeof ReportSchema>;
