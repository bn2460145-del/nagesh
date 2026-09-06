import { HealthTimelineEvent, MedicineReminder, ActiveConsent, PendingConsentRequest, AuditLogEntry } from '../types';

export const mockReminders: MedicineReminder[] = [
  {
    id: 'rem-1',
    medicineName: 'Metformin',
    dosage: '500 mg',
    frequency: 'Twice daily (Morning & Night)',
    time: '08:00 AM',
    instructions: 'Take immediately with or after breakfast.',
    sourcePrescriptionId: 'CS-RPT-2026-0092',
    sourcePrescriptionTitle: 'Apollo Hospitals Discharge Prescription (10 Jun 2026)',
    startDate: '2026-06-11',
    active: true,
    takenToday: true
  },
  {
    id: 'rem-2',
    medicineName: 'Amlodipine',
    dosage: '5 mg',
    frequency: 'Once daily (Night)',
    time: '08:00 PM',
    instructions: 'Take after dinner with a glass of water.',
    sourcePrescriptionId: 'CS-RPT-2026-0092',
    sourcePrescriptionTitle: 'Apollo Hospitals Discharge Prescription (10 Jun 2026)',
    startDate: '2026-06-11',
    active: true,
    takenToday: false
  },
  {
    id: 'rem-3',
    medicineName: 'Vitamin D3 (Cholecalciferol)',
    dosage: '60,000 IU',
    frequency: 'Once weekly (Every Sunday)',
    time: '10:00 AM',
    instructions: 'Take with milk after breakfast.',
    startDate: '2026-08-01',
    active: true,
    takenToday: false
  }
];

export const mockConsents: ActiveConsent[] = [
  {
    id: 'cst-1',
    requesterName: 'Dr. Ananya Rao',
    requesterRole: 'Consultant Endocrinologist',
    requesterOrg: 'Apollo Clinic & Diabetes Centre',
    requestedRecords: ['Complete Blood Count & Glycemic Profile (02 Sep 2026)', 'Discharge Prescription (10 Jun 2026)'],
    purpose: 'Second opinion & glycemic control review',
    grantedDate: '28 Aug 2026',
    validUntil: '10 Sep 2026',
    status: 'active'
  },
  {
    id: 'cst-2',
    requesterName: 'Apollo Diagnostic Lab Network',
    requesterRole: 'Diagnostic Service Provider',
    requesterOrg: 'Apollo Health & Lifestyle Ltd',
    requestedRecords: ['Lipid Profile (18 Aug 2026)'],
    purpose: 'Historical reference for longitudinal comparison',
    grantedDate: '19 Aug 2026',
    validUntil: '19 Sep 2026',
    status: 'active'
  }
];

export const mockPendingConsent: PendingConsentRequest = {
  id: 'req-pending-01',
  requesterName: 'Dr. Vikramaditya Sen',
  requesterRole: 'Consultant Interventional Cardiologist',
  requesterOrg: 'Fortis Heart & Vascular Institute',
  requestedRecords: ['Lipid Profile & Atherogenic Risk Panel (18 Aug 2026)', 'Chest X-Ray Report (15 Jul 2026)'],
  purpose: 'Cardiovascular Risk Stratification & Lipid Assessment',
  requestedDuration: '30 days',
  timestamp: 'Today, 2:15 PM'
};

export const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: 'Today, 4:35 PM',
    actorName: 'Dr. Ananya Rao',
    actorRole: 'Endocrinologist (Apollo)',
    action: 'Viewed Medical Report',
    resourceName: 'Complete Blood Count & Glycemic Profile (CS-RPT-2026-0891)',
    status: 'authorized'
  },
  {
    id: 'log-2',
    timestamp: '02 Sep 2026, 11:20 AM',
    actorName: 'Dr. Lal PathLabs',
    actorRole: 'Certified Lab Provider',
    action: 'Uploaded & Digitally Signed Lab Report',
    resourceName: 'CS-RPT-2026-0891 (Integrity SHA-256 Registered)',
    status: 'authorized'
  },
  {
    id: 'log-3',
    timestamp: '28 Aug 2026, 09:15 AM',
    actorName: 'Rahul Sharma (Patient)',
    actorRole: 'Record Owner',
    action: 'Granted Granular Consent',
    resourceName: 'Consent granted to Dr. Ananya Rao for 14 days',
    status: 'authorized'
  },
  {
    id: 'log-4',
    timestamp: '18 Aug 2026, 05:40 PM',
    actorName: 'Apex Diagnostic Centre',
    actorRole: 'Diagnostic Centre',
    action: 'Uploaded Diagnostic Report',
    resourceName: 'Lipid Profile (CS-RPT-2026-0422)',
    status: 'authorized'
  },
  {
    id: 'log-5',
    timestamp: '15 Jul 2026, 03:10 PM',
    actorName: 'Manipal Diagnostic Radiology',
    actorRole: 'Imaging Centre',
    action: 'Uploaded DICOM / X-Ray Summary',
    resourceName: 'Chest X-Ray PA View (CS-RPT-2026-0184)',
    status: 'authorized'
  }
];

