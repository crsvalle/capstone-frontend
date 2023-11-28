import { useEffect, useState } from "react";
import { storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;



//TEMPLATE NOTHING WILL WORK, BORROWED IT FROM LISTINGCHECKOUTCARD
// THE IDEA IS THE PROP IS GOING TO BE AN OBJECT {BLACKOUT_ID, LISTING_ID}
export default function BookedListing({bookingInfo}) {
    const [images, setImages] = useState([]);
    const [id, setId] = useState(null);
    const [listing, setListing] = useState([]);
    const [host, setHost] = useState([]);

    
    useEffect(() => {
        if (bookingInfo && bookingInfo.index) {
            axios
            //BOOKINGINFO.INDEX SHOULD BE LISTING_ID 
              .get(`${API}/listings/${bookingInfo.index}`)
              .then((response) => {
                setListing(response.data);
                setId(response.data.listing_id);
              })
              .catch((e) => console.error("catch", e));
          }        
          
          axios
          .get(`${API}/users/${listing.host}`)
          .then((response) => {
              setHost(response.data);
          })
          .catch((e) => console.error("catch", e));
  
      }, [bookingInfo, listing.host, listing.listing_id]);

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
    
      //STARTDATE, ENDDATE WILL COME FROM blackout_id
      const { startDate, endDate } = bookingInfo;


    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex items-center w-80 md:w-96 lg:w-104 xl:w-104">
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
                Hosted by: {host.firstname} {host.lastname && host.lastname.charAt(0)}
                </h4>
                <p className="text-xs">Start Date: {startDate}</p>
                <p className="text-xs">End Date: {endDate}</p>
            </div>
        </div>

      );
    };
