import axios from "axios";
import { useEffect, useState } from "react";
import Reviews from "../Components/Reviews";
import "../style/review.css";
// import Ratings from "../Components/Ratings";

const API = process.env.REACT_APP_API_URL;

function ListingReviews() {
  const [reviews, setReviews] = useState([]);
  const [showReviewCard, setShowReviewCard] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/listingReviews`)
      .then((res) => setReviews(res.data))
      .catch((e) => console.warn("catch", e));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Adjust the threshold as needed based on when you want the effect to trigger
      if (scrollTop > 950) {
        setShowReviewCard(true);
      } else {
        setShowReviewCard(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      <div className="home__review">
        {/* <div>Total Reviews: {reviews.length}</div>  */}
        {/* <div className="home__review__star__wraper">
                <div className="home__review__star__count"><Ratings rating={5}/> <span>{ratingsCount[5]}</span></div>   
                <div className="home__review__star__count"><Ratings rating={4}/> <span>{ratingsCount[4]}</span></div>   
                <div className="home__review__star__count"><Ratings rating={3}/> <span>{ratingsCount[3]}</span></div>   
                <div className="home__review__star__count"><Ratings rating={2}/> <span>{ratingsCount[2]}</span></div>   
                <div className="home__review__star__count"><Ratings rating={1}/> <span>{ratingsCount[1]}</span></div>    
            </div>   */}
        <div className="garage-slideshow">
          {/* <img src={garage1} alt="Garage 1" />
          <img src={garage3} alt="Garage 3" /> */}
        </div>
        <div className="home__review__side__text">
          <p className="changeColor">What</p>
          <p className="changeColor">our</p>
          <p className="changeColor2">users</p>
          <p className="changeColor2">say</p>
        </div>
        <div className={`home__review__card${showReviewCard ? " show" : ""}`}>
          <div className="quotation">‟</div>
          {reviews.slice(0, 4).map((review) => (
            <Reviews key={review.id} review={review} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ListingReviews;
