import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClicks, text }) => {
  return (
    <button onClick={handleClicks}>
      {text}
    </button>
  )
}

const Statistic = ({ text, value, feedback }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = (props) => {

  const average = props.stats.average / props.stats.all
  const positive = (props.stats.positive * 100) / props.stats.all

  return (
    <table>
      <tbody>
        <Statistic text="good" value={props.good} />
        <Statistic text="neutral" value={props.neutral} />
        <Statistic text="bad" value={props.bad} />
        <Statistic text="all" value={props.stats.all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive + '%'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [stats, setStats] = useState({
    all: 0,
    average: 0,
    positive: 0
  })

  const handleGood = () => {
    const newStats = {
      all: stats.all + 1,
      average: stats.average + 1,
      positive: stats.positive + 1
    }
    setStats(newStats)
    setGood(good + 1)
  }
  const handleNeutral = () => {
    const newStats = {
      all: stats.all + 1,
      average: stats.average,
      positive: stats.positive
    }
    setStats(newStats)
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    const newStats = {
      all: stats.all + 1,
      average: stats.average - 1,
      positive: stats.positive
    }
    setStats(newStats)
    setBad(bad + 1)
  }


  if (stats.all === 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button handleClicks={handleGood} text="good" />
        <Button handleClicks={handleNeutral} text="neutral" />
        <Button handleClicks={handleBad} text="bad" />
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClicks={handleGood} text="good" />
      <Button handleClicks={handleNeutral} text="neutral" />
      <Button handleClicks={handleBad} text="bad" />
      <h1>statistics</h1>
      <Statistics stats={stats} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
