import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

function getMostVotes(votes) {
  let index = 0
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > votes[index]) index = i
  }
  return index
}

const App = (props) => {
  const [selected, setSelected] = useState({
    index: 0,
    votes: [0, 0, 0, 0, 0, 0],
    most: 0
  })

  const genRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
    const newObj = {
      index: Math.floor(Math.random() * anecdotes.length),
      votes: [...selected.votes],
      most: 0
    }
    newObj.most = getMostVotes(newObj.votes)
    setSelected(newObj)
  }

  const handleVoting = () => {
    const newObj = {
      index: selected.index,
      votes: [...selected.votes],
      most: 0
    }
    newObj.votes[newObj.index] += 1
    newObj.most = getMostVotes(newObj.votes)
    setSelected(newObj)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected.index]} <br />
      has {selected.votes[selected.index]} votes <br />
      <Button handleClick={handleVoting} text="vote" />
      <Button handleClick={genRandom} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[selected.most]} <br />
      has {selected.votes[selected.most]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
