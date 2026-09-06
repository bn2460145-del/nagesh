import { ExtractedLabField, MedicalReport } from '../types';

export interface OCRStepState {
  step: 1 | 2 | 3 | 4;
  progressPercent: number;
  stageMessage: string;
}

export function generateMockHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `sha256-${hex}a9b1c7d2e3f405869a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b`.slice(0, 64);
}

export function generateRecordId(): string {
  const randNum = Math.floor(1000 + Math.random() * 9000);
  return `CS-RPT-2026-${randNum}`;
}

export function createConfirmedReportFromExtraction(
  title: string,
  provider: string,
  fileType: 'PDF' | 'JPG' | 'PNG',
  extractedFields: ExtractedLabField[],
  simpleSummary?: string,
  doctorQuestions?: string[]
): MedicalReport {
  const recordId = generateRecordId();
  const sha256Hash = generateMockHash(`${title}-${recordId}-${Date.now()}`);

  // Build plain-language explanation safely
  const testMeanings = extractedFields.map(f => ({
    test: f.test,
    whatItMeasures: `${f.test} concentration in biological sample`,
    meaning: f.meaning || `Reported value is ${f.result} ${f.unit} compared to expected reference interval (${f.referenceRange}).`,
    statusSummary: f.status === 'normal' ? 'Within typical baseline limits' : `Observed ${f.status} compared to standard reference`,
    status: f.status
  }));

  return {
    id: `rpt-${Date.now()}`,
    title,
    date: 'Today, 05 Sep 2026',
    provider: provider || 'Self-Uploaded Patient Document',
    type: 'lab',
    verificationStatus: 'unverified', // Explicitly unverified since uploaded by patient
    recordId,
    sha256Hash,
    fileType,
    fileSize: '1.2 MB',
    confirmedByUser: true,
    extractedFields,
    explanation: {
      simpleSummary: simpleSummary || `This document presents extracted laboratory results for ${extractedFields.map(f => f.test).join(', ')}. Some measured levels fall outside standard laboratory intervals.`,
      testMeanings,
      doctorQuestions: doctorQuestions || [
        'Does this result require verification or repeating in a clinical setting?',
        'How should these findings be interpreted within my overall health profile?',
        'Do you recommend any follow-up blood work or imaging?'
      ],
      whenToSeekCare: 'Schedule a timely review with your doctor. If you experience severe weakness, sudden breathlessness, or unusual pain, seek immediate medical care.',
      safetyNotice: 'This is general health information, not a clinical diagnosis. Always discuss your laboratory report with a qualified healthcare professional.'
    }
  };
}
