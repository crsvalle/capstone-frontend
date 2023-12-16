import { useEffect, useState } from "react";
import List from "./List";
import axios from "axios";

import "../style/listings.css";

const API = process.env.REACT_APP_API_URL;

export default function Lists() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
    .get(`${API}/listings`)  
      .then((response) => {
        setListings(response.data);
        //console.log(response.data);
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
        <div className="listing">
          {listings.slice(0,10).map((listing) => (
            <List
              key={listing.listing_id}
              listing={listing}
            />
          ))}
        </div>
      )}
    </>
  );
}
