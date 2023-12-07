import React, { useEffect, useReducer } from 'react';
import axios from "axios";

//STYLE
import '../style/checkout.css'

//COMPONENTS
import ListingCheckoutCard from '../Components/ListingCheckoutCard';
import HelperIcon from '../Components/HelperIcon';


//IMPORT USERINFO
import { useUserInfo } from '../api/fetch';

const API = process.env.REACT_APP_API_URL;

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKING_INFO':
      return { ...state, bookingInfo: action.payload };
    case 'SET_LISTING_AND_HOST':
      return {
        ...state,
        listing: action.payload.listing,
        id: action.payload.listing.listing_id,
        host: action.payload.host,
      };
    default:
      return state;
  }
};

export default function Checkout() {
  const [state, dispatch] = useReducer(reducer, {
    bookingInfo: null,
    id: null,
    listing: [],
    host: [],
  });

  const userInfo = useUserInfo();

  const { bookingInfo, id, listing, host } = state;

  useEffect(() => {
    const bookingData = localStorage.getItem('bookingData');
    if (bookingData) {
      const { index, time, startDate, endDate } = JSON.parse(bookingData);
      const initialTime = time === 0 ? 1 : time;
      dispatch({ type: 'SET_BOOKING_INFO', payload: { index, time: initialTime, startDate, endDate } });
    }
  }, []);

  useEffect(() => {
    if (bookingInfo && bookingInfo.index) {
      axios.get(`${API}/listings/${bookingInfo.index}`)
        .then((response) => {
          const { data } = response;
          dispatch({ type: 'SET_LISTING_AND_HOST', payload: { listing: data, host: data.host } });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [bookingInfo]);

  const handleCheckout = () => {
    if (bookingInfo && id) {
      const blackout = {
        listing_id: id,
        start_date: bookingInfo.startDate,
        end_date: bookingInfo.endDate,
      };

      axios.post(`${API}/blackout`, blackout)
      .then((blackoutResponse) => {
        console.log("Blackout date created:", blackoutResponse.data);
        const blackoutId = blackoutResponse.data.id;

        const booking = {
          user_id: userInfo.id,
          listing_id: id,
          blackoutdate_id: blackoutId,
          total: totalPrice, 
          status: 'pending',
          request: '',
        };
          return axios.post(`${API}/bookings`, booking);
        })
        .then((response) => {
          console.log("Booking created:", response.data);
          console.log("success");
        })
        .catch((error) => {
          console.error("Error creating blackout date or booking:", error);
        });
    }
  };

  const totalPrice = bookingInfo && bookingInfo.time ? (listing.price / 30 * bookingInfo.time).toFixed(2) : 0;

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
              {bookingInfo && bookingInfo.time ? ` $${totalPrice}` : 'N/A'}
            </div>
            <div className='flex'>
              <p className='mr-1'>Due Now: ${(totalPrice*.08).toFixed(2)} </p>  
              <HelperIcon title={'Reservation Protection'} body={'Payment is required for confirmed booking.'}/>   

            </div>
            </div>
          </div>
        </div>

      </div>
      
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
