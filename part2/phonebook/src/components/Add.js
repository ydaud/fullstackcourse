import React from 'react'

const Add = (props) => {
    return (<form>
        <div>
            name: <input value={props.newName} onChange={props.handleNewName} />
            <br />
      number: <input value={props.newNumber} onChange={props.handleNewNumber} />
        </div>
        <div>
            <button type="submit" onClick={props.handleAdd}>add</button>
        </div>
    </form>)
}

export default Add
