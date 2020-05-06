import React from 'react';
import {useParams} from 'react-router-dom';
import { Patient, Gender } from "../types";
import { Icon } from "semantic-ui-react";
import axios from 'axios';
import { apiBaseUrl } from "../constants";

const PatientDetails: React.FC = () => {
  const {id} = useParams<{id: string}>();
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
  
  fetchPatient(id);
  }, [id]);

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
      {patient?.entries.map((item, index) => {
        return (
          <>
            <p key={`${index}-${item.id}`}>{item.date} {item.description} </p>
            {item.diagnosisCodes ? (
              item.diagnosisCodes.map((d,idx) => {
                return (<li key={idx}>{d}</li>);
              })
            )
            :
            (
              null
            )}
          </>  
        );
      })}
    </>
  );
};

export default PatientDetails;

