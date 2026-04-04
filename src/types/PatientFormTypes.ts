export interface ReportFormData {
  serviceType: string;
  registrationDate: string;
  attentionCode: string;
  patientDni: string;
  patientFirstName: string;
  patientLastName: string;
  age: string;
  phone: string;
  gender: string;
  contactName: string;
  contactPhone: string;
  solicitor: string;
  studyMotive: string;
  transportCost: string;
  cost: string;
  isPendingPayment: boolean;
  prepayment: string;
  clinic: string;
  expectedDeliveryDate: string;
  macroscopy: string;
  microscopy: string;
  diagnosis: string;
  sampleType: string;
  [key: string]: any; // Permite indexación dinámica para handleInputChange
}
