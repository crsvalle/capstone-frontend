import axios from "axios";
import { useEffect, useState } from "react"

import '../style/Listing.css'

import { Link } from "react-router-dom";
import {
  Button,
  Carousel
} from "@material-tailwind/react";

const API = process.env.REACT_APP_API_URL;


export default function Listing({ listing, onMouseEnter, onMouseLeave }) {
  const [avail, setAvail] = useState([])

  useEffect(() => {
    axios
    .get(`${API}/listings/${listing.listing_id}/availability`)
    .then((response) =>{
        setAvail((response.data));
    }).catch((e) => console.error("catch", e))
}, []);


return (
  <div className="listing"
  onMouseEnter={onMouseEnter}
  onMouseLeave={onMouseLeave}>
<div className="flex flex-col justify-center my-3">
  <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
    <div className="w-full md:w-1/2 bg-white grid place-items-center">
      <div className="h-60 overflow-hidden rounded-xl">
        <Carousel>
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="w-full h-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className="w-full h-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className="w-full h-full object-cover"
          />
        </Carousel>
      </div>
    </div>
    <div className="w-full md:w-1/2 bg-white flex flex-col space-y-2 p-3">
				<div className="flex justify-between item-center">
					<p className="text-gray-500 font-medium hidden md:block">{listing.type} | {listing.city}</p>
					<div className="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20"
							fill="currentColor">
							<path
								d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<p className="text-gray-600 font-bold text-sm ml-1">
							{(listing.avg_rating).toFixed(1)} / 5
							<span className="text-gray-500 font-normal"></span>
						</p>
					</div>
					{/* <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
						Superhost</div> */}
				</div>
				<h3 className="font-black text-gray-800 md:text-2xl text-xl">{listing.size}</h3>
				<p className="md:text-m text-gray-500 text-base overflow-hidden max-h-16 leading-snug text-truncate">{listing.description}</p>
        <div>
          {listing.isrented ? <p className="text-green-500 text-xs">This space is available now!</p> 
          : 
          <p className="text-red-500 text-xs">This space is unavailable until</p>}
        </div>
        <div>
          <p className="text-xs">
            {avail.appointment_needed ? "• Appointment Needed to Access " : "• Anytime Access (9am - 9pm) "}
            {avail.after_hours ? "• ✔️After Hours " : '• ❌ After Hours '}
            {avail.private ? "• Private space " : ""}
          </p>
        </div>
				<p className="text-xl font-black text-gray-800">
					${listing.price}
					<span className="font-normal text-gray-600 text-base">/month</span>
				</p>
        <Link to={`/listings/${listing.listing_id}`}>
          <Button size="m" fullWidth={true}>
            See more
          </Button>
        </Link>
			</div>
		</div>
	</div>
  </div>
  )

}
