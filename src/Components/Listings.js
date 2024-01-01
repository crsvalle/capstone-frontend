import { useEffect, useState } from "react";
import Listing from "./Listing";
import axios from "axios";
import GeoLocation from "../Components/GeoLocation";

import "../style/listings.css";

import { useParams } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Listings({ googleMapsLoader }) {
  const [listings, setListings] = useState([]);
  const [hoveredListingId, setHoveredListingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { index } = useParams();

  useEffect(() => {
    axios
    .get(`${API}/listings/search?query=${index}`)  //querry search backend, the index is passed as zip from searchbar
      .then((response) => {
        setListings(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error("catch", e);
        setLoading(false);
      });
  }, [index]);

  return (
        <>
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
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
          )}
          {/* <GeoLocation listing={listings} hoveredListingId={hoveredListingId} googleMapsLoader={googleMapsLoader} /> */}
        </>
  );
}
