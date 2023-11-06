import { useEffect, useState } from "react"
import Listing from "./Listing";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function Listings() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios
        .get(`${API}/listings`)
        .then((response) =>{
            setListings((response.data));
        }).catch((e) => console.error("catch", e))
    }, []);

    console.log(listings)
  return (
    //this belongs in the component listing.
    <div className="listing-card">
        {listings.map((listing)=>{
            return <Listing key={listing.id} listing={listing} />
        })}
    </div>

  )
}
