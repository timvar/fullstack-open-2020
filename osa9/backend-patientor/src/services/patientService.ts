import patients from '../../data/patients';
import {Patient} from '../types';
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
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string,
): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };
  patients.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getEntries,
  addEntry
};
