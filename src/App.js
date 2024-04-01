import React, { useEffect, useState } from 'react';
import './App.css';
import Weather from './components/WeatherApp/weather';
import SearchRes from './components/WeatherApp/citysearch';
import UnitToggleButton from './components/WeatherApp/UnitToggleButton'; // Importing the UnitToggleButton component
import temp_search_icon from "./components/assets/search_red.jpg";

function App() {
    const open_api_key = "927ff31c800fbd111a2e2e414aa55341";

    const [data, setData] = useState({});
    const [locationSet, setLocationSet] = useState(false);
    const [units, setUnits] = useState('imperial'); // 'imperial' for Fahrenheit, 'metric' for Celsius

    useEffect(() => {
        const fetchData = async () => {
            if (!locationSet) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        const { latitude, longitude } = position.coords;
                        
                        // Fetch city name using reverse geocoding
                        const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${open_api_key}`);
                        const geoData = await geoResponse.json();
                        const cityName = geoData[0].name;
                        const countryName = geoData[0].country;
                        
                        // Fetch weather data based on city name
                        const weatherResponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName},${countryName}?key=A44A6BCTP8LE8ARZZSSZDFE5L`);
                        const weatherData = await weatherResponse.json();
                        
                        setData(weatherData);
                        setLocationSet(true);
                    });
                } else {
                    console.log("Geolocation is not supported by this browser.");
                }
            }
        };

        fetchData();
    }, [locationSet]);

    const handleLocationSelect = async (selectedLocation) => {
        try {
            const { name, country } = selectedLocation;
            const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${name},${country}?key=A44A6BCTP8LE8ARZZSSZDFE5L`);
            const weatherData = await res.json();
            setData(weatherData);
            setLocationSet(true);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const toggleUnits = () => {
        // Toggle between 'imperial' and 'metric' units
        setUnits(units === 'imperial' ? 'metric' : 'imperial');
    };

    return (
        <div>
            <SearchRes onLocationSelect={handleLocationSelect} />
            <UnitToggleButton units={units} onToggle={toggleUnits} /> {/* Unit toggle button */}
            {data ? <Weather weatherData={data} units={units} /> : null}
        </div>
    );
}

export default App;
