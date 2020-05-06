export interface Diagnosis {
  code: string;
  name?: string;
  latin?: string;
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other"
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

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
} 

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  diagnosisCodes: Array<Diagnosis['code']>;
  discharge: {
    date: string;
    criteria: string;
  };
}

type Entry = 
  | HospitalEntry 
  | OccupationalHealthCareEntry
  | HealthCheckEntry; 

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}
