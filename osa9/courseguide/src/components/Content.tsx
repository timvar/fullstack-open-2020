import React from 'react';
import {CoursePart} from  '../types';

const Content: React.FC<{content: Array<CoursePart>}> = ({content}) => {
  return (
    <>
      {content.map(course => <p key={course.name}> {course.name} {course.exerciseCount} </p>)}
    </>
  );
}

export default Content;
