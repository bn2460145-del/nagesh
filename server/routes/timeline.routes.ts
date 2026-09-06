import { Router } from 'express';
import { db } from '../db/database';

export const timelineRouter = Router();

// GET /api/timeline (with HL7 FHIR R4 formatting)
timelineRouter.get('/', (req, res) => {
  const events = [
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
        effectiveDateTime: '2026-09-02T08:30:00+05:30'
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
        }
      }
    },
    {
      id: 'evt-3',
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
        }
      }
    }
  ];

  return res.json(events);
});
