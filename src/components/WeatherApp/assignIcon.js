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
    case weatherMain === "clear-day" || weatherMain === "clear-night":
        return <img className='todayIcon' src={sun} alt='weather icon'></img>;
    case weatherMain === "rain":
        return <img className='todayIcon' src={rain} alt='weather icon'></img>; 
    case weatherMain === "snow":
        return <img className='todayIcon' src={snow} alt='weather icon'></img>;
    case weatherMain === "thunder-showers-day" || weatherMain === "thunder-rain":
        return <img className='todayIcon' src={storm} alt='weather icon'></img>;
    case weatherMain === "fog" || weatherMain ==="cloudy" || weatherMain ==="partly-cloudy-day" || weatherMain ==="partly-cloudy-night":
        return <img className='todayIcon' src={clouds} alt='weather icon'></img>;
    case weatherMain === "wind":
        return <img className='todayIcon' src={wind} alt='weather icon'></img>; //TODO: find a better icon maybe?
    default:
        return <img className='todayIcon' src={sun} alt='weather icon'></img>;
        
    }
    

  } 
   
 
}

