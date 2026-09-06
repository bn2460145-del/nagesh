import { Router } from 'express';
import { db } from '../db/database';

export const companionRouter = Router();

// Deterministic Emergency Patterns (PRE-LLM FILTER)
const EMERGENCY_PATTERNS = [
  /\b(chest pain|tightness in chest|pressure in chest|heart attack)\b/i,
  /\b(difficulty breathing|can't breathe|cannot breathe|shortness of breath|suffocating)\b/i,
  /\b(stroke|face drooping|arm weakness|slurred speech|sudden numbness)\b/i,
  /\b(severe bleeding|coughing blood|vomiting blood|hemorrhage)\b/i,
  /\b(overdose|took too many pills|toxic ingestion)\b/i,
  /\b(suicid|kill myself|end my life|want to die)\b/i,
  /\b(unconscious|passed out|seizure|anaphylaxis)\b/i
];

companionRouter.post('/chat', (req, res) => {
  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  const query = message.trim();

  // 1. DETERMINISTIC PRE-LLM EMERGENCY CHECK
  const isEmergency = EMERGENCY_PATTERNS.some(pattern => pattern.test(query));

  if (isEmergency) {
    // Immediate AI Bypass!
    return res.json({
      isEmergencyAlert: true,
      emergencyDetails: {
        title: 'Possible Medical Emergency Detected',
        warning: 'Your message describes symptoms that may indicate an urgent medical situation requiring immediate clinical evaluation.',
        immediateAdvice: [
          'Do not rely on online information or AI tools for urgent symptoms.',
          'Contact emergency medical services or proceed to the nearest emergency department immediately.',
          'Alert a family member or neighbor if you are alone.'
        ],
        callNumbers: [
          { label: 'India National Emergency Helpline', number: '112' },
          { label: 'Government Ambulance Emergency', number: '108' },
          { label: 'National Health & Tele-consult Helpline', number: '104' },
          { label: 'Tele-MANAS Mental Health Support', number: '14416' }
        ],
        nearbyFacilities: [
          'Manipal Hospital Emergency & Trauma (3.8 km) — Open 24x7',
          'Indiranagar UPHC Emergency Dispatch (1.2 km)'
        ]
      }
    });
  }

  // 2. NON-EMERGENCY: GENERATE GROUNDED AI EXPLANATION
  const q = query.toLowerCase();
  let responseText = '';
  let citations: string[] = [];
  let suggestedFollowUps: string[] = [];

  if (q.includes('hba1c') || q.includes('a1c')) {
    responseText = `**What is HbA1c?**\n\nHbA1c (Glycated Hemoglobin) is a blood test that reflects your **average blood sugar levels over the past 2 to 3 months**.\n\n- **How it works:** When glucose circulates in your bloodstream, some of it attaches to hemoglobin in red blood cells. Since red blood cells live for about 90 to 120 days, measuring this gives a reliable multi-month picture.\n- **Standard Reference Intervals:**\n  - Non-diabetic baseline: **Below 5.7%**\n  - Prediabetes range: **5.7% to 6.4%**\n  - Diabetes indicator cutoff: **6.5% or higher**\n\n*Your latest report (02 Sep 2026) recorded HbA1c at 7.2%. Targets are individualized by your physician.*`;
    citations = ['ICMR Clinical Guidelines for Type 2 Diabetes', 'National Health Portal of India'];
    suggestedFollowUps = [
      'What questions should I ask my doctor about my HbA1c?',
      'How does fasting blood sugar relate to HbA1c?',
      'Find a diabetes specialist near me'
    ];
  } else if (q.includes('latest report') || q.includes('blood test') || q.includes('explain')) {
    responseText = `**Summary of your latest report (Dr. Lal PathLabs — 02 Sep 2026):**\n\n1. **Hemoglobin (11.2 g/dL):** Slightly below adult male reference interval (12.0 – 16.0 g/dL).\n2. **Fasting Blood Glucose (138 mg/dL):** Elevated compared to standard fasting cutoff (70 – 99 mg/dL).\n3. **HbA1c (7.2%):** Indicates higher average circulating glucose over the past 90 days.\n4. **Platelets (245,000 /uL):** Within healthy biological range.\n\n**Next Steps:** Review these readings with your endocrinologist to see if dietary or medication adjustments are recommended.`;
    citations = ['Dr. Lal PathLabs Report #CS-RPT-2026-0891', 'AIIMS Reference Standards'];
    suggestedFollowUps = [
      'What questions should I ask my doctor?',
      'Find an affordable endocrinologist nearby'
    ];
  } else {
    responseText = `I can help explain medical terms, laboratory values, and health reports in simple language.\n\nFor example, you can ask:\n- *"What does high triglycerides mean?"*\n- *"Explain systolic vs. diastolic blood pressure."*\n- *"What does this test result mean?"*\n\n*Safety boundary: I provide general health literacy and organization support. I do not diagnose illnesses or prescribe medications.*`;
    citations = ['National Health Portal (NHP) India'];
    suggestedFollowUps = [
      'What does HbA1c mean?',
      'Explain my latest report',
      'What questions should I ask my doctor?'
    ];
  }

  // 3. POST-LLM STATUTORY NOTICE
  responseText += '\n\n*Note: AI-generated informational explanation. CareSaathi does not diagnose conditions or prescribe medications. Please consult a qualified doctor.*';

  return res.json({
    isEmergencyAlert: false,
    text: responseText,
    citations,
    suggestedFollowUps,
    sourceGrounded: true
  });
});
