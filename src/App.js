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
    console.log("location is undefined");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var lat =position.coords.latitude.toFixed(3); 
        var long = position.coords.longitude.toFixed(3);
        console.log("coords:" +lat, long)

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${open_api_key}`)
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
  return (
    
    <div>
       
            <SearchRes/>
            {data ? (
              <Weather weatherData={data}/>

          ):null}
            
            

    </div>
    
  );
}

export default App;
