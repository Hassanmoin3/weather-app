import React, { useState } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';
import { getSearch } from '../../api_helpers/microservices/weather';

const LocationEdit = ({ locations, setLocations, editLocation, setEditLocation, setOpen }) => {
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

  const handleSelect = async () => {
    if (!searchText) {
      return;
    }

    const existingLocation = locations.find((location) => location.id === editLocation?.id);

    if (existingLocation) {
      const updatedLocation = {
        ...existingLocation,
        name: searchText,
      };

      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location.id === editLocation.id ? updatedLocation : location
        )
      );
      setEditLocation(null);
    }

    setSearchText('');
    setOpen(false);
  };

  return (
    <>
      <Autocomplete
        freeSolo
        id="country-search"
        options={options}
        value={editLocation?.name}
        onInputChange={(event, newValue) => handleSearch(newValue)}
        onChange={(event, newValue) => setSearchText(newValue)}
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
      <Button onClick={() => handleSelect()}>Save</Button>
    </>
  );
};

export default LocationEdit;
