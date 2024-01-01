// //import { useLocation } from 'react-router-dom';
// import OrderConfirmation from "../Components/OrderConfirmation";
// import { useBookingContext } from "../Components/bookingDataReducer/BookingContext";

// export default function Confirmation() {
//   //const location = useLocation();
//   // const { bookingData } = location.state || {};

//   const bookingContext = useBookingContext();
//   console.log(bookingContext); // Log the entire context value
//   const {
//     state: { bookingData },
//   } = bookingContext;
//   console.log(bookingData);

//   return (
//     <div>
//       {bookingData && bookingData.payload ? (
//         <OrderConfirmation bookingData={bookingData.payload} />
//       ) : (
//         "Nothing here"
//       )}
//     </div>
//   );
// }

// Confirmation.js

import { useEffect, useState } from "react";
import OrderConfirmation from "../Components/OrderConfirmation";

export default function Confirmation() {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Retrieve booking data from local storage
    const storedBookingData = localStorage.getItem("bookingData");

    if (storedBookingData) {
      // Parse the stored JSON data
      const parsedBookingData = JSON.parse(storedBookingData);

      // Set the booking data in the component state
      setBookingData(parsedBookingData);
    }
  }, []);

  return (
    <div>
      {bookingData ? (
        <OrderConfirmation bookingData={bookingData} />
      ) : (
        "Nothing here"
      )}
    </div>
  );
}
