
import { useState, useEffect } from 'react';
import BookedListing from './BookedListing';
import { useUserBookingsWithDetails } from '../api/fetch';


export default function Bookings({userId}) {
  const { userBookings: fetchedUserBookings } = useUserBookingsWithDetails(userId);
  const [bookingsWithBlackoutInfo, setBookingsWithBlackoutInfo] = useState([]);

  useEffect(() => {
    if (fetchedUserBookings && fetchedUserBookings.length > 0) {
      setBookingsWithBlackoutInfo(fetchedUserBookings);
    }
  }, [fetchedUserBookings]);

  const organizeBookings = (bookings) => {
    const currentDate = new Date();
    
    const currentBookings = [];
    const pastBookings = [];
    const upcomingBookings = [];
  
    bookings.forEach((booking) => {
      const startDate = new Date(booking.start_date);
      const endDate = new Date(booking.end_date);
  
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
      <div className="flex flex-wrap mx-11">
        <div className="w-full md:w-1/3 p-2">
          <h2 className="text-lg font-semibold mb-2">Current Bookings</h2>
          {currentBookings.length > 0 ? (
            currentBookings.map((booked) => (
              <BookedListing key={booked.booking_id} bookingInfo={booked} allowEdit={false} />
            ))
          ) : (
            <p>No current bookings</p>
          )}
        </div>
        <div className="w-full md:w-1/3 p-2">
          <h2 className="text-lg font-semibold mb-2">Upcoming Bookings</h2>
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booked) => (
              <BookedListing key={booked.booking_id} bookingInfo={booked} allowEdit={true} />
            ))
          ) : (
            <p>No upcoming bookings</p>
          )}
        </div>
        <div className="w-full md:w-1/3 p-2">
          <h2 className="text-lg font-semibold mb-2">Past Bookings</h2>
          {pastBookings.length > 0 ? (
            pastBookings.map((booked) => (
              <BookedListing key={booked.booking_id} bookingInfo={booked} allowEdit={false} />
            ))
          ) : (
            <p>No past bookings</p>
          )}
        </div>
      </div>
    </div>
  );
  
}