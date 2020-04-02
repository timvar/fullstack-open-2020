import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => <h1>{course.name}</h1>

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

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
