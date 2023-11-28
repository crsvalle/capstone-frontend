import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../style/checkout.css'
import ListingCheckoutCard from '../Components/ListingCheckoutCard';

const API = process.env.REACT_APP_API_URL;


export default function Checkout() {
  const [bookingInfo, setBookingInfo] = useState(null);
  const [id, setId] = useState(null);
  const [listing, setListing] = useState([]);
  const [host, setHost] = useState([]);

  
  
  useEffect(() => {
    // Retrieve data from localStorage
    const bookingData = localStorage.getItem('bookingData');
    
    // Check if data exists
    if (bookingData) {
      const { index, time, startDate, endDate } = JSON.parse(bookingData);
      const initialTime = time === 0 ? 1 : time;
      setBookingInfo({ index,  time: initialTime, startDate, endDate });

      // Use the data as needed
      console.log(index, time, startDate, endDate);
      
      // Optionally, clear the data from localStorage once used
      // localStorage.removeItem('bookingData');
    }
  }, []);
  
  useEffect(() => {
    // Fetch data only if bookingInfo exists and has an index
    if (bookingInfo && bookingInfo.index) {
        axios.get(`${API}/listings/${bookingInfo.index}`)
          .then((response) => {
            setListing(response.data);
            setId(response.data.listing_id);

            // Fetch host data once listing data is retrieved
            return axios.get(`${API}/users/${response.data.host}`);
          })
          .then((hostResponse) => {
            setHost(hostResponse.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
    }
  }, [bookingInfo]);
  
  // stripe goes here
  const handleCheckout = () => {
    console.log("success");
  };

  return (
    <div className="checkout__container">
      <div className='checkoutBox'>
      <h1>Checkout</h1>
        <div className='checkoutListing'>
          <ListingCheckoutCard listing={listing} host={host} id={id} bookingInfo={bookingInfo}/>
        </div>

        <div className='bottomBox'>
          <div className='checkoutLeft'>
          </div>
          <div className='checkoutPrice bg-gray-100 rounded-lg shadow-md border border-gray-300'>
            <p className="text-md">Zip Code: {listing.zip}</p>
            <p className="text-md">Daily price: ${(listing.price / 30).toFixed(2)}</p>
            {listing && listing.price !== undefined && (
              <p className="text-md">Monthly price: ${listing.price.toFixed(2)}</p>
            )}
            <div className='mt-3'>
            <p className='customSmallerText mb-1'>
                {bookingInfo && bookingInfo.time !== undefined ?
                  bookingInfo.time === 1 ?
                    'Your storage booking spans 1 day.' :
                    `Your storage booking spans ${bookingInfo.time} days.` :
                  'N/A'
                }
              </p>
              <div className="text-lg font-bold">Total: 
                {bookingInfo && bookingInfo.time ? ` $${(listing.price / 30 * bookingInfo.time).toFixed(2)}` : 'N/A'}
              </div>        
            </div>
          </div>
        </div>

      </div>
      
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
