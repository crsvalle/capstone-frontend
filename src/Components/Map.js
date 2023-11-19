import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import '../style/Map.css'

const MAP_API = process.env.GEOLOCATION_API;

const containerStyle = {
  width: '400px',
  height: '400px',
};

const Map = ({ location }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapLoading, setMapLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:3003/listings')
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => console.error('Error fetching listings:', error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setMapLoading(true);
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
            icon: {
              url: el.image,
              scaledSize: new window.google.maps.Size(30, 30),
            },
            content: `${el.price}`,
            id:  `${el.listing_id}`,
          });
        } catch (error) {
          console.error('Geocoding error:', error);
        }
      }

      setMarkers(newMarkers);
      setMapLoading(false);
    };

    fetchGeocodedMarkers();
  }, [list]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return (
    loading && mapLoading ? <div>Loading ...</div> : (
      <LoadScript googleMapsApiKey={MAP_API}>
        <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={11}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              icon={marker.icon}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={handleInfoWindowClose}
            >
              <div className='map__marker'>
                <Link to={`/listings/${selectedMarker.id}`}>
                  <img className='map__marker__img' src={selectedMarker.icon.url} alt="Marker Icon" style={{ width: '40px', height: '40px' }}/>
                  <p className='map__marker__p'>{selectedMarker.content}</p>
                </Link>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    )
  );
};

export default Map;
