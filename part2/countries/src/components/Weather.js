import React from 'react'

const Weather = ({ weather }) => {
    return (
        <div>
            <h1>Weather in {weather.name}</h1>
            <p><b>temperature:</b> {weather.temp} Celsius</p>
            <img src={weather.img} alt="Weather icon" />
            <p><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
    )
}

export default Weather
