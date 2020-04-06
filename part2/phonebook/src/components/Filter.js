import React from 'react'

const Filter = ({ handleFilter, filter }) => {
    return (<form>
        <div>
            filter shown with <input value={filter} onChange={handleFilter} />
        </div>
    </form>)
}

export default Filter
