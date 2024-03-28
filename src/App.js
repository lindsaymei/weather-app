import './App.css';
import Weather from './components/WeatherApp/weather';
import React, { useEffect, useState } from 'react';
import temp_search_icon from "./components/assets/search_red.jpg";
import SearchRes from './components/WeatherApp/citysearch';

function App() {
  const open_api_key = "927ff31c800fbd111a2e2e414aa55341"

  const [data, setData] = useState({});
  const [location, setLocation] = useState(false); //delete me later!!!! temp

  const [locationSet, setLocationSet] = useState(false);
  


  useEffect(() => {
    const fetchData = async () => {
      if (!locationSet) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            const res1 = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=927ff31c800fbd111a2e2e414aa55341`);
            const response1 = await res1.json();
  
            const cityName = response1[0].name;
            const countryName = response1[0].country;
            setLocation(cityName);
  
            const res2 = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&contentType=json&unitGroup=us&locationMode=single&key=A44A6BCTP8LE8ARZZSSZDFE5L&locations=${cityName}%2CUS`);
            const response2 = await res2.json();
  
            console.log(response2);
            setData(response2);
            setLocationSet(true);
          });
        }
      }
    };
  
    fetchData();
  }, [locationSet]);


 

//TODO: edit statements to be responsive

  return (
    
    <div>
       
            <SearchRes />
            {data? (
              <Weather weatherData={data} />
            ):undefined }
            

          
            

    </div>
    
  );
  }


 


export default App;
