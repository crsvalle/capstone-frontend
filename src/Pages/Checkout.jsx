import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../style/checkout.css'

export default function Checkout() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    // Retrieve data from localStorage
    const bookingData = localStorage.getItem('bookingData');

    // Check if data exists
    if (bookingData) {
        const { index, startDate, endDate } = JSON.parse(bookingData);

        // Use the data as needed
        console.log(index, startDate, endDate);

        // Optionally, clear the data from localStorage once used
        // localStorage.removeItem('bookingData');
    }
}, []);

  const handleDateRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  // stripe goes here
  const handleCheckout = () => {
    console.log("success");
  };

  return (
    <div className="checkout__container">
      <h2>Checkout</h2>
      <h3>Select Dates</h3>
      <div className="date-picker">
        <DateRange
          editableDateInputs={true}
          onChange={handleDateRangeChange}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
        />
      </div>
      <div> total:</div>
      
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
