import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, Modal, Typography } from '@mui/material';
import LocationItem from './LocationItem';
import LocationEdit from './LocationEdit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  backgroundColor: '#eaedf2',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const LocationList = ({ locations, unit, setLocations }) => {
  const [sortedLocations, setSortedLocations] = useState([]);
  const [editLocation, setEditLocation] = useState({});
  const [open, setOpen] = useState(false);

  const handleEditLocation = (locationId) => { 
    const editLocation = sortedLocations.find((location) => location.id === locationId);
    setEditLocation(editLocation);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const sorted = [...locations].sort((a, b) => b.favorite - a.favorite);
    setSortedLocations(sorted);
  }, [locations]);

  useEffect(() => {
    sortedLocations.length > 0 && localStorage.setItem('locations', JSON.stringify(sortedLocations));
  }, [sortedLocations]);

  const handleToggleFavorite = (locationId) => {
    const updatedLocations = sortedLocations.map((location) =>
      location.id === locationId
        ? { ...location, id: uuidv4(), favorite: !location.favorite }
        : location
    );
    setLocations(updatedLocations);
  };

  const handleDeleteLocation = (locationId) => {
    setLocations((prevLocations) =>
      prevLocations.filter((location) => location.id !== locationId)
    );
  };

  return (
    <div className="location-list">
      {sortedLocations.map((location) => (
        <LocationItem
          key={location.id}
          location={location}
          unit={unit}
          handleToggleFavorite={handleToggleFavorite}
          handleDeleteLocation={handleDeleteLocation}
          handleEditLocation={handleEditLocation}
        />
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit location
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <LocationEdit
              locations={locations}
              setLocations={setLocations}
              editLocation={editLocation}
              setEditLocation={setEditLocation}
              setOpen={setOpen}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default LocationList;
