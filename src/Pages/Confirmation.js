import { useEffect, useState } from "react";
import OrderConfirmation from "../Components/OrderConfirmation";

export default function Confirmation() {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const storedBookingData = localStorage.getItem("bookingData");

    if (storedBookingData) {
      const parsedBookingData = JSON.parse(storedBookingData);
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
