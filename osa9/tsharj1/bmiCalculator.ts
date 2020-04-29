
const calculateBmi = (height : number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else if (bmi >= 30) {
    return 'Obese';
  } else {
    return 'Underweight';
  }
}

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);


console.log(calculateBmi(height,weight));
