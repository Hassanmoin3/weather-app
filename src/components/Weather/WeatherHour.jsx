import { Typography, Grid, Card, CardContent } from '@mui/material';
import React from 'react';
import { useTemperatureContext } from '../../context_api/TemperatureContext';

const WeatherHour = ({ hour, current }) => {
  const { temperatureUnit, toggleTemperatureUnit } = useTemperatureContext();

  const getTemperatureValue = () => {
    const temperature = temperatureUnit === 'Celsius' ? hour.temp_c: hour.temp_f;
    return `${temperature}°${temperatureUnit === 'Celsius' ? 'C' : 'F'}`;
  };
  return (
    <Grid item xs={3} sm={3} md={3} key={hour.time_epoch}>
      <Card className="weather-card">
        <CardContent className="weather-card">
          <Typography variant="subtitle1">{hour?.time?.split(" ")[1]}</Typography>
          <Typography variant="h6">{getTemperatureValue()}</Typography>
          <img src={hour?.condition?.icon} alt="Weather Icon" />
          <Typography variant="subtitle2">{hour.condition.text}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WeatherHour;
