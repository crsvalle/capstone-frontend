import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Calendar from "./Calendar";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function EditBooking({ listingId, blackoutId, bookingId, total, listingPrice }) {
  console.log('listing id :', listingId, 'blackoutId', blackoutId,)
  const [open, setOpen] = useState(false);
  const [datesBooked, setDatesBooked] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
  ]);
  const [date, setDate] = useState({
    id: '',
    listing_id: '',
    start_date: "",
    end_date: ""
  })
  const [booking, setBooking] = useState({
    id: null,
    user_id: null,
    listing_id: null,
    blackoutdate_id: null,
    total: 0.00,
    status: "",
    request: ""
  });
  

  const fetchBlackoutAndBookingData = async () => {
    try {
      const [blackoutResponse, bookingResponse] = await Promise.all([
        axios.get(`${API}/blackout/${blackoutId}`),
        axios.get(`${API}/bookings/${bookingId}`)
      ]);
      setDatesBooked ( {
        start_date: blackoutResponse.data.start_date,
        end_date: blackoutResponse.data.end_date
      })
      setDate(blackoutResponse.data); // Update date state with blackout data
      setBooking(bookingResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchBlackoutAndBookingData();
  }, [blackoutId, bookingId]);

  const updateBookingDate = (updated) => {
    axios.put(`${API}/blackout/${blackoutId}`, updated)
      .then((response) => {
        setDate(response.data);
      })
      .catch((error) => {
        console.error('Error updating booking date:', error);
      });
  };

  const updateBooking = (updated) => {
    axios.put(`${API}/bookings/${bookingId}`, updated)
      .then((response) => {
        console.log('Update Booking Response:', response.data);
        setBooking(response.data);
      })
      .catch((error) => {
        console.error('Error updating booking:', error);
      });
  };

  const handleConfirm = () => {
    let bookingUpdate = { ...booking };

    if (
      date.start_date !== dateRange[0].startDate ||
      date.end_date !== dateRange[0].endDate
    ) {
      updateBookingDate({
        start_date: dateRange[0].startDate,
        end_date: dateRange[0].endDate,
      });
    }

    bookingUpdate = {
      ...bookingUpdate,
      total: totalPrice,
      status: 'pending',
    };
    updateBooking(bookingUpdate);
    setBooking(bookingUpdate);

    setOpen(false);
  };

  const daysDifference = Math.floor((dateRange[0].endDate - dateRange[0].startDate) / (1000 * 60 * 60 * 24));
  const totalPrice = (listingPrice / 30 * daysDifference).toFixed(2);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" className="p-2 text-sm">
        ✎
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Change Dates of Booking</DialogHeader>
        <DialogBody>
          <p>Current Price: {total}</p>
          <div >
            <Calendar dateRange={dateRange} setDateRange={setDateRange} listingId={listingId} datesBooked={datesBooked} />
          </div>
          <p>New Price: {totalPrice}</p>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
