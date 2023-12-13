import { useState, useEffect } from 'react';
import { fetchProtectedInfo } from '../api/auth';
import axios from 'axios';
const API = process.env.REACT_APP_API_URL;


export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProtectedInfo();
        const { data } = response;
        setUserInfo(data.user || {});
      } catch (error) {
        console.error('Error fetching protected info:', error);
      }
    };

    fetchData();
  }, []);

  return userInfo;
};

//gets info from blackout data from specific listing from booking table(bookingInfo)
export const useBlackoutInfo = (id, API) => {
  const [blackout, setBlackout] = useState(null);

  useEffect(() => {
    const fetchBlackoutInfo = async () => {
      try {
        if (id) {
          const response = await axios.get(`${API}/blackout/${id}`);
          setBlackout(response.data);
        }
      } catch (error) {
        console.error('Error fetching blackout data:', error);
      }
    };

    fetchBlackoutInfo();
  }, [id, API]);

  return blackout;
};

export const useListingInfo = (listingId, API) => {
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListingInfo = async () => {
      try {
        if (listingId) {
          const response = await axios.get(`${API}/listings/${listingId}`);
          setListing(response.data);
        }
      } catch (error) {
        console.error('Error fetching listing data:', error);
      }
    };

    fetchListingInfo();
  }, [listingId, API]);

  return listing;
};

export const useUserDataById  = (id, API) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchHostInfo = async () => {
      try {
        if (id) {
          const response = await axios.get(`${API}/users/${id}`);
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching host data:', error);
      }
    };

    fetchHostInfo();
  }, [id, API]);

  return user;
};


export const useUserBookingsWithDetails = (userId) => {
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get(`${API}/bookings/user/${userId}`);
        setUserBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to fetch user bookings');
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserBookings();
    }
  }, [userId]);

  return { userBookings, loading, error };
};


export const useAvailability = (listingId) => {
  const [availability, setAvailability] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        if (listingId) {
          const response = await axios.get(`${API}/listings/${listingId}/availability`);
          setAvailability(response.data);
        }
      } catch (error) {
        console.error('Error fetching availability data:', error);
      }
    };

    fetchAvailability();
  }, [listingId]);

  return availability;
};