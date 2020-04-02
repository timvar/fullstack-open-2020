import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text} </button>

const StatisticsLine = ({value, text}) => <tr><td>{text}</td><td>{value}</td></tr> 

const Statistics = (props) => {
  const {good, neutral, bad} = props;
  return (
    <table>
      <thead></thead>
      <tbody>
      <StatisticsLine value={good} text='good' />
      <StatisticsLine value={neutral} text='neutral' />
      <StatisticsLine value={bad} text='bad' />
      <StatisticsLine value={good+neutral+bad} text='all' />
      <StatisticsLine value={((good-bad)/(good+neutral+bad)).toPrecision(1)} text='average' />
      <StatisticsLine value={`${(100*good/(good+neutral+bad)).toPrecision(3)}%`} text='positive' />
      </tbody>
    </table>
  );  
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] =useState(0);
  const [bad, setBad] = useState(0);
  
  const addGood = () => {
    setGood(good + 1);
  }

  const addNeutral = () => {
    setNeutral(neutral + 1);
  }

  const addBad = () => {
    setBad(bad + 1);
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
      {(good+neutral+bad) > 0 ? 
        <Statistics good={good} neutral={neutral} bad={bad} />
        :
        <p>No feedback given</p>
      }
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
