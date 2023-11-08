import axios from "axios";
import { useEffect, useState } from "react"
import '../style/lists.css'
import Ratings from "./Ratings";


const API = process.env.REACT_APP_API_URL;
export default function Lists(){

  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
    .get('http://localhost:3003/listings')
    .then((res) => {
      setListings(res.data)
    })
    .catch((e) => console.warn("catch", e))
  }, [])
  
  return (
    <div className="listing" >
      {listings.map(el => 
        <>
          <div className="listing__single">
          <img src={el.image} alt=""/>
          <Ratings rating={el.avg_rating}/>
           <div>{el.size}</div> 
           <div>${el.price}</div> 
          </div>
        </>
      )}
    </div>
  );
}