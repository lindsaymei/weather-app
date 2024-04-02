import React from 'react';
import { FindIcon } from './assignIcon';

function Weather({ weatherData, units }) {
    if (!weatherData || !weatherData.days) {
        return null;
    }

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowName = days[tomorrow.getDay()];
    const nextDaysData = weatherData.days.slice(1, 7);

    const convertTemp = (temp) => {
        if (units === 'imperial') {
            return temp;
        } else {
            return ((temp - 32) * 5 / 9).toFixed(1);
        }
    };

    // Calculate the next 6-hour forecast
    const next6Hours = [];
    let currentHour = today.getHours() + 1;

    for (let i = 0; i < 6; i++) {
        const forecastedHour = (currentHour + i) % 24;
        next6Hours.unshift(weatherData.days[0].hours[forecastedHour]); // Unshift to add at the beginning
    }

    return (
        <div>
            <div className='container'>
                <div className='currWeather'>
                    <h1>{today.toLocaleDateString('en-US', { weekday: 'long' })}</h1>
                    <h2>{today.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</h2>
                    {FindIcon(weatherData.days[0].icon)}
                    <div className='conds'>
                        <h2>{weatherData.resolvedAddress.split(',')[0] + weatherData.resolvedAddress.split(',')[1]}</h2>
                        <p>{convertTemp(weatherData.currentConditions.temp)}{units === 'imperial' ? '°F' : '°C'}</p>
                        <p className='maxmin'>{convertTemp(weatherData.days[0].tempmax)}/{convertTemp(weatherData.days[0].tempmin)}{units === 'imperial' ? '°F' : '°C'}</p>
                        <p className='feelsLike'>Feels like {convertTemp(weatherData.days[0].feelslike)}{units === 'imperial' ? '°F' : '°C'}</p>
                        <p>{weatherData.days[0].description}</p>
                    </div>
                </div>
                
                <div className = 'forecastCont'>
                <ul className='hourly'>
                    {next6Hours.map((hour, index) => (
                        <div key={index}>
                            <li key={index} className='hourPeak'>
                                <h3>{((currentHour + 5 - index) % 12 || 12) + (currentHour + 5 - index < 12 ? ' AM' : ' PM')}</h3>

                                {FindIcon(hour.icon)}
                                <p>{convertTemp(hour.temp)}{units === 'imperial' ? '°F' : '°C'}</p>
                            </li>
                        </div>
                    ))}
                </ul>
                <div className="forecast">
                    <div className="day-forecast-container">
                        {nextDaysData.map((day, index) => (
                            <div key={index} className="day-forecast">
                                <h3>{days[(today.getDay() + index + 1) % 7]}</h3>
                                {FindIcon(day.icon)}
                                <p>{convertTemp(day.tempmax)}/{convertTemp(day.tempmin)}{units === 'imperial' ? '°F' : '°C'}</p>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
                
            </div>
        </div>
    );
}

export default Weather;

// Helper function to get weather icon based on day or night
//use FindIcon(x.icon)}
function getWeatherIcon(icon, currentHour) {
    const isDay = currentHour >= 6 && currentHour < 18; // Assuming day time between 6 AM and 6 PM
    return isDay ? `sun_${icon}.png` : `moon_${icon}.png`;
}