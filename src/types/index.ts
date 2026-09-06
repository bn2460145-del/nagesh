export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  abhaId: string;
  abhaAddress: string;
  bloodGroup: string;
  allergies: string[];
  conditions: string[];
  emergencyContacts: EmergencyContact[];
  preferredLanguage: string;
  location: string;
  address: string;
  userProvidedNotice: string;
}

export interface ExtractedLabField {
  id: string;
  test: string;
  result: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'low' | 'high' | 'borderline';
  meaning: string;
}

export interface ReportExplanation {
  simpleSummary: string;
  testMeanings: {
    test: string;
    meaning: string;
    whatItMeasures: string;
    statusSummary: string;
    status: 'normal' | 'low' | 'high' | 'borderline';
  }[];
  doctorQuestions: string[];
  whenToSeekCare: string;
  safetyNotice: string;
}

export interface MedicalReport {
  id: string;
  title: string;
  date: string;
  provider: string;
  type: 'lab' | 'prescription' | 'imaging' | 'discharge' | 'other';
  verificationStatus: 'verified' | 'unverified';
  verifiedBy?: string;
  recordId: string; // e.g. CS-RPT-2026-0891
  sha256Hash: string;
  fileType: 'PDF' | 'JPG' | 'PNG';
  fileSize: string;
  extractedFields: ExtractedLabField[];
  explanation: ReportExplanation;
  confirmedByUser: boolean;
  notes?: string;
}

export interface ScoreBreakdown {
  specialtyScore: number;     // max 30
  credentialsScore: number;   // max 20
  distanceScore: number;      // max 15
  affordabilityScore: number; // max 15
  languageScore: number;      // max 10
  facilityScore: number;      // max 10
  totalScore: number;         // max 100
  rationale: string;
}

export interface Provider {
  id: string;
  name: string;
  title: string;
  specialty: string;
  type: 'doctor' | 'hospital' | 'clinic';
  experienceYears: number;
  qualification: string;
  registrationNumber: string;
  hospitalAffiliation: string;
  location: string;
  city: string;
  distanceKm: number;
  consultationFee: number;
  costTier: 'Affordable' | 'Moderate' | 'Premium';
  languages: string[];
  gender: 'Female' | 'Male';
  rating: number;
  reviewCount: number;
  verifiedCredentials: boolean;
  facilityCapabilities: string[];
  availableSlots: string[];
  about: string;
  matchScore?: number;
  matchBreakdown?: ScoreBreakdown;
}

export interface MedicineReminder {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  time: string;
  instructions: string;
  sourcePrescriptionId?: string;
  sourcePrescriptionTitle?: string;
  startDate: string;
  endDate?: string;
  active: boolean;
  takenToday: boolean;
}

export interface HealthTimelineEvent {
  id: string;
  date: string;
  monthYear: string;
  title: string;
  provider: string;
  eventType: 'lab' | 'consultation' | 'prescription' | 'imaging' | 'vaccination';
  description: string;
  recordId?: string;
  fhirResource: Record<string, any>;
}

export interface ActiveConsent {
  id: string;
  requesterName: string;
  requesterRole: string;
  requesterOrg: string;
  requestedRecords: string[];
  purpose: string;
  grantedDate: string;
  validUntil: string;
  status: 'active' | 'revoked' | 'expired';
}

export interface PendingConsentRequest {
  id: string;
  requesterName: string;
  requesterRole: string;
  requesterOrg: string;
  requestedRecords: string[];
  purpose: string;
  requestedDuration: string;
  timestamp: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  resourceName: string;
  status: 'authorized' | 'denied' | 'revoked';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isEmergencyAlert?: boolean;
  emergencyDetails?: {
    title: string;
    warning: string;
    immediateAdvice: string[];
    callNumbers: { label: string; number: string }[];
    nearbyFacilities: string[];
  };
  citations?: string[];
  suggestedFollowUps?: string[];
  sourceGrounded?: boolean;
}
