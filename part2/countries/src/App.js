import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import List from './components/List'
import Country from './components/Country'
import Weather from './components/Weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})
  const [filter, setFilter] = useState("")

  const api_key = process.env.REACT_APP_API_KEY

  const handleFilter = event => setFilter(event.target.value)

  const handleShow = param => setFilter(param)

  const countriesToUse = countries
    .filter(country => country.name.includes(filter))

  let showWeather = false
  let countryDisplay = <p>Too many matches, specify another filter</p>
  if (countriesToUse.length === 0) {
    countryDisplay = <p>No countries match, specify another filter</p>
  } else if (countriesToUse.length === 1) {
    countryDisplay = <Country country={countriesToUse[0]} />
    showWeather = true
  } else if (countriesToUse.length < 10) {
    countryDisplay = countriesToUse.map(country =>
      <List key={country.name}
        name={country.name}
        handleClick={handleShow} />
    )
  }

  const weatherHook = () => {
    if (!showWeather) return
    axios
      .get("http://api.weatherstack.com/current?access_key=" + api_key
        + "&query=" + countriesToUse[0].name)
      .then(response => {
        console.log("promise fulfilled")
        const weatherData = {
          name: response.data.location.name,
          temp: response.data.current.temperature,
          img: response.data.current.weather_icons[0],
          wind_speed: response.data.current.wind_speed,
          wind_dir: response.data.current.wind_dir
        }
        setWeather(weatherData)
      })
  }
  useEffect(weatherHook, [showWeather])

  const countriesHook = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log("promise fulfilled")
        setCountries(response.data)
      })
  }
  useEffect(countriesHook, [])

  let weatherDisplay = showWeather ? <Weather weather={weather} /> : ""

  return (
    <div>
      <form>
        find countries <input value={filter} onChange={handleFilter} />
      </form>
      {countryDisplay}
      {weatherDisplay}
    </div>
  );
}

export default App;
