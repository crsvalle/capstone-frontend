import { useEffect, useState } from "react";
import Listing from "./Listing";
import axios from "axios";

import "../style/listings.css";

import { useParams } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Listings({ setHoveredListingId }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const { index } = useParams();  

  useEffect(() => {
    axios
      .get(`${API}/listings/search?query=${index}`)
      .then((response) => {
        setListings(response.data);
        setLoading(false);
        setError(null); 
      })
      .catch((error) => { 
        console.log(error)
        setLoading(false);
        setError(error.message); 
      });
  }, [index]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="Loading">
          <div className="loading-circle"></div>
          <div>Loading...</div>
        </div>
      );
    } else if (error) {
      return <div className="listing-card error bg-customCreamyButterLight">Error: {error} </div>;
    } else if (listings.length === 0) {
      return <div className="listing-card">No results found.</div>;
    } else {
      return (
        <div className="listing-card">
          {listings.map((listing, index) => (
            <Listing
              key={index}
              listing={listing}
              onMouseEnter={() => setHoveredListingId(listing.listing_id)}
              onMouseLeave={() => setHoveredListingId(null)}
            />
          ))}
        </div>
      );
    }
  };

  return <div className="App">{renderContent()}</div>;
}