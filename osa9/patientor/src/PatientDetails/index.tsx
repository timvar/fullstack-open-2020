import React from 'react';
import {useParams} from 'react-router-dom';
import { Patient, Gender, Diagnosis, HealthCheckEntryForm } from "../types";
import { Icon, Button } from "semantic-ui-react";
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal';

const PatientDetails: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>();
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const [error, setError] = React.useState<string | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const openModal = (): void => setModalOpen(true);

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
  
  const submitEntry = async (values:  HealthCheckEntryForm) => {
    try {
      const { data: newRecord } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
        );
      setPatient(newRecord);
      closeModal();
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data);
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add Entry</Button>
      
    </>
  );
};

export default PatientDetails;
