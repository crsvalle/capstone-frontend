import { useState, useEffect } from 'react';
import axios from 'axios';
const API = process.env.REACT_APP_API_URL;


const useBlackoutDates = (listingId) => {
  const [blackoutDates, setBlackoutDates] = useState([]);

  useEffect(() => {
    const fetchBlackoutDates = async () => {
      try {
        const response = await axios.get(`${API}/blackout/listing/${listingId}`);
        setBlackoutDates(response.data.blackoutDates);
      } catch (error) {
        console.error('Error fetching blackout dates:', error);
      }
    };

    fetchBlackoutDates();
  }, [listingId]);

  return { blackoutDates };
};

export default useBlackoutDates;
