import './App.css';
import Weather from './components/WeatherApp/weather';
import React, { useEffect, useState } from 'react';
import temp_search_icon from "./components/assets/search_red.jpg";
import SearchRes from './components/WeatherApp/citysearch';

function App() {
  const open_api_key = "927ff31c800fbd111a2e2e414aa55341"

  const [data, setData] = useState({});
  const [locationSet, setLocationSet] = useState(false);


useEffect(() => {
  if (!locationSet) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var lat =position.coords.latitude.toFixed(4); 
        var long = position.coords.longitude.toFixed(4);
        
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&contentType=json&unitGroup=us&locationMode=single&key=A44A6BCTP8LE8ARZZSSZDFE5L&locations=${lat},${long}`,{
          method: 'GET',
        })
          .then((res) => res.json())
          .then((response) => {
            setData(response);
            console.log(response);
            setLocationSet(true);
          });
      });
    }
  }
}, [locationSet]);
//TODO: edit statements to be responsive

  return (
    
    <div>
       
            <SearchRes />
            
            {data && <Weather weatherData={data} />}

          
            

    </div>
    
  );
  }


 


export default App;
