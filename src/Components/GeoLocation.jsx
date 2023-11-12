import React, { useState, useEffect } from 'react';
import Map from './Map';

const GeoLocation = () => {
    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
      const askForLocation = () => {
        if (navigator.permissions) {
          navigator.permissions.query({ name: 'geolocation' })
            .then(permissionStatus => {
              if (permissionStatus.state === 'granted') {
                getCurrentLocation();
              } else if (permissionStatus.state === 'prompt') {
                permissionStatus.onchange = () => {
                  if (permissionStatus.state === 'granted') {
                    getCurrentLocation();
                  }
                };
              } else {
                console.error('Geolocation permission denied by user.');
              }
            })
            .catch(error => {
              console.error('Error checking geolocation permission:', error.message);
            });
        } else if (navigator.geolocation) {
          getCurrentLocation();
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      };
  
      const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(newLocation);
            console.log(newLocation);
          },
          (error) => {
            console.error('Error getting user location:', error.message);
          }
        );
      };
  
      askForLocation();
    }, []); 
  

  return (
    <div className='home__map'>
      <Map location={userLocation} />
    </div>
  );
};

export default GeoLocation;
