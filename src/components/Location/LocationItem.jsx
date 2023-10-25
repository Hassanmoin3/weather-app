import React, { useState, useEffect } from 'react';
import { getLocationData } from '../../api_helpers/microservices/weather';
import { Checkbox, IconButton, Typography, Grid } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

const LocationItem = ({ location, unit, handleToggleFavorite, handleDeleteLocation, handleEditLocation }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getLocationData(location.name, unit)
      .then((data) => setWeather(data))
      .catch((error) => console.error('Error fetching weather data:', error));
  }, [location.name, unit]);

  if (!weather || !location) {
    return null;
  }


  return (
    <div className='location-item'>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={3} md={3}>
          <img src={weather?.current?.condition.icon} alt="Weather Icon" />
        </Grid>
        <Grid item xs={5} sm={5} md={5} className="temp">
          <Typography variant="h3">{unit === 'Celsius' ? weather?.current.temp_c + 'C' : weather?.current.temp_f + 'F'}°</Typography>
          <Typography variant="subtitle1" className="city">{location.name}</Typography>
        </Grid>
        <Grid item xs={3} sm={4} md={4}>
          <Checkbox
            checked={location.favorite}
            onChange={() => handleToggleFavorite(location.id)}
            icon={<FavoriteBorder color="warning" />}
            checkedIcon={<Favorite />}
          />
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => handleDeleteLocation(location.id)}
          >
            <DeleteIcon />
          </IconButton>
          <Link to={"/" + location.id}>
            <IconButton aria-label="view" color="primary">
              <VisibilityIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="edit" color="secondary" onClick={() => handleEditLocation(location.id)}>
            <Edit />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default LocationItem;
