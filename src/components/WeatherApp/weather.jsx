import React, { useEffect, useState } from 'react';
import './weatherApp.css';

import {FindIcon} from './assignIcon';
function Weather(weatherData) {
  weatherData = weatherData.weatherData.location;
  console.log(weatherData);
  return (
    <div>
      <h1>weather today </h1>
        {weatherData.currentConditions && (
          <div className='currWeather'> 
            <p> Weather for {weatherData.address} </p>
            <p> {weatherData.currentConditions.temp}°F</p>
          </div>
        )}
    </div>
  );
}

export default Weather;
