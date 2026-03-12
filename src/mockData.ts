import { Patient, Vitals, Alert, PatientProfile } from './types';

const generateVitalsHistory = (count: number, baseline: any = {}): Vitals[] => {
  const history: Vitals[] = [];
  const now = new Date();
  const { hr = 70, rr = 14, temp = 36.6, spo2 = 98, hrv = 50 } = baseline;
  
  for (let i = count; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 15 * 60 * 1000);
    const noise = () => (Math.random() - 0.5) * 2;
    history.push({
      heartRate: hr + noise() * 5,
      hrv: hrv + noise() * 10,
      respiratoryRate: rr + noise() * 2,
      spo2: Math.min(100, spo2 + noise()),
      skinTemp: temp + noise() * 0.3,
      timestamp: time.toISOString(),
    });
  }
  return history;
};

const MOCK_PROFILE: PatientProfile = {
  fullName: 'John Doe',
  age: 68,
  gender: 'Male',
  phone: '+1 (555) 123-4567',
  email: 'john.doe@example.com',
  medicalBackground: {
    diabetes: true,
    hypertension: true,
    recentSurgery: true,
    immunocompromised: false,
    chronicConditions: 'Mild osteoarthritis in knees.'
  },
  baselineVitals: {
    restingHR: 72,
    restingRR: 16,
    restingTemp: 36.6,
    restingSpO2: 98
  },
  emergencyContact: {
    name: 'Mary Doe',
    relation: 'Spouse',
    phone: '+1 (555) 987-6543'
  }
};

const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    score: 0.45,
    level: 'Moderate',
    triggeredParameters: ['Heart Rate', 'Skin Temp'],
    status: 'Resolved',
    doctorNotified: true
  },
  {
    id: 'a2',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    score: 0.72,
    level: 'High',
    triggeredParameters: ['Respiratory Rate', 'SpO2'],
    status: 'Resolved',
    doctorNotified: true,
    durationHighRisk: '45 min'
  }
];

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'John Doe',
    age: 68,
    gender: 'Male',
    condition: 'Post-Surgery Recovery',
    lastUpdate: new Date().toISOString(),
    currentRisk: { score: 0.15, level: 'Low', trend: 'stable' },
    vitalsHistory: generateVitalsHistory(48),
    profile: MOCK_PROFILE,
    alerts: MOCK_ALERTS
  },
  {
    id: 'p2',
    name: 'Jane Smith',
    age: 72,
    gender: 'Female',
    condition: 'Type 2 Diabetes',
    lastUpdate: new Date().toISOString(),
    currentRisk: { score: 0.78, level: 'High', trend: 'rising' },
    vitalsHistory: generateVitalsHistory(48, { hr: 95, rr: 22, temp: 37.8, spo2: 92, hrv: 25 }),
    alerts: [
      {
        id: 'a3',
        timestamp: new Date().toISOString(),
        score: 0.78,
        level: 'High',
        triggeredParameters: ['HR', 'RR', 'Temp'],
        status: 'Ongoing',
        doctorNotified: true,
        durationHighRisk: '15 min',
        patientName: 'Jane Smith'
      }
    ]
  },
  {
    id: 'p3',
    name: 'Robert Brown',
    age: 65,
    gender: 'Male',
    condition: 'Immunocompromised',
    lastUpdate: new Date().toISOString(),
    currentRisk: { score: 0.45, level: 'Moderate', trend: 'stable' },
    vitalsHistory: generateVitalsHistory(48, { hr: 82, rr: 18, temp: 37.1, spo2: 96, hrv: 35 }),
    alerts: [
      {
        id: 'a4',
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        score: 0.45,
        level: 'Moderate',
        triggeredParameters: ['HRV'],
        status: 'Ongoing',
        doctorNotified: false,
        patientName: 'Robert Brown'
      }
    ]
  }
];

export const GLOBAL_STATS = {
  totalPatients: 124,
  activeMonitoring: 98,
  highRiskToday: 5,
  alerts24h: 12,
  riskDistribution: [
    { name: 'Low', value: 75, color: '#10b981' },
    { name: 'Moderate', value: 18, color: '#f59e0b' },
    { name: 'High', value: 7, color: '#f43f5e' }
  ],
  alertTrends: [
    { day: 'Mon', alerts: 4 },
    { day: 'Tue', alerts: 7 },
    { day: 'Wed', alerts: 5 },
    { day: 'Thu', alerts: 12 },
    { day: 'Fri', alerts: 8 },
    { day: 'Sat', alerts: 3 },
    { day: 'Sun', alerts: 6 }
  ]
};

export const CURRENT_USER_PATIENT = MOCK_PATIENTS[0];
