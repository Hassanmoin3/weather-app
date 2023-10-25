import React, { createContext, useState, useContext } from 'react';

const TemperatureContext = createContext();

const TemperatureProvider = ({ children }) => {
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');

  const toggleTemperatureUnit = (unit) => {
    setTemperatureUnit(unit);
  };

  return (
    <TemperatureContext.Provider value={{ temperatureUnit, toggleTemperatureUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};

const useTemperatureContext = () => {
  return useContext(TemperatureContext);
};

export { TemperatureProvider, useTemperatureContext };