import React, { useState } from 'react';
import './weatherApp.css';
import temp_search_icon from "../assets/search_red.jpg";

const SearchRes = () => {
    const open_api_key = "927ff31c800fbd111a2e2e414aa55341";
    const [location, setLocation] = useState("");
    const [cities, setCities] = useState([]);

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${open_api_key}`;

    const searchLocation = (event) => {
        if (event.key === "Enter") {
            fetch(url)
                .then((res) => res.json())
                .then((response) => {
                    setCities(response);
                    console.log(response);
                });
        }
    }

    const possCities = cities.map((city, index) => (
        <div key={index}>
            <li key={index} className='searchResult'>
                <h1>{city.name}</h1>
                <p>{city.state}</p>
                <p>{city.country}</p>
            </li>
        </div>
    ));

    return (
        <div>
            <div className='searchBar col'>
                <input type="text" className='cityInput' placeholder='search'
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    onKeyDown={searchLocation}
                />
                <ul>
                {possCities}

                </ul>
                <div className='searchIcon'>
                <img src={temp_search_icon} alt='search icon'></img>
            </div>
            </div>
            
            
        </div>
    )
}

export default SearchRes;