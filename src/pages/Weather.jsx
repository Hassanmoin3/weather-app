import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Grid, Box, Button,CircularProgress } from '@mui/material';
import { getLocationData, getWeatherDetails } from '../api_helpers/microservices/weather';
import { Wrapper } from '../components/Weather/style';
import TemperatureToggle from '../components/Location/TemperatureToggle';
import WeatherDay from '../components/Weather/WeatherDay';
import WeatherCurrent from '../components/Weather/WeatherCurrent';
import WeatherHour from '../components/Weather/WeatherHour';
import { useTemperatureContext } from '../context_api/TemperatureContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Weather() {
  const { temperatureUnit, toggleTemperatureUnit } = useTemperatureContext();
  const { locationId } = useParams(); // Get the location ID from the URL params
  const [weatherData, setWeatherData] = useState(null);
  const [currentHour, setCurrentHour] = useState(0);

  const handleSliderChange = (newValue) => {
    setCurrentHour(newValue);
  };

  useEffect(() => {
    const savedLocations = JSON.parse(localStorage.getItem('locations'));
    const location = savedLocations.find((loc) => loc.id === locationId);
    const fetchWeatherDetails = async () => {
      try {
        const response = await getWeatherDetails(location);
        getLocationData(location.name)
          .then((data) => setWeatherData({ ...response, current: data.current }))
          .catch((error) => console.error('Error fetching weather data:', error));

      } catch (error) {
        console.error('Error fetching location details:', error);
      }
    };

    if (location) {
      fetchWeatherDetails();
      document.title = `Weather App - ${location.name}`;
    }
  }, []);

  if (!weatherData) {
    return null
  }

  const { location, current, forecast } = weatherData;
  const headingStyles = {
    color: '#2c3e50',
    marginBottom: '10px',
    marginTop: '10px',
    fontWeight: 'bold',
  };

  return (
    <Wrapper>
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" style={headingStyles}>Weather App</Typography>
          <Grid sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <Button component={Link} to="/" variant="outlined" color="primary" sx={{ marginRight: '20px' }}>
              Back
            </Button>
            <TemperatureToggle unit={temperatureUnit} toggleUnit={toggleTemperatureUnit} />
          </Grid>
        </Box>

        <WeatherCurrent current={current} location={location} />

        <Typography variant="h5" style={headingStyles} >Hourly Forecast</Typography>

        <Carousel
          selectedItem={currentHour}
          onChange={handleSliderChange}
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          dynamicHeight={false}
          useKeyboardArrows={true}
          infiniteLoop={true}
        >
          {forecast?.forecastday[0].hour.reduce((acc, hour, i) => {
              if (i % 4 === 0) {
                acc.push(
                  <Grid container key={"hour" + i}>
                    {forecast?.forecastday[0].hour.slice(i, i + 4).map((hour, j) => (
                      <WeatherHour key={"hour" + (i+j+1000)} hour={hour} current={current} />
                    ))}
                  </Grid>
              );
            }
            return acc;
          }, [])}
        </Carousel>

        <Typography variant="h5" style={headingStyles}>10-Day Forecast</Typography>

        <Grid container spacing={2}>
          {forecast?.forecastday.map((day, i) => (
            <WeatherDay key={"day" + i} day={day} />
          ))}
        </Grid>


      </Container>
    </Wrapper>
  );
}

export default Weather;
