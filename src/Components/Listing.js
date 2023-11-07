import axios from "axios";
import { useEffect, useState } from "react"

const API = process.env.REACT_APP_API_URL;


export default function Listing({listing}) {
  const [host, setHost] = useState([])

  useEffect(() => {
    axios
    .get(`${API}/users/${listing.host}`)
    .then((response) =>{
        setHost((response.data));
    }).catch((e) => console.error("catch", e))
}, [listing.host]);

  return (
    <div>
  <a
    href={`/listings/${listing.listing_id}`}
    className="flex flex-col my-1 bg-gray-800 border border-gray-200 rounded-lg shadow max-w-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700"
  >
    <div className="w-full aspect-w-3 aspect-h-4 md:w-48">
      <img
        className="object-cover w-full h-full rounded-t-lg md:rounded-none md:rounded-l-lg"
        src="https://dingdong887180022.files.wordpress.com/2021/06/empty-room.jpg"
        alt=""
      />
    </div>
    <div className="flex flex-col justify-between p-4 leading-normal">
      <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{listing.size}</h5>
      <h6 className="mb-3 text-sm font-bold tracking-tight text-gray-900 dark:text-white">by: {host.firstname} {host.lastname}</h6>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Type: {listing.type} </p>
      <p className="mb-2 font-normal text-gray-50 ">Price: ${listing.price} per month</p>
    </div>
  </a>
</div>
  )
}
