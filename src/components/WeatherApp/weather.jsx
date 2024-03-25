import React, { useEffect, useState } from 'react';
import './weatherApp.css';
// import sun from './assets/sun.png';
// import rain from './assets/sun_rain.png';
// import snow from './assets/sun_snow.png';
// import clouds from './assets/sun_clouds.png';
// import storm from './assets/sun_storm.png';
// import wind from './assets/sun_wind.png';
import temp_search_icon from "../assets/search_red.jpg";


const Weather =({weatherData}) =>{
  const open_api_key = "927ff31c800fbd111a2e2e414aa55341"
  var f = 0; 
  console.log(weatherData);
  if(weatherData !== undefined){
    f = (weatherData.main.temp - 273.15) * 9/5 + 32; 

  }

  return (
    
    <div>
        {weatherData.weather ? (
          <div className='currWeather'> 
          <p> Weather in {weatherData.name} </p>
            <p> {f}°F</p>
            
          </div>

        ):null}
    </div>
   
  );
}

export default Weather;
