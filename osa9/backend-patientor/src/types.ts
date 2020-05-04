export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
} 

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NewPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
  'female',
  'male',
  'other'
}
