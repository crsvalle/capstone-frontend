import { useEffect, useState } from "react";
import { storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import axios from "axios";
import EditBooking from "./EditBooking";

import {useUserDataById } from '../api/fetch'
import { formatName } from '../utils/formatters';
const API = process.env.REACT_APP_API_URL;

export default function BookedListing({bookingInfo, allowEdit}) {

    const [images, setImages] = useState([]);
    const [id, setId] = useState(null);
    const [listing, setListing] = useState([]);
    const [blackout, setBlackout] = useState([]);
    
    useEffect(() => {
      if (bookingInfo && bookingInfo.listing_id) {
        axios
          .get(`${API}/listings/${bookingInfo.listing_id}`)
          .then((response) => {
            setListing(response.data);
            setId(response.data.listing_id);
          })
          .catch((e) => console.error("Error fetching listing data:", e));
      }
      
      if (bookingInfo && bookingInfo.blackoutdate_id) {
        axios
          .get(`${API}/blackout/${bookingInfo.blackoutdate_id}`)
          .then((response) => {
            setBlackout(response.data);
          })
          .catch((error) => {
            console.error('Error fetching blackout data:', error);
          });
      }
    }, [bookingInfo]);

    const hostId = listing ? listing.host : null;
    const host = useUserDataById(hostId, API)

    const {
      first_name ='',
      last_name = '',
  } = host || {};
    
    const imgListRef = ref(storage, `listings/${id}`);
    
    useEffect(() => {
        listAll(imgListRef).then((res) =>
            res.items.forEach((item) =>
                getDownloadURL(item).then((url) =>
                    setImages((prevs) => [...prevs, url])
                )
            )
        )
      }, [id]);
    

    if (!bookingInfo || !listing) {
        return <p>Loading...</p>; // Or any loading indicator
      }
      return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex items-center relative w-80 md:w-96 lg:w-104 xl:w-104">
            <div className="absolute top-0 right-0 m-2">
                { allowEdit ? <EditBooking listingId={bookingInfo.listing_id} blackoutId={bookingInfo.blackoutdate_id} bookingId={bookingInfo.id} total={bookingInfo.total} listingPrice={listing.price}/> :""}
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
            <h3 className="text-lg font-semibold">{listing.size}</h3>
            <h4 className="text-base font-medium">
              Hosted by: {formatName(first_name)} {formatName(last_name).charAt(0)}.
            </h4>
            <p className="text-xs">Start Date: {blackout.start_date}</p>
            <p className="text-xs">End Date: {blackout.end_date}</p>
            <p>${bookingInfo.total}</p>
          </div>
        </div>
      );
      
    };
