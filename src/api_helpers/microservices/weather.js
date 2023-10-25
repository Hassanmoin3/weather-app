import httpGet from '../requests/httpGet';

const BASE_URL = 'https://api.weatherapi.com/v1';
const API_KEY = 'a08188d07b8e41ec83193800232310';
const forecastDays = 10

export async function getLocationData(location) {
  try {
    const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${location}`;
    return httpGet(url, location);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function getSearch(location) {
  try {
    const url = `${BASE_URL}/search.json?key=${API_KEY}&q=${location}`;
    return httpGet(url, location);
  } catch (error) {
    console.error('Error fetching search data:', error);
    throw error;
  }
}

export async function getWeatherDetails(location) {
  try {
    const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location.name}&days=${forecastDays}`;
    return httpGet(url, location);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}
