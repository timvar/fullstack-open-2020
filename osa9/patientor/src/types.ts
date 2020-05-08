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

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
  diagnosisCodes?: Array<Diagnosis['code']>;
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

export type Entry = 
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

export type HealthCheckEntryForm = Omit<HealthCheckEntry, 'id'>;

export interface Props {
  onSubmit: (values: HealthCheckEntryForm) => void;
  onCancel: () => void;
}
