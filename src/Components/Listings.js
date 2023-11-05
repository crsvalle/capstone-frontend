import { useState } from "react"
// import Listing from "./Listing";

export default function Listings() {
    // const [listings, setListings] = useState([]);

  return (
    //this belongs in the component listing.
<div>
  <a
    href="#"
    className="flex flex-col bg-gray-800 border border-gray-200 rounded-lg shadow max-w-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700"
  >
    <div className="w-full aspect-w-3 aspect-h-4 md:w-48">
      <img
        className="object-cover w-full h-full rounded-t-lg md:rounded-none md:rounded-l-lg"
        src="https://dingdong887180022.files.wordpress.com/2021/06/empty-room.jpg"
        alt=""
      />
    </div>
    <div className="flex flex-col justify-between p-4 leading-normal">
      <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">20x20</h5>
      <h6 className="mb-3 text-sm font-bold tracking-tight text-gray-900 dark:text-white">by: Author</h6>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Storage </p>
      <p className="mb-2 font-normal text-gray-50 ">Price: $20 per night</p>
    </div>
  </a>
</div>

  )
}

        // <div className="listing-card">
        //     {listings.map((listing)=>{
        //         return <Listing key={listing.id} listing={listing} />
        //     })}
        // </div>