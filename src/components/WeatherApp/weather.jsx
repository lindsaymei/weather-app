import React, { useEffect, useState } from 'react';
import './weatherApp.css';
import sun from '../assets/sun.png';
import rain from '../assets/sun_rain.png';
import snow from '../assets/sun_snow.png';
import clouds from '../assets/sun_clouds.png';
import storm from '../assets/sun_storm.png';
import wind from '../assets/sun_wind.png';

const Weather =({weatherData}) =>{
  const open_api_key = "927ff31c800fbd111a2e2e414aa55341"
  var f = 0; 
  var currLoc = "Charlotte"
  const [data, setData] = useState({});
  const [locationSet, setLocationSet] = useState(false);

  //COMMENT OUT IF GETTING 'TEMP UNDEFINED ERROR' - i will look into it !
  console.log(weatherData);
  if(weatherData !== undefined){
    f = 1.8 * (weatherData.main.temp - 273) +32; 
    f = f.toFixed(1)
    console.log(weatherData); 

  } 
  
  var today_icon = `components/assets/sun.png`;
  if(weatherData.main !== undefined){
    
  }
  return (
    
    <div>
        {weatherData.weather ? (
          <div className='currWeather'> 
          <img className='todayIcon' src={sun} alt='weather icon'></img>;
          <p> Weather in {weatherData.name} </p>
            <p> {f}°F</p>
            
          </div>

        ):null}
    </div>
   
  );
}

export default Weather;
