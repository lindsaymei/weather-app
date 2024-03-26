import React, { useEffect, useState } from 'react';
import './weatherApp.css';
import sun from '../assets/sun.png';
import rain from '../assets/sun_rain.png';
import snow from '../assets/sun_snow.png';
import clouds from '../assets/sun_clouds.png';
import storm from '../assets/sun_storm.png';
import wind from '../assets/sun_wind.png';

export function FindIcon(weatherMain) {
  if(weatherMain !== undefined){
   switch(weatherMain){
    case weatherMain === "Clear":
        return <img className='todayIcon' src={sun} alt='weather icon'></img>;
    case weatherMain === "Rain" || weatherMain === "Drizzle":
        return <img className='todayIcon' src={rain} alt='weather icon'></img>; 
    case weatherMain === "Snow":
        return <img className='todayIcon' src={snow} alt='weather icon'></img>;
    case weatherMain === "Thunderstorm":
        return <img className='todayIcon' src={storm} alt='weather icon'></img>;
    case weatherMain === "Clouds":
        return <img className='todayIcon' src={clouds} alt='weather icon'></img>;
    case weatherMain === "Mist" || weatherMain === "Smoke" || weatherMain === "Haze" || weatherMain === "Dust" || weatherMain === "Fog" || weatherMain === "Sand" || weatherMain === "Ash" || weatherMain === "Squall" || weatherMain === "Tornado":
        return <img className='todayIcon' src={wind} alt='weather icon'></img>; //TODO: find a better icon maybe?
    default:
        return <img className='todayIcon' src={clouds} alt='weather icon'></img>;
        
    }
    

  } 
   
 
}

