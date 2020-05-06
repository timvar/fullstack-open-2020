import React from 'react';
import { Entry } from '../types';
import HealthCheckEntry from '../components/HealthCheckEntry';
import OccupationalHealthcareEntry from '../components/OccupationalHealthcareEntry';
import HospitalEntry from '../components/HospitalEntry';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    default: 
      return assertNever(entry);
  }
};

export default EntryDetails;
