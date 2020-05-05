import patients from '../../data/patientData';
import {Patient, NewPatientEntry} from '../types';
import {v4 as uuidv4} from 'uuid';

const getEntries = (): Pick<Patient, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = (
  newPatient: NewPatientEntry
): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...newPatient
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

export default {
  getEntries,
  addEntry,
  findById
};
