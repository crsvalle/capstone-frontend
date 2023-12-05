import axios from 'axios';
import { useState, useEffect } from 'react';
import BookedListing from './BookedListing';


const API = process.env.REACT_APP_API_URL;

export default function Bookings({userId}) {
    const [userBookings, setUserBookings] = useState([]);

    useEffect(() => {
        if (userId) { 
          axios
            .get(`${API}/users/${userId}/bookings`)
            .then((response) => {
              setUserBookings(response.data);
            })
            .catch((error) => {
              console.error('catch', error);
            });
        }
      }, [userId]);

 
  return (
    <div>
        {userBookings.map((booked) => (
            <BookedListing
              key={booked.id}
              bookingInfo={booked}
            />
          ))}
    </div>
  )
}
