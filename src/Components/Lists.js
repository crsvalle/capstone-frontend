import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "./List";
import axios from "axios";

import "../style/lists.css";

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
        <div className="listing bg-customCreamyButter">
          {listings.slice(0, 5).map((listing) => (
            <List key={listing.listing_id} listing={listing} />
          ))}
          <Link to="/register">
            <div className="listing__home__text">
              Become a host, sign up here.
              <div className="listing__home__more">See more...</div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
