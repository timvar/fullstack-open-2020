import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/newPatientEntry';
import toNewRecordEntry from '../utils/newRecordEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = patientService.addEntry(newPatientEntry);
    res.json(newPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    let patient = patientService.findById(req.params.id);
    const newRecordEntry = toNewRecordEntry(req.body);
    if ( patient && newRecordEntry) {
      patient = patientService.addRecordEntry(patient, newRecordEntry);
    } 
      
    res.json(patient);
  }
 catch (e) {
  res.status(400).send(e.message);
}

  /*
  try {
    const newRecord = patientService.addRecordEntry(newRecordEntry);
    res.json(newRecord);
  */
  //res.json(patient);
});

export default router;
