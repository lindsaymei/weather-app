import React, { useEffect, useState } from 'react';
import './weatherApp.css';
import sun from '../assets/sun.png';
import rain from '../assets/sun_rain.png';
import snow from '../assets/sun_snow.png';
import clouds from '../assets/sun_clouds.png';
import storm from '../assets/sun_storm.png';
import wind from '../assets/sun_wind.png';

export function FindIcon(weatherMain) {
    //assumes the weatherMain arg is the icon name for simplicity
   
  if(weatherMain !== undefined){
   switch(weatherMain){
    case  "clear-day":
    case "clear-night":
        return <img className='todayIcon' src={sun} alt='weather icon'></img>;
    case "rain":
        return <img className='todayIcon' src={rain} alt='weather icon'></img>; 
    case "snow":
        return <img className='todayIcon' src={snow} alt='weather icon'></img>;
    case "thunder-showers-day":
    case"thunder-rain":
        return <img className='todayIcon' src={storm} alt='weather icon'></img>;
    case "fog":
    case "cloudy":
    case"partly-cloudy-day":
    case "partly-cloudy-night":
        return <img className='todayIcon' src={clouds} alt='weather icon'></img>;
    case "wind":
        return <img className='todayIcon' src={wind} alt='weather icon'></img>; //TODO: find a better icon maybe?
    default:
        return <img className='todayIcon' src={snow} alt='weather icon'></img>;
        
    }
    

  } 
   
 
}

