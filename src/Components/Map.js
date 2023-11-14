import  { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const Map = ({ location }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:3003/listings')
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => console.error('Error fetching listings:', error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const fetchGeocodedMarkers = async () => {
      const newMarkers = [];

      for (const el of list) {
        const address = `${el.street}, ${el.city}, ${el.state} ${el.zip}`;

        try {
          const geocoder = new window.google.maps.Geocoder();
          const result = await new Promise((resolve, reject) => {
            geocoder.geocode({ address }, (results, status) => {
              if (status === 'OK' && results.length > 0) {
                resolve(results[0].geometry.location);
              } else {
                reject(new Error('Geocoding failed'));
              }
            });
          });

          newMarkers.push({
            position: result,
          });
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
    <LoadScript googleMapsApiKey={process.env.GEOLOCATION_API}>
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={11}>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position} />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