export const mockTimelineEvents: HealthTimelineEvent[] = [
  {
    id: 'evt-1',
    date: '02 Sep 2026',
    monthYear: 'September 2026',
    title: 'Complete Blood Count & Glycemic Profile',
    provider: 'Dr. Lal PathLabs, Indiranagar',
    eventType: 'lab',
    description: 'Fasting glucose (138 mg/dL) and HbA1c (7.2%) recorded. Hemoglobin observed at 11.2 g/dL.',
    recordId: 'CS-RPT-2026-0891',
    fhirResource: {
      resourceType: 'DiagnosticReport',
      id: 'CS-RPT-2026-0891',
      status: 'final',
      category: [{
        coding: [{
          system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
          code: 'LAB',
          display: 'Laboratory'
        }]
      }],
      code: {
        coding: [{
          system: 'http://loinc.org',
          code: '4548-4',
          display: 'Hemoglobin A1c / Glycated hemoglobin'
        }]
      },
      subject: {
        reference: 'Patient/pat-9842',
        display: 'Rahul Sharma (ABHA: 91-4820-1928-3841)'
      },
      effectiveDateTime: '2026-09-02T08:30:00+05:30',
      performer: [{
        display: 'Dr. Sunil Mehta, MD - Dr. Lal PathLabs'
      }]
    }
  },
  {
    id: 'evt-2',
    date: '18 Aug 2026',
    monthYear: 'August 2026',
    title: 'Lipid Profile & Atherogenic Risk Panel',
    provider: 'Apex Diagnostic Centre, HAL 2nd Stage',
    eventType: 'lab',
    description: 'Total cholesterol 215 mg/dL, LDL 132 mg/dL, Triglycerides 165 mg/dL.',
    recordId: 'CS-RPT-2026-0422',
    fhirResource: {
      resourceType: 'DiagnosticReport',
      id: 'CS-RPT-2026-0422',
      status: 'final',
      category: [{
        coding: [{
          system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
          code: 'LP',
          display: 'Lipid Panel'
        }]
      }],
      code: {
        coding: [{
          system: 'http://loinc.org',
          code: '24331-1',
          display: 'Lipid 1996 panel'
        }]
      },
      subject: {
        reference: 'Patient/pat-9842',
        display: 'Rahul Sharma'
      },
      effectiveDateTime: '2026-08-18T09:00:00+05:30'
    }
  },
  {
    id: 'evt-3',
    date: '15 Jul 2026',
    monthYear: 'July 2026',
    title: 'Chest Radiograph (PA View)',
    provider: 'Manipal Hospital Diagnostic Radiology',
    eventType: 'imaging',
    description: 'Clear lung parenchyma, normal cardiac silhouette, no acute cardiopulmonary abnormalities.',
    recordId: 'CS-RPT-2026-0184',
    fhirResource: {
      resourceType: 'DiagnosticReport',
      id: 'CS-RPT-2026-0184',
      status: 'final',
      category: [{
        coding: [{
          system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
          code: 'RAD',
          display: 'Radiology'
        }]
      }],
      subject: {
        reference: 'Patient/pat-9842',
        display: 'Rahul Sharma'
      },
      effectiveDateTime: '2026-07-15T14:30:00+05:30'
    }
  },
  {
    id: 'evt-4',
    date: '10 Jun 2026',
    monthYear: 'June 2026',
    title: 'Clinical Consultation & Discharge Prescription',
    provider: 'Apollo Hospitals, Bannerghatta Road',
    eventType: 'prescription',
    description: 'Discharge consultation with Dr. Ananya Rao. Prescribed Metformin 500mg BID and Amlodipine 5mg OD.',
    recordId: 'CS-RPT-2026-0092',
    fhirResource: {
      resourceType: 'MedicationRequest',
      id: 'CS-RPT-2026-0092',
      status: 'active',
      intent: 'order',
      medicationCodeableConcept: {
        coding: [{
          system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
          code: '860975',
          display: 'Metformin hydrochloride 500 MG Oral Tablet'
        }]
      },
      subject: {
        reference: 'Patient/pat-9842',
        display: 'Rahul Sharma'
      },
      requester: {
        display: 'Dr. Ananya Rao, MD, DM (Reg #KMC-61029)'
      }
    }
  },
  {
    id: 'evt-5',
    date: '12 May 2026',
    monthYear: 'May 2026',
    title: 'Adult Influenza Immunization Booster',
    provider: 'Indiranagar Urban Primary Health Centre',
    eventType: 'vaccination',
    description: 'Quadrivalent seasonal influenza vaccine administered subcutaneously.',
    fhirResource: {
      resourceType: 'Immunization',
      id: 'IMM-2026-042',
      status: 'completed',
      vaccineCode: {
        coding: [{
          system: 'http://hl7.org/fhir/sid/cvx',
          code: '158',
          display: 'influenza, injectable, quadrivalent'
        }]
      },
      patient: {
        reference: 'Patient/pat-9842',
        display: 'Rahul Sharma'
      },
      occurrenceDateTime: '2026-05-12'
    }
  }
];
