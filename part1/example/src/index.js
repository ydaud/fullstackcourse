import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({ counter }) => <>{counter}</>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press  history: {allClicks.join(' ')}
    </div>
  )
}

const App = (props) => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1
    }
    setClicks(newClicks)
    setAll(allClicks.concat('L'))
  }

  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1
    }
    setClicks(newClicks)
    setAll(allClicks.concat('R'))
  }

  return (
    <div>
      <div>
        <Display counter={clicks.left} />
        <Button handleClick={handleLeftClick} text="left" />
        <Button handleClick={handleRightClick} text="right" />
        <Display counter={clicks.right} />
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
