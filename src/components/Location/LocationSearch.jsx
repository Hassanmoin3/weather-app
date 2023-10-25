import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getLocationData, getSearch } from '../../api_helpers/microservices/weather';
import { v4 as uuidv4 } from 'uuid';

const LocationSearch = ({ locations, setLocations }) => {
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState([]);

  const handleSearch = async (location) => {
    if (!location) {
      return;
    }
    setSearchText(location);
    const response = await getSearch(location);
    const locationOptions = response.map((item) => `${item.name}, ${item.country}`);
    setOptions(locationOptions);
  };

  
  const handleSelect = async (newValue) => {
    if (!newValue || locations.some((location) => location.name === newValue)) {
      return;
    }
    const { location } = await getLocationData(newValue);
    const newLocation = {
        ...location,
        id: uuidv4(),
        name: newValue,
        favorite: false,
    };
    setLocations([ ...locations, newLocation ]);
    setSearchText('');
  };

  return (
    <Autocomplete
      freeSolo
      id="country-search"
      options={options}
      value={searchText}
      onInputChange={(event, newValue) => handleSearch(newValue)}
      onChange={(event, newValue) => handleSelect(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a Location"
          margin="normal"
          variant="outlined"
          size="small"
          fullWidth
        />
      )}
    />
  );
};

export default LocationSearch;
