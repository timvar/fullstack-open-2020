import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
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

export default router;
