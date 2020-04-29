interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const exercises = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2;

const calculateExercises = (exercises: Array<number>, target: number): Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter(d => d > 0).length
  const average = exercises.reduce((sum, x) => sum + x, 0) / exercises.length
  const success = (average >= target)

  const calculateRating = (average : number, target : number): number => {
    if (average < 0.5 * target) {
      return 1;
    } else if ( average >= 0.5 * target && average < target) {
      return 2
    }
    return 3;
  }
  const rating = calculateRating(average, target);
  const defineRatingDescription = (rating : number) : string => {
    switch (rating) {
      case 1:
        return 'you must improve'
      case 2:
        return 'doing ok but could be better'
      case 3:
        return 'excellent results'
      default:
        return 'what rating is this?'
    }
  }
  const ratingDescription = defineRatingDescription(rating)

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }

}

console.log(calculateExercises(exercises, target))
