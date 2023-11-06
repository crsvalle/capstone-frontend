import axios from "axios";
import { useEffect, useState } from "react";
import Reviews from "../Components/Reviews";

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
        <div>  
            <div>Comments : {reviews.length}</div>   
            <div>Read More...</div> 
            {reviews.map(review => 
                <Reviews review={review}/>
            )}
        </div>
    )
}

export default ListingReviews;
