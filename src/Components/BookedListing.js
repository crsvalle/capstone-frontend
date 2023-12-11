import { useEffect, useState } from "react";
import { storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import EditBooking from "./EditBooking";

import { formatName, useDateFormat } from '../utils/formatters';
const API = process.env.REACT_APP_API_URL;

export default function BookedListing({bookingInfo, allowEdit}) {

    const [images, setImages] = useState([]);
  
    const imgListRef = ref(storage, `listings/${bookingInfo.listing_id}`);
    
    useEffect(() => {
        listAll(imgListRef).then((res) =>
            res.items.forEach((item) =>
                getDownloadURL(item).then((url) =>
                    setImages((prevs) => [...prevs, url])
                )
            )
        )
      }, [bookingInfo.listing_id]);
    

    if (!bookingInfo) {
        return <p>Loading...</p>; // Or any loading indicator
      }
      return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex items-center relative w-80 md:w-96 lg:w-104 xl:w-104">
            <div className="absolute top-0 right-0 m-2">
                { allowEdit ? <EditBooking listingId={bookingInfo.listing_id} blackoutId={bookingInfo.blackoutdate_id} bookingId={bookingInfo.id} total={bookingInfo.total} listingPrice={bookingInfo.price}/> :""}
            </div>
      
          {/* Image Section */}
        <div className="flex-none w-1/3">
            <img
                src={images[0]}
                alt="Placeholder"
                className="object-cover w-full h-full"
            />
        </div>
      
          {/* Text Section */}
          <div className="p-4 w-2/3">
            <h3 className="text-lg font-semibold">{bookingInfo.size}</h3>
            <h4 className="text-base font-medium">
              Hosted by: {formatName(bookingInfo.host_first_name)} {formatName(bookingInfo.host_last_name).charAt(0)}.
            </h4>
            <p className="text-xs">Start Date: {bookingInfo.start_date}</p>
            <p className="text-xs">End Date: {bookingInfo.end_date}</p>
            <p>Total: ${bookingInfo.total}</p>
          </div>
        </div>
      );
      
    };
