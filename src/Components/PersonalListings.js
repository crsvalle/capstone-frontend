import { useEffect, useState } from "react";
import { useUserInfo } from '../api/fetch';
import axios from "axios";
import Listing from "./Listing";

const API = process.env.REACT_APP_API_URL;

export default function PersonalListings() {
    const { id } = useUserInfo();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            axios
              .get(`${API}/users/${id}/listings`)
              .then((response) => {
                setListings(response.data);
                console.log(response.data);
                setLoading(false);
              })
              .catch((e) => {
                console.error("catch", e);
                setLoading(false);
              });
          }
    }, [id]);
  return (
    <div>
       {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="listing-card">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <Listing key={listing.listing_id} listing={listing} />
            ))
          ) : (
            <div>No listings available</div>
          )}
        </div>
      )}
    </div>
  )
}
