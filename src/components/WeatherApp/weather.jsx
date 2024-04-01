import React from 'react';
import { FindIcon } from './assignIcon';

function Weather({ weatherData, units }) {
    if (!weatherData || !weatherData.days) {
        return null;
    }

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    const todayName = days[date.getDay()];
    const time = date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    const todayData = weatherData.days[0];
    const next6Hours = [];
    let currentHour = date.getHours();
    
    // Start from the next hour
    currentHour = (currentHour + 1) % 24;

    for (let i = 0; i < 6; i++) {
        // Calculate the forecasted hour
        const forecastedHour = (currentHour + i) % 24;
        next6Hours.push(todayData.hours[forecastedHour]);
    }

    const convertTemp = (temp) => {
        if (units === 'imperial') {
            return temp;
        } else {
            return ((temp - 32) * 5 / 9).toFixed(1);
        }
    };

    const convertTo12Hour = (hour) => {
        return (hour % 12 || 12) + (hour >= 12 ? ' PM' : ' AM');
    };

    const hourlyData = next6Hours.map((hour, index) => {
        if (hour && hour.icon) {
            // Calculate the forecasted hour in 12-hour format
            const forecastedHour12 = convertTo12Hour((currentHour + index) % 24);
            return (
                <div key={index}>
                    <li key={index} className='hourPeak'>
                        {FindIcon(hour.icon)}
                        <h3>{forecastedHour12}</h3>
                        <p>{convertTemp(hour.temp)}{units === 'imperial' ? '°F' : '°C'}</p>
                    </li>
                </div>
            );
        } else {
            return null;
        }
    });
    // to display the hours in ascending order
    hourlyData.reverse();


    return (
        <div>
            <div className='container'>
                <div className='currWeather'>
                    <h1>{todayName}</h1>
                    <h2>{time}</h2>
                    {FindIcon(todayData.icon)}
                    <div className='conds'>
                        <h2>{weatherData.resolvedAddress.split(',')[0] + weatherData.resolvedAddress.split(',')[1]}</h2>
                        <p>{convertTemp(weatherData.currentConditions.temp)}{units === 'imperial' ? '°F' : '°C'}</p>
                        <p className='maxmin'>{convertTemp(todayData.tempmax)}/{convertTemp(todayData.tempmin)}{units === 'imperial' ? '°F' : '°C'}</p>
                        <p className='feelsLike'>Feels like {convertTemp(todayData.feelslike)}{units === 'imperial' ? '°F' : '°C'}</p>
                        <p>{todayData.description}</p>
                    </div>
                </div>
                <ul className='hourly'>
                    {hourlyData}
                </ul>
            </div>
        </div>
    );
}

export default Weather;
