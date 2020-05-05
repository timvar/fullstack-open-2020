import React from 'react';
import {CoursePart} from '../types';

const Total: React.FC<{content: Array<CoursePart>}> = ({content}) => {
  return (
    <p>
        Number of exercises{" "}
        {content.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}

export default Total;
