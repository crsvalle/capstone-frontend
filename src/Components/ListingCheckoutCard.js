import { useEffect, useState } from "react";
import { storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import { formatDate } from "../utils/formatters";

export default function ListingCheckoutCard({listing, id, host, bookingInfo}) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        listAll(imgListRef).then((res) =>
            res.items.forEach((item) =>
                getDownloadURL(item).then((url) =>
                    setImages((prevs) => [...prevs, url])
                )
            )
        )
    }, [id]);

    const imgListRef = ref(storage, `listings/${id}`);

    if (!bookingInfo || !listing) {
        return <p>Loading...</p>; // Or any loading indicator
      }
    
      const { startDate, endDate } = bookingInfo;


    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex items-center  ">
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
          <h3 className="text-lg font-semibold">{listing.size} - {listing.type}</h3>
          <h4 className="text-base font-medium">
            Hosted by: {host.first_name} {host.last_name && host.last_name.charAt(0)}
          </h4>
          <p className="text-gray-500 text-sm">Start Date: {formatDate(startDate)}</p>
          <p className="text-gray-500 text-sm">End Date: {formatDate(endDate)}</p>
        </div>
      </div>
      );
    };
