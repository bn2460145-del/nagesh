import { ChatMessage } from '../types';

export interface EmergencyCheckResult {
  isEmergency: boolean;
  triggerPhrase?: string;
  emergencyDetails?: {
    title: string;
    warning: string;
    immediateAdvice: string[];
    callNumbers: { label: string; number: string }[];
    nearbyFacilities: string[];
  };
}

// DETERMINISTIC EMERGENCY KEYWORD PATTERNS (PRE-LLM FILTER)
const EMERGENCY_PATTERNS: { regex: RegExp; label: string }[] = [
  { regex: /\b(chest pain|tightness in chest|pressure in chest|crushing chest|heart attack)\b/i, label: 'Possible Acute Coronary Event' },
  { regex: /\b(difficulty breathing|can't breathe|cannot breathe|struggling to breathe|shortness of breath|suffocating|choking|gasping)\b/i, label: 'Acute Respiratory Distress' },
  { regex: /\b(stroke|face drooping|facial droop|arm weakness|slurred speech|sudden numbness|loss of vision)\b/i, label: 'Potential Stroke Warning Signs' },
  { regex: /\b(severe bleeding|uncontrolled bleeding|coughing blood|vomiting blood|hemorrhage)\b/i, label: 'Severe Hemorrhage' },
  { regex: /\b(overdose|swallowed poison|took too many pills|toxic ingestion)\b/i, label: 'Toxicology / Overdose Alert' },
  { regex: /\b(suicid|kill myself|end my life|want to die|self harm)\b/i, label: 'Mental Health Crisis / Suicide Prevention' },
  { regex: /\b(unconscious|passed out|unresponsive|seizure|convulsions|anaphylaxis|swollen throat)\b/i, label: 'Loss of Consciousness / Anaphylaxis' }
];

export function checkEmergencyPreLLM(userPrompt: string): EmergencyCheckResult {
  const normalized = userPrompt.trim();

  for (const item of EMERGENCY_PATTERNS) {
    if (item.regex.test(normalized)) {
      return {
        isEmergency: true,
        triggerPhrase: item.label,
        emergencyDetails: {
          title: 'Possible Medical Emergency Detected',
          warning: 'Your message describes symptoms that may indicate an urgent medical situation requiring immediate clinical care.',
          immediateAdvice: [
            'Do not rely on online information or AI assistants for urgent symptoms.',
            'Contact emergency medical services or proceed to the nearest emergency department immediately.',
            'If you are alone, alert a family member, neighbor, or emergency contact.'
          ],
          callNumbers: [
            { label: 'India National Emergency Helpline', number: '112' },
            { label: 'Government Ambulance Emergency', number: '108' },
            { label: 'National Health & Tele-consult Helpline', number: '104' },
            { label: 'Tele-MANAS Mental Health Support', number: '14416' }
          ],
          nearbyFacilities: [
            'Manipal Hospital Emergency & Trauma (3.8 km) — Open 24x7',
            'Apollo Clinic Emergency Care (4.8 km) — Open 24x7',
            'Indiranagar UPHC Emergency Dispatch (1.2 km)'
          ]
        }
      };
    }
  }

  return { isEmergency: false };
}

// POST-LLM SAFETY VALIDATOR
export function sanitizeAIResponse(text: string): string {
  // Enforce zero diagnostic or prescriptive statements
  const diagnosticPatterns = [
    /\byou have diabetes\b/gi,
    /\byou are suffering from\b/gi,
    /\byou definitely have\b/gi
  ];
  
  let sanitized = text;
  for (const pattern of diagnosticPatterns) {
    sanitized = sanitized.replace(pattern, 'your lab values are associated with');
  }

  // Ensure statutory notice is appended
  if (!sanitized.includes('AI-generated informational explanation')) {
    sanitized += '\n\n*Note: AI-generated informational explanation. CareSaathi does not diagnose conditions or prescribe medications. Please consult a qualified doctor.*';
  }

  return sanitized;
}

// GROUNDED AI KNOWLEDGE ENGINE SIMULATION
export function generateSafeAssistantResponse(query: string): Partial<ChatMessage> {
  const q = query.toLowerCase();

  if (q.includes('hba1c') || q.includes('a1c')) {
    return {
      text: `**What is HbA1c?**\n\nHbA1c (Glycated Hemoglobin) is a blood test that reflects your **average blood sugar levels over the past 2 to 3 months**.\n\n- **How it works:** When glucose circulates in your bloodstream, some of it naturally sticks to hemoglobin (the protein inside red blood cells). Because red blood cells live for about 90–120 days, measuring this gives a steady picture rather than just a single moment in time.\n- **General Reference Ranges:**\n  - Normal / Non-diabetic: **Below 5.7%**\n  - Prediabetes range: **5.7% to 6.4%**\n  - Diabetes indicator threshold: **6.5% or higher**\n\n*In your recent report (02 Sep 2026), your HbA1c was measured at 7.2%. For individuals managing diabetes, target goals are individualized by their doctor based on age, lifestyle, and other health factors.*`,
      citations: ['ICMR Guidelines for Management of Type 2 Diabetes 2023', 'National Health Portal of India (NHP)'],
      suggestedFollowUps: [
        'How does fasting blood sugar relate to HbA1c?',
        'What questions should I ask my doctor about my HbA1c?',
        'Show my latest blood test report'
      ]
    };
  }

  if (q.includes('latest report') || q.includes('explain my report') || q.includes('blood test')) {
    return {
      text: `**Summary of your latest report (Dr. Lal PathLabs — 02 Sep 2026):**\n\n1. **Hemoglobin (11.2 g/dL):** Slightly below the laboratory reference standard (12.0 – 16.0 g/dL).\n2. **Fasting Blood Glucose (138 mg/dL):** Above the normal fasting baseline (70 – 99 mg/dL).\n3. **HbA1c (7.2%):** Above standard non-diabetic threshold (<5.7%), indicating higher average glycemic levels over recent weeks.\n4. **Platelets & WBCs:** Both within healthy biological ranges.\n\n**Key Takeaway:** Your report shows markers related to glucose management that you should review with your physician to see if your current lifestyle or medications need adjustment.`,
      citations: ['Dr. Lal PathLabs Report #CS-RPT-2026-0891', 'AIIMS Clinical Biochemistry Reference Standards'],
      suggestedFollowUps: [
        'What questions should I ask my doctor?',
        'Find a diabetes specialist near me',
        'Check my medicine reminders'
      ]
    };
  }

  if (q.includes('prescription') || q.includes('medicine') || q.includes('metformin') || q.includes('amlodipine')) {
    return {
      text: `**Understanding Your Active Prescriptions:**\n\nAccording to your confirmed records from Apollo Hospitals:\n\n1. **Metformin (500 mg):**\n   - **Purpose:** An oral biguanide medication commonly prescribed to help the body respond better to its own insulin and lower glucose production in the liver.\n   - **General guidance:** Usually taken with or after meals to minimize stomach sensitivity.\n\n2. **Amlodipine (5 mg):**\n   - **Purpose:** A calcium channel blocker that relaxes blood vessels to help keep blood pressure in a healthy range.\n   - **General guidance:** Often scheduled at evening time.\n\n⚠️ **Safety Rule:** CareSaathi never recommends changing, skipping, or modifying medication doses. Any change must be directed by your prescribing physician.`,
      citations: ['Discharge Summary #CS-RPT-2026-0092', 'Indian Pharmacopoeia Commission Guide'],
      suggestedFollowUps: [
        'View my medicine reminders schedule',
        'When should I consult my doctor about side effects?',
        'Explain my latest lab report'
      ]
    };
  }

  if (q.includes('question') || q.includes('ask doctor')) {
    return {
      text: `**Recommended Questions for Your Next Doctor Consultation:**\n\nHere are clear, organized questions based on your recent health records:\n\n1. *"Given my HbA1c is 7.2% and fasting glucose is 138 mg/dL, what specific target range should we aim for over the next 3 months?"*\n2. *"My hemoglobin was 11.2 g/dL — do you recommend testing serum ferritin, iron, or making dietary adjustments?"*\n3. *"Are my current Metformin (500mg) and Amlodipine (5mg) timings working optimally with my daily schedule?"*\n4. *"When should I repeat this glycemic panel and lipid test?"*`,
      citations: ['CareSaathi Patient Empowerment Checklist'],
      suggestedFollowUps: [
        'Find a specialist to book an appointment',
        'Export my health summary for my doctor',
        'Review my recent reports'
      ]
    };
  }

  // Default general response
  return {
    text: `I can help explain medical terms, laboratory values, and general wellness topics in simple language.\n\nFor example, you can ask:\n- *"What does a high triglyceride level mean?"*\n- *"What is the difference between systolic and diastolic blood pressure?"*\n- *"Explain what an ECG tests for."*\n\nRemember: I provide clear health explanations and organizational support. I do not diagnose illnesses, prescribe medications, or replace your personal physician.`,
    citations: ['National Health Portal (NHP) India', 'WHO Health Literacy Guide'],
    suggestedFollowUps: [
      'What does HbA1c mean?',
      'Explain my latest report',
      'What questions should I ask my doctor?'
    ]
  };
}
