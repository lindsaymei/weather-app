import React from 'react';

const UnitToggleButton = ({ units, onToggle }) => {
    return (
        <button className="unit-toggle-button" onClick={onToggle}>
            {units === 'imperial' ? '°F' : '°C'}
        </button>
    );
};

export default UnitToggleButton;
