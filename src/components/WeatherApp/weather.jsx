import React, { useEffect, useState } from 'react';
import './weatherApp.css';

import {FindIcon} from './assignIcon';
function Weather(weatherData) {
  weatherData = weatherData.weatherData.location;
  
  
  return (
    <div>
      <h1>weather today </h1>
        {weatherData ? (
          <div className='currWeather'> 
            <p> Weather for {weatherData.address.split(',')[0] + weatherData.address.split(',')[1]} </p>
            <p> {weatherData.currentConditions.temp}°F</p>
          </div>
        ) : null}
    </div>
  );
}

export default Weather;
