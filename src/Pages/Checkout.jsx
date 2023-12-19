import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { Textarea } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { useStripe } from "@stripe/react-stripe-js";

//STYLE
import "../style/checkout.css";

//COMPONENTS
import ListingCheckoutCard from "../Components/ListingCheckoutCard";
import HelperIcon from "../Components/HelperIcon";

//IMPORT USERINFO
import { useUserInfo } from "../api/fetch";

// import { useBookingContext } from "../Components/bookingDataReducer/BookingContext";

const API = process.env.REACT_APP_API_URL;

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKING_INFO":
      return { ...state, bookingInfo: action.payload };
    case "SET_LISTING_AND_HOST":
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
  const navigate = useNavigate();
  // const { setBookingData } = useBookingContext();

  //stripe
  const stripe = useStripe();
  const [error, setError] = useState(null);

  const [state, dispatch] = useReducer(reducer, {
    bookingInfo: null,
    id: null,
    listing: [],
    host: [],
  });

  const userInfo = useUserInfo();

  const { bookingInfo, id, listing, host } = state;
  const [textareaValue, setTextareaValue] = useState("");
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  useEffect(() => {
    const bookingData = localStorage.getItem("bookingData");
    if (bookingData) {
      const { index, time, startDate, endDate } = JSON.parse(bookingData);
      const initialTime = time === 0 ? 1 : time;
      dispatch({
        type: "SET_BOOKING_INFO",
        payload: { index, time: initialTime, startDate, endDate },
      });
    }
  }, []);

  useEffect(() => {
    if (bookingInfo && bookingInfo.index) {
      axios
        .get(`${API}/listings/${bookingInfo.index}`)
        .then((response) => {
          const { data } = response;
          dispatch({
            type: "SET_LISTING_AND_HOST",
            payload: { listing: data, host: data.host },
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [bookingInfo]);

  const handleCheckout = async () => {
    try {
      if (bookingInfo && id) {
        const blackout = {
          listing_id: id,
          start_date: bookingInfo.startDate,
          end_date: bookingInfo.endDate,
        };

        axios
          .post(`${API}/blackout`, blackout)
          .then((blackoutResponse) => {
            console.log("Blackout date created:", blackoutResponse.data);
            const blackoutId = blackoutResponse.data.id;

            const booking = {
              user_id: userInfo.id,
              listing_id: id,
              blackoutdate_id: blackoutId,
              total: totalPrice,
              status: "pending",
              request: textareaValue,
            };
            return axios.post(`${API}/bookings`, booking);
          })
          .then((response) => {
            // navigate("/confirmation", { state: { bookingData: response.data } });
            //navigate("/confirmation");
            // if (response.data) {
            //   setBookingData({
            //     type: "SET_BOOKING_DATA",
            //     payload: response.data,
            //   });
            // }
            //setting locally stored bookingData to updated data
            localStorage.setItem("bookingData", JSON.stringify(response.data));
          })
          .catch((error) => {
            console.error("Error creating blackout date or booking:", error);
          });
      }

      // Call server to create a Checkout Session
      const res = await axios.post(`${API}/payments/create-checkout-session`, {
        items: [
          // Define your line items here
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Your Product Name",
              },
              unit_amount: totalPrice * 100, // Amount in cents
            },
            quantity: 1,
          },
        ],
        success_url: "http://localhost:3000/confirmation",
        cancel_url: "http://localhost:3000/checkout",
      });
      const { sessionId } = res.data;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        setError("Error initiating payment");
        console.error("Error redirecting to Checkout:", error);
      }
      navigate("/confirmation");
    } catch (error) {
      setError("Error initiating payment");
      console.error("Error creating Checkout Session:", error);
    }
  };

  const totalPrice =
    bookingInfo && bookingInfo.time
      ? ((listing.price / 30) * bookingInfo.time).toFixed(2)
      : 0;

  return (
    <div className="checkout__container">
      <div className="checkoutBox">
        <h1>Checkout</h1>
        <div className="checkoutListing">
          <ListingCheckoutCard
            listing={listing}
            host={host}
            id={id}
            bookingInfo={bookingInfo}
          />
        </div>

        <div className="bottomBox">
          <div className="checkoutLeft">
            <label htmlFor="requestTextarea" className="text-sm font-medium">
              Request/Concerns
            </label>
            <Textarea
              id="requestTextarea"
              size="lg"
              label=""
              rows="6"
              value={textareaValue}
              onChange={handleTextareaChange}
            />
          </div>
          <div className="checkoutPrice bg-gray-100 rounded-lg shadow-md border border-gray-300">
            <p className="text-sm ">Zip Code: {listing.zip}</p>
            <p className="text-sm">
              Daily price: ${(listing.price / 30).toFixed(2)}
            </p>
            {listing && listing.price !== undefined && (
              <p className="text-sm">
                Monthly price: ${listing.price.toFixed(2)}
              </p>
            )}
            <div className="mt-3">
              <p className="customSmallerText mb-1">
                {bookingInfo && bookingInfo.time !== undefined
                  ? bookingInfo.time === 1
                    ? "Your storage booking spans 1 day."
                    : `Your storage booking spans ${bookingInfo.time} days.`
                  : "N/A"}
              </p>
              <div className="text-lg font-bold">
                Total:
                {bookingInfo && bookingInfo.time ? ` $${totalPrice}` : "N/A"}
              </div>
              <div className="flex">
                <p className="mr-1">
                  Due Now: ${(totalPrice * 0.075).toFixed(2)}{" "}
                </p>
                <HelperIcon
                  title={"Reservation Protection"}
                  body={"Payment is required for confirmed booking."}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
