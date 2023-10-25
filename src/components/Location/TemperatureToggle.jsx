import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTemperatureContext } from '../../context_api/TemperatureContext';

const TemperatureToggle = () => {
  const { temperatureUnit, toggleTemperatureUnit } = useTemperatureContext();

  const handleToggle = (event) => {
    toggleTemperatureUnit(event.target.value);
  };

  return (
    <div className='temperature-toggle'>
      <FormControl variant="outlined" size="small">
        <InputLabel id="temperature-toggle-label">Unit</InputLabel>
        <Select
          labelId="temperature-toggle-label"
          id="temperature-toggle"
          value={temperatureUnit}
          onChange={handleToggle}
          label="Unit"
        >
          <MenuItem value="Celsius">Celsius</MenuItem>
          <MenuItem value="Fahrenheit">Fahrenheit</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TemperatureToggle;
