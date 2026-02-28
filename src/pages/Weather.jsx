import React, { useState, useEffect } from 'react';

// --- SVG Icons ---
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
       strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const HumidityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const WindIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
  </svg>
);

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" 
       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

// CSS styles injected via <style> tag
const allStyles = `
  /* Base styles */
  html, body, #root {
    margin: 0; padding: 0;
    height: 100%; width: 100%;
    font-family: 'Inter', sans-serif;
  }

  .appContainer {
    min-height: 100vh;
    width: 100%;
    background-image: url('/bg.jpg'); /* background image same as login page */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
  }

  .mainWrapper {
    width: 100%;
    max-width: 28rem;
    margin: 0 auto;
  }

  .weatherCard {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
    padding: 2rem;
  }

  .searchBar {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .cityInput {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    color: #374151;
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    border: none;
    font-size: 1rem;
    transition: box-shadow 0.3s;
  }
  .cityInput::placeholder { color: #4b5563; }
  .cityInput:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
  }
  .searchBtn {
    background-color: white;
    color: #60a5fa;
    border-radius: 0.75rem;
    padding: 0.6rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .searchBtn:hover { background-color: #e5e7eb; }

  .statusContainer {
    text-align: center;
    padding: 2rem 0;
    color: white;
  }
  .loader {
    animation: spin 1s linear infinite;
    height: 3rem;
    width: 3rem;
    border-bottom: 2px solid white;
    border-radius: 50%;
    margin: 0 auto;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .weatherInfo {
    text-align: center;
    color: white;
    margin-top: 2rem;
  }
  .weatherIcon {
    margin: -1rem auto 0;
    width: 8rem;
    height: 8rem;
  }
  .temperature {
    font-size: 3.75rem;
    font-weight: 700;
  }
  .description {
    font-size: 1.25rem;
    text-transform: capitalize;
    font-weight: 500;
    margin-top: 0.5rem;
  }
  .cityName {
    font-size: 1.875rem;
    font-weight: 600;
    margin-top: 0.25rem;
  }

  .detailsGrid {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    text-align: left;
  }
  .detailBox {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 1rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .detailBox p { margin: 0; }
  .detailValue {
    font-weight: bold;
    font-size: 1.125rem;
  }
  .detailLabel {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .poweredBy {
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.75rem;
    margin-top: 1rem;
  }
`;

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "879016d2bc7fe64d455cbc0d6b80f17b";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const fetchWeather = async (location) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`${apiUrl}${location}&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error('City not found. Please check the spelling.');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("Gangtok");
  }, []);

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && city.trim()) {
      fetchWeather(city);
    }
  };

  const WeatherInfo = () => (
    <div className="weatherInfo">
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
        alt="Weather Icon"
        className="weatherIcon"
      />
      <h1 className="temperature">{Math.round(weatherData.main.temp)}°C</h1>
      <p className="description">{weatherData.weather[0].description}</p>
      <h2 className="cityName">{weatherData.name}, {weatherData.sys.country}</h2>
      
      <div className="detailsGrid">
        <div className="detailBox" style={{color: '#bfdbfe'}}>
          <HumidityIcon />
          <div>
            <p className="detailValue" style={{color: 'white'}}>{weatherData.main.humidity}%</p>
            <p className="detailLabel">Humidity</p>
          </div>
        </div>
        <div className="detailBox" style={{color: '#e5e7eb'}}>
          <WindIcon />
          <div>
            <p className="detailValue" style={{color: 'white'}}>{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</p>
            <p className="detailLabel">Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{allStyles}</style>
      <div className="appContainer">
        <div className="mainWrapper">
          <div className="weatherCard">
            <div className="searchBar">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyUp={handleKeyPress}
                placeholder="Enter city name"
                className="cityInput"
              />
              <button onClick={handleSearch} className="searchBtn" aria-label="Search Weather">
                <SearchIcon />
              </button>
            </div>

            {loading && (
              <div className="statusContainer">
                <div className="loader" aria-label="Loading spinner"></div>
                <p style={{ marginTop: '0.5rem' }}>Loading...</p>
              </div>
            )}

            {error && (
              <div className="statusContainer">
                <div style={{color: '#fecaca', marginBottom: '0.75rem'}}>
                  <ErrorIcon />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Error</h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{error}</p>
              </div>
            )}

            {weatherData && !loading && !error && <WeatherInfo />}
          </div>
          <p className="poweredBy">Powered by OpenWeatherMap</p>
        </div>
      </div>
    </>
  );
}

export default Weather;
