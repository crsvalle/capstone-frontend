import { useState, useEffect } from 'react';
import { fetchProtectedInfo } from '../api/auth';

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