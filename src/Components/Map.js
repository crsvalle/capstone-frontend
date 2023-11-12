import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 0,
  lng: 0,
};

const mapAPI = process.env.GEOLOCATION_API

const Map = ({ location }) => {
  return (
    <LoadScript googleMapsApiKey={mapAPI}>
      <GoogleMap 
        mapContainerStyle={containerStyle} 
        center={location}
        zoom={11}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
