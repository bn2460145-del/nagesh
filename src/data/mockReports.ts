import { MedicalReport } from '../types';

export const mockReports: MedicalReport[] = [
  {
    id: 'rpt-1',
    title: 'Complete Blood Count & Glycemic Profile',
    date: '02 Sep 2026',
    provider: 'Dr. Lal PathLabs, Indiranagar',
    type: 'lab',
    verificationStatus: 'verified',
    verifiedBy: 'Dr. Sunil Mehta, MD (Pathology) - Reg #KMC-48291',
    recordId: 'CS-RPT-2026-0891',
    sha256Hash: '4a6f289b5c3e012fa890e788bc5f67a213e45901cb298374d619cf887201a4e1',
    fileType: 'PDF',
    fileSize: '1.4 MB',
    confirmedByUser: true,
    extractedFields: [
      {
        id: 'f1',
        test: 'Hemoglobin',
        result: '11.2',
        unit: 'g/dL',
        referenceRange: '12.0 – 16.0',
        status: 'low',
        meaning: 'Slightly below standard adult male reference range.'
      },
      {
        id: 'f2',
        test: 'Fasting Blood Glucose',
        result: '138',
        unit: 'mg/dL',
        referenceRange: '70 – 99',
        status: 'high',
        meaning: 'Above normal fasting range (standard threshold is <100 mg/dL).'
      },
      {
        id: 'f3',
        test: 'HbA1c (Glycated Hemoglobin)',
        result: '7.2',
        unit: '%',
        referenceRange: '< 5.7',
        status: 'high',
        meaning: 'Reflects average blood sugar levels over the past 2 to 3 months.'
      },
      {
        id: 'f4',
        test: 'Platelet Count',
        result: '245,000',
        unit: '/uL',
        referenceRange: '150,000 – 450,000',
        status: 'normal',
        meaning: 'Within normal biological limits.'
      },
      {
        id: 'f5',
        test: 'Total Leukocyte Count (WBC)',
        result: '6,800',
        unit: '/uL',
        referenceRange: '4,500 – 11,000',
        status: 'normal',
        meaning: 'Within normal biological limits.'
      }
    ],
    explanation: {
      simpleSummary: 'This report contains measurements of blood cells and glycemic markers. The blood count parameters show slightly lower hemoglobin than the standard reference, while glycemic indicators (fasting glucose and HbA1c) are elevated above the non-diabetic range.',
      testMeanings: [
        {
          test: 'Hemoglobin',
          whatItMeasures: 'Hemoglobin is an iron-rich protein in red blood cells that transports oxygen from lungs to body tissues.',
          meaning: 'Your result of 11.2 g/dL is below the typical laboratory reference threshold (12.0 – 16.0 g/dL). This is often reviewed by doctors in relation to diet, iron status, or fatigue.',
          statusSummary: 'Below typical reference range',
          status: 'low'
        },
        {
          test: 'Fasting Blood Glucose',
          whatItMeasures: 'Measures circulating blood sugar concentration after an overnight fasting period (minimum 8 hours).',
          meaning: 'Your level of 138 mg/dL is higher than the standard normal fasting cutoff of 99 mg/dL. This is an indicator frequently monitored in diabetes management.',
          statusSummary: 'Above typical fasting range',
          status: 'high'
        },
        {
          test: 'HbA1c',
          whatItMeasures: 'Indicates the percentage of hemoglobin bound to glucose, providing an index of 90-day glycemic trend.',
          meaning: 'Your result of 7.2% reflects higher average circulating glucose over recent months compared to non-diabetic thresholds (<5.7%). In individuals with diagnosed diabetes, targets are personalized by their physician.',
          statusSummary: 'Higher than reference baseline',
          status: 'high'
        }
      ],
      doctorQuestions: [
        'Should I repeat this fasting glucose test or consider a post-prandial evaluation?',
        'Does my current dietary routine or medicine timing affect these glycemic readings?',
        'Is my hemoglobin level concerning enough to evaluate dietary iron or ferritin levels?',
        'What specific HbA1c target range is ideal for my personal health profile?'
      ],
      whenToSeekCare: 'If you experience unusual dizziness, rapid heart rate, severe fatigue, unquenchable thirst, frequent urination, or blurred vision, arrange an appointment with your healthcare provider promptly.',
      safetyNotice: 'This is general health information, not a clinical diagnosis. Always discuss your laboratory report with a qualified healthcare professional.'
    }
  },
  {
    id: 'rpt-2',
    title: 'Lipid Profile & Atherogenic Risk Panel',
    date: '18 Aug 2026',
    provider: 'Apex Diagnostic Centre, HAL 2nd Stage',
    type: 'lab',
    verificationStatus: 'verified',
    verifiedBy: 'Dr. Shalini Kulkarni, MD - Reg #KMC-52190',
    recordId: 'CS-RPT-2026-0422',
    sha256Hash: '8b9c1d0ef457a1b2c3d4e5f67890123456789abcdef0123456789abcdef01234',
    fileType: 'PDF',
    fileSize: '950 KB',
    confirmedByUser: true,
    extractedFields: [
      {
        id: 'f21',
        test: 'Total Cholesterol',
        result: '215',
        unit: 'mg/dL',
        referenceRange: '< 200',
        status: 'borderline',
        meaning: 'Borderline elevated according to cardiovascular risk guidelines.'
      },
      {
        id: 'f22',
        test: 'LDL Cholesterol (Calculated)',
        result: '132',
        unit: 'mg/dL',
        referenceRange: '< 100',
        status: 'high',
        meaning: 'Frequently referred to as low-density lipoprotein; higher than optimal.'
      },
      {
        id: 'f23',
        test: 'HDL Cholesterol',
        result: '44',
        unit: 'mg/dL',
        referenceRange: '> 40',
        status: 'normal',
        meaning: 'Protective lipid carrier within standard acceptable limits.'
      },
      {
        id: 'f24',
        test: 'Triglycerides',
        result: '165',
        unit: 'mg/dL',
        referenceRange: '< 150',
        status: 'borderline',
        meaning: 'Circulating blood fats mildly above desirable cutoff.'
      }
    ],
    explanation: {
      simpleSummary: 'This lipid panel assesses different forms of circulating blood fats. Several indicators such as LDL and triglycerides show mild elevation above optimal baselines, which physicians typically examine alongside lifestyle, exercise, and blood pressure.',
      testMeanings: [
        {
          test: 'LDL Cholesterol',
          whatItMeasures: 'Low-Density Lipoprotein carries cholesterol throughout the arterial system.',
          meaning: 'A result of 132 mg/dL is above the optimal <100 mg/dL goal. Clinicians assess this alongside other cardiovascular markers.',
          statusSummary: 'Above optimal target',
          status: 'high'
        },
        {
          test: 'HDL Cholesterol',
          whatItMeasures: 'High-Density Lipoprotein helps transport excess cholesterol back to the liver.',
          meaning: 'A result of 44 mg/dL meets the minimum baseline recommendation (>40 mg/dL for men).',
          statusSummary: 'Within acceptable range',
          status: 'normal'
        }
      ],
      doctorQuestions: [
        'Do you recommend dietary adjustments or physical activity targets for these lipid levels?',
        'Does my diabetes management influence these triglyceride and LDL readings?',
        'When would you like me to repeat this lipid panel?'
      ],
      whenToSeekCare: 'Routine follow-up during your next medical visit. Emergency evaluation is necessary if you encounter sudden chest tightness, shortness of breath, or radiating arm discomfort.',
      safetyNotice: 'This is general health information, not a clinical diagnosis. Always discuss your laboratory report with a qualified healthcare professional.'
    }
  },
  {
    id: 'rpt-3',
    title: 'Chest X-Ray (PA View) Report',
    date: '15 Jul 2026',
    provider: 'Manipal Hospital Diagnostic Radiology',
    type: 'imaging',
    verificationStatus: 'verified',
    verifiedBy: 'Dr. Vivek Swaminathan, DMRD - Reg #KMC-39120',
    recordId: 'CS-RPT-2026-0184',
    sha256Hash: 'c7d8e9f0123456789abcdef0123456789abcdef0123456789abcdef012345678',
    fileType: 'PDF',
    fileSize: '3.2 MB',
    confirmedByUser: true,
    extractedFields: [
      {
        id: 'f31',
        test: 'Bilateral Lung Fields',
        result: 'Clear',
        unit: '',
        referenceRange: 'Clear / No consolidation',
        status: 'normal',
        meaning: 'No active focal opacities or infiltration observed.'
      },
      {
        id: 'f32',
        test: 'Cardiothoracic Ratio',
        result: 'Normal (<0.5)',
        unit: '',
        referenceRange: '< 0.50',
        status: 'normal',
        meaning: 'Cardiac shadow size is within expected proportions.'
      },
      {
        id: 'f33',
        test: 'Costophrenic Angles',
        result: 'Sharp & Clear',
        unit: '',
        referenceRange: 'Sharp',
        status: 'normal',
        meaning: 'No evidence of pleural fluid accumulation.'
      }
    ],
    explanation: {
      simpleSummary: 'The chest radiograph report indicates clear lungs and normal heart silhouette proportions with no radiological signs of acute infection, fluid accumulation, or structural enlargement.',
      testMeanings: [
        {
          test: 'Lung Fields',
          whatItMeasures: 'Visualizes aeration and structural tissue of both lung lobes.',
          meaning: 'Reported as clear, indicating absence of detected pneumonia, mass lesions, or fluid congestion.',
          statusSummary: 'Clear and normal',
          status: 'normal'
        }
      ],
      doctorQuestions: [
        'Does this clear X-ray confirm resolution of my previous seasonal cough?',
        'Do I need any further pulmonary checkups?'
      ],
      whenToSeekCare: 'Consult your doctor if you experience persistent cough, unexplained breathlessness, or fever.',
      safetyNotice: 'This is general health information, not a clinical diagnosis. Always discuss your laboratory report with a qualified healthcare professional.'
    }
  },
  {
    id: 'rpt-4',
    title: 'Discharge Summary & Prescription',
    date: '10 Jun 2026',
    provider: 'Apollo Hospitals, Bannerghatta Road',
    type: 'prescription',
    verificationStatus: 'verified',
    verifiedBy: 'Dr. Ananya Rao, MD, DM (Endocrinology) - Reg #KMC-61029',
    recordId: 'CS-RPT-2026-0092',
    sha256Hash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    fileType: 'PDF',
    fileSize: '1.1 MB',
    confirmedByUser: true,
    extractedFields: [
      {
        id: 'f41',
        test: 'Prescription Item 1',
        result: 'Metformin 500mg',
        unit: 'Oral Tablet',
        referenceRange: 'Twice daily with meals',
        status: 'normal',
        meaning: 'Oral biguanide agent for glycemic control.'
      },
      {
        id: 'f42',
        test: 'Prescription Item 2',
        result: 'Amlodipine 5mg',
        unit: 'Oral Tablet',
        referenceRange: 'Once daily at 8:00 PM',
        status: 'normal',
        meaning: 'Calcium channel blocker for blood pressure management.'
      }
    ],
    explanation: {
      simpleSummary: 'This document is a discharge medication advisory specifying routine maintenance therapies for blood sugar and blood pressure management as confirmed by your attending physician.',
      testMeanings: [
        {
          test: 'Metformin',
          whatItMeasures: 'Active medication for insulin sensitivity and liver glucose regulation.',
          meaning: 'Prescribed as 500mg twice daily with breakfast and dinner to assist with glycemic balance.',
          statusSummary: 'Active prescription',
          status: 'normal'
        },
        {
          test: 'Amlodipine',
          whatItMeasures: 'Active medication for relaxing blood vessel walls.',
          meaning: 'Prescribed as 5mg once daily at evening time to support healthy arterial pressure.',
          statusSummary: 'Active prescription',
          status: 'normal'
        }
      ],
      doctorQuestions: [
        'How frequently should I check my home blood pressure and sugar log?',
        'Are there specific foods or times I should take these medications?'
      ],
      whenToSeekCare: 'Consult your prescribing doctor if you develop ankle swelling, unusual lightheadedness, or digestive upset.',
      safetyNotice: 'This is general health information, not a clinical diagnosis. Always discuss your laboratory report with a qualified healthcare professional.'
    }
  }
];

