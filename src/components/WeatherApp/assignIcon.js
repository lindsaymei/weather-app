// assignIcon.js

import React from 'react';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';
import rain from '../assets/sun_rain.png';
import snow from '../assets/sun_snow.png';
import sunClouds from '../assets/sun_clouds.png';
import moonClouds from '../assets/moon_clouds.png';
import storm from '../assets/sun_storm.png';
import wind from '../assets/sun_wind.png';

// Import statements...

export function FindIcon(weatherMain, currentHour) {
    let icon;
    const isNight = currentHour >= 20 || currentHour < 5; // Determine if it's night based on current hour

    switch(weatherMain) {
        case "clear-day":
            icon = isNight ? moon : sun;
            break;
        case "clear-night":
            icon = moon;
            break;
        case "rain":
            icon = rain;
            break;
        case "snow":
            icon = snow;
            break;
        case "thunder-showers-day":
        case "thunder-rain":
            icon = storm;
            break;
        case "fog":
        case "cloudy":
        case "partly-cloudy-day":
        case "partly-cloudy-night":
            icon = isNight ? moonClouds : sunClouds;
            break;
        case "wind":
            icon = wind;
            break;
        default:
            icon = snow;
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
