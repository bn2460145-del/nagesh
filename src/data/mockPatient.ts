import { PatientProfile } from '../types';

export const mockPatient: PatientProfile = {
  id: 'pat-9842',
  name: 'Rahul Sharma',
  age: 38,
  gender: 'Male',
  phone: '+91 98450 12345',
  email: 'rahul.sharma@example.com',
  abhaId: '91-4820-1928-3841',
  abhaAddress: 'rahul.sharma@abdm',
  bloodGroup: 'B+',
  allergies: ['Penicillin', 'Sulfa-based antibiotics'],
  conditions: ['Type 2 Diabetes Mellitus', 'Mild Essential Hypertension'],
  emergencyContacts: [
    {
      name: 'Priya Sharma',
      relation: 'Spouse',
      phone: '+91 98765 43210'
    },
    {
      name: 'Dr. R. K. Verma',
      relation: 'Family Physician',
      phone: '+91 98230 11223'
    }
  ],
  preferredLanguage: 'English / Hindi',
  location: 'Indiranagar, Bengaluru',
  address: 'Flat 402, Green Glen Residency, Indiranagar, Bengaluru, KA - 560038',
  userProvidedNotice: 'This emergency profile contains self-declared information. It does not replace clinical verification in an acute setting.'
};
