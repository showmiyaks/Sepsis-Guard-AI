export type RiskLevel = 'Low' | 'Moderate' | 'High';

export interface Vitals {
  heartRate: number;
  hrv: number;
  respiratoryRate: number;
  spo2: number;
  skinTemp: number;
  timestamp: string;
}

export interface RiskScore {
  score: number;
  level: RiskLevel;
  trend: 'rising' | 'falling' | 'stable';
}

export interface Alert {
  id: string;
  timestamp: string;
  score: number;
  level: RiskLevel;
  triggeredParameters: string[];
  status: 'Resolved' | 'Ongoing';
  doctorNotified: boolean;
  durationHighRisk?: string;
  patientName?: string;
}

export interface PatientProfile {
  fullName: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  medicalBackground: {
    diabetes: boolean;
    hypertension: boolean;
    recentSurgery: boolean;
    immunocompromised: boolean;
    chronicConditions: string;
  };
  baselineVitals: {
    restingHR: number;
    restingRR: number;
    restingTemp: number;
    restingSpO2: number;
  };
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  lastUpdate: string;
  currentRisk: RiskScore;
  vitalsHistory: Vitals[];
  profile?: PatientProfile;
  alerts?: Alert[];
}

export type UserRole = 'patient' | 'doctor' | 'admin' | 'guest';
