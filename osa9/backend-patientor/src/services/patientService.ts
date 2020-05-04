import patients from '../../data/patients';
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

export default {
  getEntries,
  addEntry
};
