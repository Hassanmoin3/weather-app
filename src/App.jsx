import './style.css';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Location from './pages/Location';
import { Wrapper } from './assets/style';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Weather from './pages/Weather';
import { TemperatureProvider } from './context_api/TemperatureContext';

function App() {
  return (
    <TemperatureProvider>
      <Wrapper className="App">
        <HelmetProvider>
          <Helmet>
            <title>Weather Application</title>
          </Helmet>
        </HelmetProvider>
        <BrowserRouter>
          {/* Set up React Router routes */}
          <Routes>
            {/* Route to the location details page */}
            <Route path="/:locationId" element={<Weather />} />
            {/* Default route for the location list */}
            <Route path="/" element={<Location />} />
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </TemperatureProvider>
  );
}

export default App;
