import { Typography, Grid, Card, CardContent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud } from '@fortawesome/free-solid-svg-icons';
import { useTemperatureContext } from '../../context_api/TemperatureContext';
import React from 'react';

const WeatherDay = ({ day }) => {
  const { temperatureUnit, toggleTemperatureUnit } = useTemperatureContext();
  function getDayFromDate(dateString) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  }

  const getMaxTemperatureValue = () => {
    const temperature = temperatureUnit === 'Celsius' ? day.day.maxtemp_c : day.day.maxtemp_f;
    return `${temperature}°${temperatureUnit === 'Celsius' ? 'C' : 'F'}`;
  };

  const getMinTemperatureValue = () => {
    const temperature = temperatureUnit === 'Celsius' ? day.day.mintemp_c : day.day.mintemp_f;
    return `${temperature}°${temperatureUnit === 'Celsius' ? 'C' : 'F'}`;
  };
  
  return (
    <Grid item xs={12} sm={4} md={4} key={day.date_epoch}>
      <Card className="weather-card">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5">{getDayFromDate(day.date)}</Typography>
              <Grid className='flex-display'>
                <Typography variant="h6">{day.day.condition.text}</Typography>
                <img src={day.day.condition.icon} alt="Weather Icon" className='icon-style' />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FontAwesomeIcon icon={faSun} size="2x" />
              <Typography variant="h6">H: {getMaxTemperatureValue()}</Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FontAwesomeIcon icon={faCloud} size="2x" />
              <Typography variant="h6">L: {getMinTemperatureValue()}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WeatherDay;
