import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './weatherApp.css'; // Import the CSS file
import { Input } from '@mui/base/Input';
import temp_search_icon from "../assets/search_red.jpg";

const SearchRes = ({ onLocationSelect }) => {
    const open_api_key = "927ff31c800fbd111a2e2e414aa55341";
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const onSuggestionsFetchRequested = async ({ value }) => {
        await fetchSuggestions(value);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const fetchSuggestions = async (value) => {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${open_api_key}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                const cities = data.map(city => ({
                    name: city.name,
                    state: city.state,
                    country: city.country
                }));
                setSuggestions(cities);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const getSuggestionValue = (suggestion) => suggestion.name;

    const renderSuggestion = (suggestion) => (
        <div>
            <h3>{suggestion.name}</h3>
            <p>{suggestion.state}</p>
            <p>{suggestion.country}</p>
        </div>
    );

    const inputProps = {
        placeholder: 'Search for a location ⌕',
        value: query,
        onChange: (event, { newValue }) => setQuery(newValue),
        className: 'custom-input' 

    };

    const onSuggestionSelected = (event, { suggestion }) => {
        // Pass the selected location to the parent component
        onLocationSelect(suggestion);
    };

    return (

        <div className="autosuggest-container"> {/* Updated class name */}
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={onSuggestionSelected}
            />
            {/* <div className='searchIcon'>


                <img src={temp_search_icon} alt='search icon'></img>
            </div> */}
        </div>
    );
};

export default SearchRes;
