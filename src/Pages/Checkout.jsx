import React, { useState } from 'react';
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
