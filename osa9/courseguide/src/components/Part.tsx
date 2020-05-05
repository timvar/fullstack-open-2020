import React from 'react';
import {CoursePart} from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{partContent: CoursePart}> = ({partContent}) => {
  switch (partContent.name) {
    case 'Fundamentals':
      return <p> {partContent.name} {partContent.description} {partContent.exerciseCount} </p>;
    case 'Using props to pass data':
      return <p> {partContent.name} {partContent.exerciseCount} {partContent.groupProjectCount} </p>;
    case 'Deeper type usage':
      return <p> {partContent.name} {partContent.description} {partContent.exerciseCount} {partContent.exerciseSubmissionLink} </p>;
    case 'The final lesson':
      return <p> {partContent.name} {partContent.description} {partContent.exerciseCount} </p>;
    default:
      return assertNever(partContent)
  }
}

export default Part;
