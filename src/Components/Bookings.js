import axios from 'axios';
import { useState, useEffect } from 'react';
import BookedListing from './BookedListing';


const API = process.env.REACT_APP_API_URL;

export default function Bookings({userId}) {
  const [userBookings, setUserBookings] = useState([]);
  const [bookingsWithBlackoutInfo, setBookingsWithBlackoutInfo] = useState([]);

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

  console.log(userBookings)
  useEffect(() => {
    const fetchBlackoutInfo = async () => {
      const bookingsWithBlackout = await Promise.all(
        userBookings.map(async (booking) => {
          const blackoutInfo = await axios.get(
            `${API}/blackout/${booking.blackoutdate_id
            }`
          );
          return { ...booking, blackout: blackoutInfo.data };
        })
      );
      setBookingsWithBlackoutInfo(bookingsWithBlackout);
    };

    if (userBookings.length > 0) {
      fetchBlackoutInfo();
    }
  }, [userBookings]);
  const organizeBookings = (bookings) => {
    const currentDate = new Date();

    const currentBookings = [];
    const pastBookings = [];
    const upcomingBookings = [];

    bookings.forEach((booking) => {
      const { start_date, end_date } = booking.blackout;

      const startDate = new Date(start_date);
      const endDate = new Date(end_date);

      if (endDate < currentDate) {
        pastBookings.push(booking);
      } else if (startDate <= currentDate && endDate >= currentDate) {
        currentBookings.push(booking);
      } else if (startDate > currentDate) {
        upcomingBookings.push(booking);
      }
    });

    return { currentBookings, pastBookings, upcomingBookings };
  };

  const {
    currentBookings,
    pastBookings,
    upcomingBookings,
  } = organizeBookings(bookingsWithBlackoutInfo);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/3 p-2">
          <h2 className="text-lg font-semibold mb-2">Current Bookings</h2>
          {currentBookings.map((booked) => (
            <BookedListing key={booked.id} bookingInfo={booked} allowEdit={false}/>
          ))}
        </div>
        <div className="w-full md:w-1/3 p-2">
          <h2 className="text-lg font-semibold mb-2">Upcoming Bookings</h2>
          {upcomingBookings.map((booked) => (
            <BookedListing key={booked.id} bookingInfo={booked} allowEdit={true}/>
          ))}
        </div>
        <div className="w-full md:w-1/3 p-2">
          <h2 className="text-lg font-semibold mb-2">Past Bookings</h2>
          {pastBookings.map((booked) => (
            <BookedListing key={booked.id} bookingInfo={booked} allowEdit={false}/>
          ))}
        </div>
      </div>
    </div>
  );
}