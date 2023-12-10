import { useState, useEffect } from 'react';
import { fetchProtectedInfo } from '../api/auth';
import axios from 'axios';

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