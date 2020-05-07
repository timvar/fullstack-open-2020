export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export enum Gender {
  female = 'female',
  male = 'male',
  other = 'other'
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
} 

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface Diagnosis {
  code: string;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
} 

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  diagnosisCodes: Array<Diagnosis['code']>;
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface DischargeEntry {
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry = HealthCheckEntry | OccupationalHealthCareEntry | HospitalEntry;

export type NewPatientEntry = Omit<Patient, 'id'>;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type NewOccupationalHealthCareEntry = Omit<OccupationalHealthCareEntry, 'id'>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >; 

export type NewEntry = NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthCareEntry;

