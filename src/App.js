import './App.css';
import Weather from './components/WeatherApp/weather';
import React, { useEffect, useState } from 'react';
import temp_search_icon from "./components/assets/search_red.jpg";

function App() {
  const open_api_key = "927ff31c800fbd111a2e2e414aa55341"

  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${open_api_key}`
  const searchLocation = (event) => {
    if(event.key ==="Enter"){
      fetch(url)
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        console.log(response);
      });
      setLocation("");
    }
  }
  return (
    
    
    <div className="app">
        <div className='cityBar'>
            <input type="text" className='cityInput' placeholder='search'
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDownCapture={searchLocation}
            />
            <div className='searchIcon'>
                <img src={temp_search_icon} alt='search icon'></img>
            </div>
        </div>
        <Weather weatherData={data} />

    </div>
  );
}

export default App;
