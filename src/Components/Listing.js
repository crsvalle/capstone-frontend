import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import useBlackoutDates from "../api/blackoutdates.js"

import '../style/Listing.css'
import {
  Button,
  Carousel
} from "@material-tailwind/react";


const API = process.env.REACT_APP_API_URL;


export default function Listing({ listing, onMouseEnter, onMouseLeave }) {
  const [avail, setAvail] = useState([])
  const [id] = useState(listing.listing_id);

  const [images, setImages] = useState([]);
  const imgListRef = ref(storage, `listings/${id}`);

  const { blackoutDates } = useBlackoutDates(listing.listing_id);

  useEffect(() => {
    axios
      .get(`${API}/listings/${listing.listing_id}/availability`)
      .then((response) => {
        setAvail((response.data));
      }).catch((e) => console.error("catch", e))
  }, [listing.listing_id]);

  useEffect(() => {
    listAll(imgListRef).then((res) =>
      res.items.forEach((item) =>
        getDownloadURL(item).then((url) =>
          setImages((prevs) => [...prevs, url])
        )
      )
    )
  }, [id]);

  const isSpaceAvailable = () => {
    const today = new Date();

    if (blackoutDates.length > 0) {
      const sortedRanges = blackoutDates
        .map(item => ({
          startDate: new Date(item.start_date),
          endDate: new Date(item.end_date)
        }))
        .sort((a, b) => a.startDate - b.startDate);

      for (let i = 0; i < sortedRanges.length; i++) {
        const { startDate, endDate } = sortedRanges[i];

        if (today >= startDate && today <= endDate) {
          const nextDay = new Date(endDate);
          nextDay.setDate(nextDay.getDate() + 1);

          // Format the next day in the desired format
          const formattedNextDay = nextDay.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          return `This space is unavailable until ${formattedNextDay}`;
        }
      }
    }

    return "This space is available now!";
  };


  return (
    <div className="listing "
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div className="flex content-card-box flex-col my-2 ">
        <div className=" content-card relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3  md:max-w-3xl mx-auto border border-white bg-customCreamyButterLight">
          <div className="w-full md:w-1/2 bg-customCreamyButterLight grid place-items-center">
            <div className="image-box h-60 overflow-hidden rounded-xl">
              <Carousel>
                {images.length ?
                  images.map((image, index) =>
                    <img
                      src={image}
                      key={index}
                      alt="Listing"
                      className="h-full w-full object-cover"
                    />
                  ) : <img
                    src={process.env.PUBLIC_URL + '/imgs/no_image.jpeg'}
                    alt="empty"
                    className="h-full w-full object-cover"
                  />
                }
              </Carousel>
            </div>
          </div>
          <div className="text-box w-full md:w-1/2 bg-customCreamyButterLight flex flex-col space-y-2 p-3">
            <div className="flex items-center justify-between md:justify-start lg:justify-between">
              <p className="city-text text-gray-500 ">{listing.type} | {listing.city}</p>
              <div className="flex items-center">
                <span className="rating-text text-gray-600 font-bold ml-1">
                  {(listing.avg_rating).toFixed(1)} / 5
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>


            <h3 className="size-text font-black text-gray-800 ">{listing.size}</h3>
            <p className="desc-text text-gray-500 text-base overflow-hidden max-h-16 leading-snug text-truncate">{listing.description}</p>
            <div>
              {isSpaceAvailable() === 'This space is available now!' ? (
                <p className="text-green-500 text-xs">{isSpaceAvailable()}</p>
              ) : (
                <p className="text-red-500 text-xs">{isSpaceAvailable()}</p>
              )}
            </div>
            <div>
              <p className="access-text">
                {avail.appointment_needed ? "• Appointment Needed to Access " : "• Anytime Access (9am - 9pm) "}
                {avail.after_hours ? "• ✔️After Hours " : '• ❌ After Hours '}
                {avail.private ? "• Private space " : ""}
              </p>
            </div>
            <p className="price-text  text-gray-800">
              ${listing.price}
              <span className="font-normal text-gray-600 text-base"> /month</span>
            </p>
            <Link to={`/listings/show/${listing.listing_id}`}>
              <Button className='bg-customBlue' size="md" fullWidth={true}>
                See more
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

}
