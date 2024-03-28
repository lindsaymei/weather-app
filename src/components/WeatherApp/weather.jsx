import React, { useEffect, useState } from 'react';
import './weatherApp.css';

import {FindIcon} from './assignIcon';
function Weather(weatherData) {
  if(weatherData !== undefined && weatherData.weatherData.days !== undefined){
    weatherData = weatherData.weatherData;
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var date = new Date();
    var todayName = days[date.getDay()];
    var time = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    var todayData = weatherData.days[0];
    var nextHour = date.getHours() - 1;
    var overFlowHours = 0; 
    var next5Hours = [];
    if(nextHour + 5 > 23){
      overFlowHours = nextHour + 5 - 23;
    }
    for (var i = nextHour; i < (nextHour + 5) && i < 23; i++){
      next5Hours.push(todayData.hours[i]);
    }
    if(overFlowHours > 0){
      for (var i = 0; i < overFlowHours && i < 23; i++){
        next5Hours.push(weatherData.days[1].hours[i]);
      }
    }
    const hourlyData = next5Hours.map((hour, index) => (
      <div key={index}>
          <li key={index} className='hourPeak'>
              {FindIcon(hour.icon)}
              <h3> {hour.datetime}</h3>
              <p>{hour.temp}</p>
          </li>
      </div>
));
  
  return (
    <div>
        {weatherData ? (
          <div className='container'>
          <div className='currWeather'> 
            <h1>{todayName}</h1>
            <h2> {time}</h2>
            {FindIcon(todayData.icon)}
            <div className='conds'>
            <h2> {weatherData.resolvedAddress.split(',')[0] + weatherData.resolvedAddress.split(',')[1]} </h2>
            <p> {weatherData.currentConditions.temp}°F</p>
            <p className='maxmin'>{todayData.tempmax}/{todayData.tempmin}°F</p>

            <p className='feelsLike'>Feels like {todayData.feelslike}°F</p>
            <p>{todayData.description}</p>
            </div>
          </div>
            <ul className='hourly'> 
              {hourlyData}
            </ul> 
          </div>
        ) : null}
    </div>
  );
  }

  
}

export default Weather;
