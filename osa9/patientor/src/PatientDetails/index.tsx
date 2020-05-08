import React from 'react';
import {useParams} from 'react-router-dom';
import { Patient, Gender, Diagnosis, HealthCheckEntryForm } from "../types";
import { Icon } from "semantic-ui-react";
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import EntryDetails from '../components/EntryDetails';
import AddEntryForm from '../components/AddEntryForm';


const PatientDetails: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>();
  const [patient, setPatient] = React.useState<Patient | undefined>();
  React.useEffect(() => {
    const fetchPatient = async (patientId: string) => {
      try {
        const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
        setPatient(patient);
      }
      catch (e) {
        console.error(e);
      }
    };
    const fetchDiagnosisList = async () => {
      try {
        const {data: diagnosisList} = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
          );
          setDiagnoses(diagnosisList);
          console.log(diagnoses);
        } catch (e) {
        console.error(e);
      }
    };
    
    fetchDiagnosisList();
    fetchPatient(id);
  }, [id]);
  
  const closeForm = (): void => {
    console.log('close form');
  };
  
  const submitEntry = async (values:  HealthCheckEntryForm) => {
    try {
      const { data: newRecord } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
        );
      setPatient(newRecord);
      } catch (e) {
        console.error(e.response.data);
      }
  };

  const genderSymbol = (gender: Gender | undefined) => {
    switch (gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      default:
        return 'genderless';
    }
  };
  
  return (
    <>
      <h2> {patient ? patient.name : null} <Icon name={genderSymbol(patient?.gender)} />  </h2>
      <p> ssn: {patient ? (patient.ssn ? patient.ssn : null) : null} </p>
      <p> occupation: {patient ? patient.occupation : null} </p>
      <h3>entries</h3>
      {patient?.entries.map((item, index) => <EntryDetails key={index} entry={item} />)}
      <AddEntryForm onSubmit={submitEntry} onCancel={closeForm} />
    </>
  );
};

export default PatientDetails;
