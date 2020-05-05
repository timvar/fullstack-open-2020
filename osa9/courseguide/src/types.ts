interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseAndDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseAndDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseAndDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseAndDescription {
  name: "The final lesson";
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
