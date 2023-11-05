import axios from "axios";
import { useEffect, useState } from "react";



function ListingReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios
        .get(`${API}/listingReviews`)
        .then((res) => setReviews(res.data))
        .catch((e) => console.warn("catch", e ))
    }, [])

    return (
        <div>      
       {reviews.map(review => )}
        </div>
    )
}

export default ListingReviews;
