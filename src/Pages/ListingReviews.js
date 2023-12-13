import axios from "axios";
import { useEffect, useState } from "react";
import Reviews from "../Components/Reviews";
import "../style/review.css";
import Ratings from "../Components/Ratings";
import garage from "../Pages/Pic/garage.jpeg";

const API = process.env.REACT_APP_API_URL;

function ListingReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/listingReviews`)
      .then((res) => setReviews(res.data))
      .catch((e) => console.warn("catch", e));
  }, []);

  // const countRatings = () => {
  //     let ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  //     for (let review of reviews) {
  //         switch (Math.round(review.rating)) {  //used math.round to round ratings
  //             case 5:
  //                 ratingCounts[5]++;
  //                 break;
  //             case 4:
  //                 ratingCounts[4]++;
  //                 break;
  //             case 3:
  //                 ratingCounts[3]++;
  //                 break;
  //             case 2:
  //                 ratingCounts[2]++;
  //                 break;
  //             case 1:
  //                 ratingCounts[1]++;
  //                 break;
  //             default:
  //                 console.warn("Invalid rating:", review.rating);
  //         }
  //     }

  //     return ratingCounts;
  // }

  // const ratingsCount = countRatings();

  return (
    <>
      <div className="home__review__text mx-20 my-6"><span>What</span> our users say?</div>
      <div className="home__review">
        {/* <div>Total Reviews: {reviews.length}</div>  */}
        {/* <div className="home__review__star__wraper">
                <div className="home__review__star__count"><Ratings rating={5}/> <span>{ratingsCount[5]}</span></div>   
                <div className="home__review__star__count"><Ratings rating={4}/> <span>{ratingsCount[4]}</span></div>   
                <div className="home__review__star__count"><Ratings rating={3}/> <span>{ratingsCount[3]}</span></div>   
                <div className="home__review__star__count"><Ratings rating={2}/> <span>{ratingsCount[2]}</span></div>   
                <div className="home__review__star__count"><Ratings rating={1}/> <span>{ratingsCount[1]}</span></div>    
            </div>   */}
        <img className="garage" src={garage}></img>
        <div className="home__review__card">
          {reviews.slice(0, 4).map((review) => (
            <Reviews key={review.id} review={review} />
          ))}
        </div>
        {/* <div>Read More...</div> */}
      </div>
    </>
  );
}

export default ListingReviews;
