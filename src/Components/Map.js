
/* global google */     //makes google gloable to be used google.map

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import '../style/Map.css'

const API = process.env.REACT_APP_API_URL;

const containerStyle = {
  width: '525px',
  height: '400px',
};

const Map = ({ location, hoveredListingId, googleMapsLoader}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [distance, setDistance] = useState(null);



  const fetchMarkers = async () => {
    try {
      const newMarkers = [];

      for (const el of list) {
        const address = `${el.street}, ${el.city}, ${el.state} ${el.zip}`;
        const result = await geocodeAddress(address);

        newMarkers.push({
          position: result,
          icon: {
            url: el.image,
          },
          content: `${el.price}`,
          id: el.listing_id,
        });
      }

      setMarkers(newMarkers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
  
    // Load the Google Maps library dynamically
    googleMapsLoader.load().then(() => {
      // Fetch listings after the library is loaded
      fetch(`${API}/listings`)
        .then((response) => response.json())
        .then((data) => setList(data))
        .catch((error) => console.error('Error fetching listings:', error))
        .finally(() => setLoading(false));
    });
  }, [googleMapsLoader]);
  

  useEffect(() => {
    if (list.length > 0) {
      fetchMarkers();
    }
  }, [list]);

  const geocodeAddress = async (address) => {
    try {
      // Ensure the Google Maps library is loaded dynamically
      await googleMapsLoader.load();
  
      // Use the geocoding service from the loaded library
      const geocoder = new google.maps.Geocoder();
      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results.length > 0) {
            resolve(results);
          } else {
            reject(new Error('Geocoding response did not contain valid data'));
          }
        });
      });
  
      const location = results[0].geometry.location;
      return { lat: location.lat(), lng: location.lng() };
    } catch (error) {
      console.error('Error geocoding address:', error.message);
      return { lat: 0, lng: 0 };
    }
  };
  
  //distance calcuator bet current position and marker clicked
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3959; // Radius of the earth in miles
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in miles
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleMarkerClick = (marker) => {
    //console.log('Clicked Marker ID:', marker.id);

    // Calculate distance between center location and marker location
    const distance = calculateDistance(
      location.lat,
      location.lng,
      marker.position.lat,
      marker.position.lng
    );

    setDistance(distance.toFixed(2)); 

    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    if (selectedMarker && selectedMarker.position) {
      setSelectedMarker(null);
      setDistance(null);
    }
  };

  return (
    loading && mapLoading ? <div>Loading ...</div> : (
      <GoogleMap 
        mapContainerStyle={containerStyle} 
        center={location} 
        zoom={11}
        options={{
          disableDefaultUI: true, // Disable default map controls
          zoomControl: true,
          scaleControl: true,
          fullscreenControl: true,
        }}
      >
        <Marker
            position={location}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            }}
          />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={{
              url: marker.icon.url,
              scaledSize: {
                width: hoveredListingId === marker.id ? 60 : 30,
                height: hoveredListingId === marker.id ? 60 : 30,
              },
            }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={handleInfoWindowClose}
            className='map__marker'
            >  
            <div className="map__marker">
              <Link to={`/listings/${selectedMarker.id}`}>
                <img
                  className="map__marker__img"
                  src={selectedMarker.icon.url}
                  alt="Marker Icon"
                  style={{ width: "40px", height: "40px" }}
                />
                <p className="map__marker__p">${selectedMarker.content}</p>
                {distance && <p className="map__marker__distance">Distance: <br/>{distance} Miles</p>}
              </Link>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    )
  );
};

export default Map;
