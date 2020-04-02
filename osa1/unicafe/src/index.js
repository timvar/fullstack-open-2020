import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const Display = ({value, text}) => <p>{text} {value}</p>

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] =useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [feedbackSum, setFeedbackSum] =useState(0);
  
  const addGood = () => {
    setGood(good + 1);
    setAll(all + 1);
    setFeedbackSum(feedbackSum + 1);
  }
  const addNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  }
  const addBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setFeedbackSum(feedbackSum - 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <br />
      <Button handleClick={addGood} text={'good'} />
      <Button handleClick={addNeutral} text={'neutral'} />
      <Button handleClick={addBad} text={'bad'} />
      <br />
      <h1>statistics</h1>
      <Display value={good} text={'good'} />
      <Display value={neutral} text={'neutral'} />
      <Display value={bad} text={'bad'} />
      <Display value={all} text={'all'} />
      <Display value={feedbackSum/all} text={'average'} />
      <Display value={`${100*good/all}%`} text={'positive'} />

    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
