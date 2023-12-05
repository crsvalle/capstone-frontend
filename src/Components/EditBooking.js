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

export default function EditBooking({listingId, blackoutId}) {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    ]);
  const [date, setDate] = useState({
    id:'',
    listing_id:'',
    start_date: "",
    end_date: ""
  })  

  useEffect(() =>{
    axios
     .get(`${API}/blackout/${blackoutId}`)
     .then((response) => {
        setDate(response.data)
     })
     .catch((e) =>{
        console.log(e)
     })
  })

  const updateBooking = (updated) =>{
    axios
    .put(`${API}/blackout/${blackoutId}`, updated)
    .then((response) =>{
        setDate(response.data)
    })
  }

  const handleConfirm = () => {
    if (date.start_date !== dateRange[0].startDate || date.end_date !== dateRange[0].endDate) {
      updateBooking({
        start_date: dateRange[0].startDate,
        end_date: dateRange[0].endDate,
      });
    }
    setOpen(false);
  };

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
            <div >
                <Calendar dateRange={dateRange} setDateRange={setDateRange} listingId={listingId}/>
            </div>
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
