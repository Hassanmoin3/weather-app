import { Typography, Grid, Card, CardContent, ListItem, ListItemIcon } from '@mui/material';
import React from 'react';
import { useTemperatureContext } from '../../context_api/TemperatureContext';
import { Cloud, Air, Opacity, Thermostat } from '@mui/icons-material';

const WeatherCurrent = ({ current, location }) => {
  const { temperatureUnit, toggleTemperatureUnit } = useTemperatureContext();

  const getTemperatureValue = (feelslike = false) => {
    const temperature = feelslike ? (temperatureUnit === 'Celsius' ? current.feelslike_c : current.feelslike_f) : (temperatureUnit === 'Celsius' ? current.temp_c : current.temp_f);
    return `${temperature}${temperatureUnit === 'Celsius' ? '°C' : '°F'}`;
  };



  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Card className="weather-card">
          <CardContent>
            <Typography variant="h3">{getTemperatureValue()}</Typography>
            <Typography variant="subtitle1" className="city">{`${location.name}, ${location.country}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card className="weather-card">
          <CardContent>
            <Grid className='flex-display'>
              <Typography variant="h5">Weather Condition</Typography>
              <Cloud className='icon-style' />
            </Grid>
            <Grid className='flex-display'>
              <Typography variant="h5">{current?.condition.text}</Typography>
              <img src={current?.condition.icon} alt="Weather Icon" className='icon-style' />
            </Grid>
          </CardContent>

        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card className="weather-card">
          <CardContent>
            <Grid className='flex-display'>
              <Typography variant="h5">Wind</Typography>
              <Air className='icon-style' />
            </Grid>
            <Typography variant="h4">{current?.wind_kph} km/h</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card className="weather-card">
          <CardContent>
            <Grid className='flex-display'>
                <Typography variant="h5">Humidity</Typography>
                <Opacity className='icon-style'/>
            </Grid>
            <Typography variant="h4">{current?.humidity}%</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card className="weather-card">
          <CardContent>
            <Grid className='flex-display'>
              <Typography variant="h5">Feels Like</Typography>
              <Thermostat className='icon-style' />
            </Grid>
            <Typography variant="h4">{getTemperatureValue(true)}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default WeatherCurrent;
