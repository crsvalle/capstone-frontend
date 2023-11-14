import axios from 'axios';
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const MAP_API = process.env.GEOLOCATION_API;

const Map = ({ location }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get('http://localhost:3003/listings')
      .then((res) => setList(res.data))
      .catch((e) => console.warn("catch", e))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const fetchGeocodedMarkers = async () => {
      const newMarkers = [];

      for (const el of list) {
        try {
          const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
              address: el.address,
              key: MAP_API,
            },
          });

          const results = response.data.results;

          if (results.length > 0) {
            newMarkers.push({
              position: results[0].geometry.location,
            });
          }
        } catch (error) {
          console.error('Geocoding error:', error);
        }
      }

      setMarkers(newMarkers);
    };

    fetchGeocodedMarkers();
  }, [list]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <LoadScript googleMapsApiKey={MAP_API}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={11}
      >
        <MarkerClusterer>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position} />
          ))}
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
