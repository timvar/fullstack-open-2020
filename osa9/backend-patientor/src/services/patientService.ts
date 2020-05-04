import patients from '../../data/patients';
import {Patient} from '../types';

const getEntries = (): Pick<Patient, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = () => {
  return [];
};

export default {
  getEntries,
  addEntry
};
