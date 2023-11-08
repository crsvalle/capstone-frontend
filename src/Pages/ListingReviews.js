import axios from "axios";
import { useEffect, useState } from "react";
import Reviews from "../Components/Reviews";
import '../style/review.css'

//const API = process.env.REACT_APP_API_URL;

function ListingReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:3003/listingReviews")
        .then((res) =>setReviews(res.data))
        .catch((e) => console.warn("catch", e ))
    }, [])

    return (
        <div className="home__review">  
            <div>Reviews</div>   
            <div>Total Reviews : {reviews.length}</div>   
            {reviews.slice(0,4).map(review => 
                <Reviews key={review.user_id} review={review}/>
                )}
            <div>Read More...</div>
        </div>
    )
}

export default ListingReviews;
