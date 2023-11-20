import React, { useState, useEffect } from 'react';

const GoogleAPILoader = () => {
  const [googleMaps, setGoogleMaps] = useState(null);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      const apiKey = 'YOUR_API_KEY'; // Replace with your Google Maps API key
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDcOcKb3_UIyI4muLU4wWlBE2vMzU2LHJQ&libraries=places`;
      script.async = true;
      script.addEventListener('load', () => {
        console.log('Google Maps API loaded');
        setGoogleMaps(window.google);
        window.dispatchEvent(new Event('google-map-loaded'));
      });
      script.addEventListener('error', () => {
        console.error('Error loading Google Maps API');
      });
      document.body.appendChild(script);
    };

    if (!googleMaps) {
      loadGoogleMaps();
    }
  }, [googleMaps]);

  return googleMaps;
};

export default GoogleAPILoader;
