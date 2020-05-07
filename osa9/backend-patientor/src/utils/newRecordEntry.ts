/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewEntry, NewHealthCheckEntry, DischargeEntry , NewHospitalEntry, NewOccupationalHealthCareEntry } from '../types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (item: any): string => {
  if (!item || !isString(item)) {
    throw new Error(`Incorrect or missing item ${item}`);
  }
  return item;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isDate(date)) {
    throw new Error(`Incorrect or missing date ${date}`);
  }
  return date;
};

const isNumber = (item: any): item is number => {
  return typeof item === 'number' || item instanceof Number;
};

const parseNumber = (item: any): number => {
  if (!item || !isNumber(item)) {
    throw new Error(`Incorrect or missing item ${item}`);
  }
  return item;
};

const parseDischarge = (item: any): DischargeEntry => {
  if (!item || !item.date || !item.criteria || !parseString(item.date) || !parseString(item.criteria)) {
    throw new Error(`Incorrect or missing item ${item}`);
  }
  return item;
};

const parseHealthCheckEntry = (object: NewHealthCheckEntry): void => {
  parseDate(object.date);
  parseString(object.specialist);
  parseString(object.description);
  parseNumber(object.healthCheckRating);
};

const parseHospitalEntry = (object: NewHospitalEntry): void => {
  parseDate(object.date);
  parseString(object.specialist);
  parseString(object.description);
  parseDischarge(object.discharge);
};


const parseOccupationalHealthCareEntry = (object: NewOccupationalHealthCareEntry): void => {
  parseDate(object.date);
  parseString(object.specialist);
  parseString(object.employerName);
  parseString(object.description);
};

const toNewRecordEntry = (object: any): NewEntry | undefined => {
  switch (object.type) {
    case 'HealthCheck':
      parseHealthCheckEntry(object);
      break;
    case 'Hospital':
      parseHospitalEntry(object);
      break;
    case 'OccupationalHealthcare':
      parseOccupationalHealthCareEntry(object);
      break;
    default:
      throw new Error('Undefined Entry type');
  }
  return object;
};

export default toNewRecordEntry;
