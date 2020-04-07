import React from 'react'

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>
                Capital {country.capital} <br />
      Population {country.population} <br />
            </p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt={country.name} width="200px" />
        </div>
    )
}

export default Country
