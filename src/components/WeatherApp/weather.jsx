import React from 'react';
import { FindIcon } from './assignIcon';

function Weather({ weatherData, units }) {
    if (!weatherData || !weatherData.days) {
        return null;
    }

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const currentHour = today.getHours(); // Get the current hour
    console.log("Current Hour:", currentHour);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowName = days[tomorrow.getDay()];
    const nextDaysData = weatherData.days.slice(1, 7);

    const isNight = (hour) => {
        const adjustedHour = (hour + 24) % 24; // Adjust hour to handle negative values
        const isNight = adjustedHour >= 20 || adjustedHour < 5; // Check if it's night time (8 PM to 5 AM)
        return isNight;
    };
    

    const convertTemp = (temp) => {
        if (units === 'imperial') {
            return temp;
        } else {
            return ((temp - 32) * 5 / 9).toFixed(1);
        }
    };

    // Calculate the next 6-hour forecast
    const next6Hours = [];
    let nextHour = today.getHours() + 1;

    for (let i = 0; i < 8; i++) {
        const forecastedHour = (nextHour + i) % 24;
        next6Hours.push(forecastedHour);
    }

    return (
        <div>
            <div className='container'>
                <div className='currWeather'>
                    <h1>{today.toLocaleDateString('en-US', { weekday: 'long' })}</h1>
                    <h2>{today.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</h2>
                    {FindIcon(weatherData.days[0].icon, isNight)} {/* Pass the isNight flag */}
                    <div className='conds'>
                        <h2>{weatherData.resolvedAddress.split(',')[0] + weatherData.resolvedAddress.split(',')[1]}</h2>
                        <p>{convertTemp(weatherData.currentConditions.temp)}{units === 'imperial' ? '°F' : '°C'}</p>
                        <p className='maxmin'>{convertTemp(weatherData.days[0].tempmax)}/{convertTemp(weatherData.days[0].tempmin)}{units === 'imperial' ? '°F' : '°C'}</p>
                        <p className='feelsLike'>Feels like {convertTemp(weatherData.days[0].feelslike)}{units === 'imperial' ? '°F' : '°C'}</p>
                        <p>{weatherData.days[0].description}</p>
                    </div>
                </div>
                
                <div className='forecastCont'>
                    <ul className='hourly'>
                        {next6Hours.map((hour, index) => (
                            <div key={index}>
                                <li key={index} className='hourPeak'>
                                    <h3>{(hour % 12 || 12) + (hour < 12 ? ' AM' : ' PM')}</h3>
                                    {FindIcon(weatherData.days[0].hours[hour].icon, hour)} {/* Pass the current hour */}
                                    <p>{convertTemp(weatherData.days[0].hours[hour].temp)}{units === 'imperial' ? '°F' : '°C'}</p>
                                    {weatherData.days[0].hours[hour].predictedTemp && (
                                        <p>Predicted: {convertTemp(weatherData.days[0].hours[hour].predictedTemp)}{units === 'imperial' ? '°F' : '°C'}</p>
                                    )}
                                </li>
                            </div>
                        ))}
    </ul>
    <div className="forecast">
        <div className="day-forecast-container">
            {nextDaysData.map((day, index) => (
                <div key={index} className="day-forecast">
                    <h3>{days[(today.getDay() + index + 1) % 7]}</h3>
                    {FindIcon(day.icon)} {/* Always pass sun icon for the next few days */}
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


// // Helper function to get weather icon based on day or night
// //use FindIcon(x.icon)}
// function getWeatherIcon(icon, currentHour) {
//     const isNight = currentHour >= 20 || currentHour < 5; // Check if it's night time (8PM to 5AM)
//     const timeSuffix = isNight ? 'moon' : 'sun'; // Choose the appropriate time suffix for the icon
//     return `${timeSuffix}_${icon}.png`; // Return the corresponding icon
// }