// Preset reports available to upload during demo
export const sampleUploadReports = [
  {
    id: 'sample-cbc-glucose',
    title: 'Dr. Lal PathLabs Blood Test CBC + Fasting Glucose',
    date: '05 Sep 2026',
    provider: 'Dr. Lal PathLabs, Indiranagar Centre',
    type: 'lab' as const,
    verificationStatus: 'unverified' as const,
    fileType: 'PDF' as const,
    fileSize: '1.2 MB',
    extractedFields: [
      {
        id: 'up-1',
        test: 'Hemoglobin',
        result: '11.2',
        unit: 'g/dL',
        referenceRange: '12.0 – 16.0',
        status: 'low' as const,
        meaning: 'Below typical biological range for adult males.'
      },
      {
        id: 'up-2',
        test: 'Fasting Blood Glucose',
        result: '138',
        unit: 'mg/dL',
        referenceRange: '70 – 99',
        status: 'high' as const,
        meaning: 'Above normal fasting threshold.'
      },
      {
        id: 'up-3',
        test: 'HbA1c',
        result: '7.2',
        unit: '%',
        referenceRange: '< 5.7',
        status: 'high' as const,
        meaning: 'Reflects average blood sugar over the last 90 days.'
      },
      {
        id: 'up-4',
        test: 'Platelet Count',
        result: '240,000',
        unit: '/uL',
        referenceRange: '150,000 – 450,000',
        status: 'normal' as const,
        meaning: 'Within normal limits.'
      }
    ],
    simpleSummary: 'The document shows laboratory test findings for Complete Blood Count and Blood Glucose. Key values include hemoglobin at 11.2 g/dL (reference 12.0–16.0 g/dL) and fasting glucose at 138 mg/dL (reference 70–99 mg/dL).',
    doctorQuestions: [
      'Should I repeat this fasting glucose test to confirm?',
      'How does my 7.2% HbA1c compare to my target goal?',
      'Are dietary changes needed to address the mild hemoglobin dip?'
    ]
  },
  {
    id: 'sample-thyroid',
    title: 'Thyrocare Thyroid Profile (TSH, Free T3, Free T4)',
    date: '01 Sep 2026',
    provider: 'Thyrocare Technologies Ltd',
    type: 'lab' as const,
    verificationStatus: 'unverified' as const,
    fileType: 'PDF' as const,
    fileSize: '840 KB',
    extractedFields: [
      {
        id: 'th-1',
        test: 'TSH (Thyroid Stimulating Hormone)',
        result: '4.85',
        unit: 'uIU/mL',
        referenceRange: '0.35 – 4.50',
        status: 'borderline' as const,
        meaning: 'Slightly above upper limit of normal baseline.'
      },
      {
        id: 'th-2',
        test: 'Free T3',
        result: '2.8',
        unit: 'pg/mL',
        referenceRange: '2.0 – 4.4',
        status: 'normal' as const,
        meaning: 'Within normal biological limits.'
      },
      {
        id: 'th-3',
        test: 'Free T4',
        result: '1.15',
        unit: 'ng/dL',
        referenceRange: '0.93 – 1.70',
        status: 'normal' as const,
        meaning: 'Within normal biological limits.'
      }
    ],
    simpleSummary: 'This thyroid panel assesses thyroid gland hormone output. TSH is borderline elevated at 4.85 uIU/mL, while Free T3 and Free T4 values remain within normal functional ranges.',
    doctorQuestions: [
      'Does a slightly high TSH need retesting in 6–8 weeks?',
      'Should antibody testing (Anti-TPO) be considered?'
    ]
  }
];
