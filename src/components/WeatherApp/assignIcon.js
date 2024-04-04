import React from 'react';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';
import sun_rain from '../assets/sun_rain.png';
import moon_rain from '../assets/moon_rain.png';
import sun_snow from '../assets/sun_snow.png';
import moon_snow from '../assets/moon_snow.png';
import sun_clouds from '../assets/sun_clouds.png';
import moon_clouds from '../assets/moon_clouds.png';
import sun_storm from '../assets/sun_storm.png';
import moon_storm from '../assets/moon_storm.png';
import sun_wind from '../assets/sun_wind.png';
import moon_wind from '../assets/moon_wind.png';

export function FindIcon(weatherMain, isNight) {
    let icon;

    switch(weatherMain) {
        case "clear-day":
            icon = isNight ? moon : sun;
            break;
        case "clear-night":
            icon = moon;
            break;
        case "rain":
            icon = isNight ? moon_rain : sun_rain;
            break;
        case "snow":
            icon = isNight ? moon_snow : sun_snow;
            break;
        case "thunder-showers-day":
        case "thunder-rain":
            icon = isNight ? moon_storm : sun_storm;
            break;
        case "fog":
        case "cloudy":
        case "partly-cloudy-day":
        case "partly-cloudy-night":
            icon = isNight ? moon_clouds : sun_clouds;
            break;
        case "wind":
            icon = isNight ? moon_wind : sun_wind;
            break;
        default:
            icon = sun; // Default to sun for unknown weather conditions during the day
            break;
    }

    return <img className='todayIcon' src={icon} alt='weather icon' />;
}


// // Helper function to get weather icon based on day or night
function getWeatherIcon(icon, currentHour) {
    const isNight = currentHour >= 20 || currentHour < 5; // Check if it's night time (8PM to 5AM)
    const timeSuffix = isNight ? 'moon' : 'sun'; // Choose the appropriate time suffix for the icon
    return `${timeSuffix}_${icon}.png`; // Return the corresponding icon
}
