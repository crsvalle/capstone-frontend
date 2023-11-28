import { useEffect, useState } from "react";
import Listing from "./Listing";
import axios from "axios";
import GeoLocation from "../Components/GeoLocation";

import "../style/listings.css";

const API = process.env.REACT_APP_API_URL;

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [hoveredListingId, setHoveredListingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/listings`)
      .then((response) => {
        setListings(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error("catch", e);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="listing-card">
          {listings.map((listing) => (
            <Listing
              key={listing.listing_id}
              listing={listing}
              onMouseEnter={() => setHoveredListingId(listing.listing_id)}
              onMouseLeave={() => setHoveredListingId(null)}
            />
          ))}
        </div>
      )}
      <GeoLocation hoveredListingId={hoveredListingId} />
    </>
  );
}
