interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments');
  let  tgt="";
  let   rest=[];
  [tgt, ...rest] = args.slice(2);
  if (isNaN(Number(tgt))) throw new Error('Target value should be number');
  if (rest.find(r => isNaN(Number(r)) == true)) throw new Error('Exercise value should be number');
  const exercises = rest.map(r => Number(r));
  const target = Number(tgt);
  return [target, ...exercises];
};

const calculateRating = (average: number, target: number): number => {
  if (average < 0.5 * target) {
    return 1;
  } else if ( average >= 0.5 * target && average < target) {
    return 2;
  }
  return 3;
};

const defineRatingDescription = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'you must improve';
    case 2:
      return 'doing ok but could be better';
    case 3:
      return 'excellent results';
    default:
      return 'what rating is this?';
  }
};

export const calculateExercises = (args: Array<string>): Result => {
  let target  
  let exercises = [];
  [target, ...exercises] = parseArguments(args);
  const periodLength = exercises.length;
  const trainingDays = exercises.filter(d => d > 0).length;
  const average = exercises.reduce((sum, x) => sum + x, 0) / exercises.length;
  const success = (average >= target);
  const rating = calculateRating(average, target);
  const ratingDescription = defineRatingDescription(rating);
  return {
    periodLength: periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

export const calculateWebExercises = (exercises: Array<number>, target:number): Result => {
    const periodLength = exercises.length;
    const trainingDays = exercises.filter(d => d > 0).length;
    const average = exercises.reduce((sum, x) => sum + x, 0) / exercises.length;
    const success = (average >= target);
    const rating = calculateRating(average, target);
    const ratingDescription = defineRatingDescription(rating);
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
};
          
//const exercises = rest.map(r => Number(r))
//const target = Number(tgt)
//const exercises = [3, 0, 2, 4.5, 0, 3, 1];
// const target: number = Number(process.argv[2]);
try {
  console.log(calculateExercises(process.argv));
} catch (e) {
  console.log('something went wrong: ', e.message );
}
