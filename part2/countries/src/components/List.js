import React from 'react'

const List = ({ name, handleClick }) => {
    return (
        <p>
            {name}
            <button onClick={() => handleClick(name)}>
                show
      </button>
        </p >
    )
}

export default List
