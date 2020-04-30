import express from 'express';
import {calculateBmi} from './BmiCalculator'
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    if (!req.query.height || !req.query.weight) throw new Error('parameter(s) missing')
    if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) throw new Error('parameters must be numbers')
    if ((Number(req.query.height)<=0) || (Number(req.query.weight) <=0)) throw new Error('parameters must be positive numbers') 

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    
    let bmi = calculateBmi(height, weight);
    const bmiResponse = {
      weight,
      height,
      bmi
    };
    
    console.log(`height: ${height} weight: ${weight}`);
    res.json(bmiResponse);
  } catch (e) {
    const errMsg = {
      error: e.message
    }
    res.json(errMsg)
  }
  
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

