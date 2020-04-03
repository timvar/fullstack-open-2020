import React from 'react';

const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </>
  )
}

const TotalExercises = ({ course }) => {
  let initval = 0;
  let total = course.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, initval);

  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

const Part = ({ name, exercises }) => <p> {name} {exercises} </p>

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <TotalExercises course={course} />
    </>
  )
}

export default Course;
