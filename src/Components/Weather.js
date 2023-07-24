import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import './Weather.css';
import rainbowImage from './rainbow.jpg';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [invalidInput, setInvalidInput] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const API_KEY = '32f35c15c68dc92082839cc9badaa72d';
    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            const data = await response.json();
            if (data.cod === '404') {
                alert('Invalid state name');
                setWeatherData(null);
            } else {
                setWeatherData(data);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!city) {
            window.alert('Please enter a city');
            return;
        }

        fetchWeatherData();
        setCity('');
        setShowInput(false)
    };
    const handleCheckWeather = () => {
        setShowInput(true); // Show the input box when the user clicks on "Check Your Weather"
    };
    const handleClearCity = () => {
        setCity('');
        setShowInput(false); // Hide the input box when the "x" icon is clicked
        setWeatherData(null); // Clear weather data when the "x" icon is clicked
    };

    return (
        <div className="weather-container">
            <div className="header">
                <img src={rainbowImage} alt="Rainbow" className="rainbow-image" />
               {!showInput && ( <button className="header-text" onClick={handleCheckWeather}>Weather</button>)}
            </div>
            {/* {!showInput && (
                <button className="check-weather-button" onClick={handleCheckWeather}>
                    Check Your Weather
                </button>
            )} */}
            {(
                <form className="form" onSubmit={handleFormSubmit}>
                    {/* Input box will be displayed once showInput is true */}
                    <div className="input-container">
                        <input
                            type="text"
                            value={city}
                            onChange={handleCityChange}
                            placeholder="Enter city"
                            className="input-field"
                        />
                        {city && (
                            <button type="button" className="clear-button" onClick={handleClearCity}>
                                &#x2716; {/* "x" icon */}
                            </button>
                        )}
                    </div>
                    <button type="submit" className="submit-button">
                        Get Weather
                    </button>
                </form>
            )}
            {weatherData && <WeatherCard weatherData={weatherData} />}
        </div>
    );
};

export default Weather;
