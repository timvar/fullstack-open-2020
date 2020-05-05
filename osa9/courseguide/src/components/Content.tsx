import React from 'react';
import {CoursePart} from  '../types';
import Part from './Part';

const Content: React.FC<{content: Array<CoursePart>}> = ({content}) => {
  return (
    <>
      {content.map(course => <Part key={course.name} partContent={course} />) }
    </>
  );
}

export default Content;
