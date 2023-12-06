// import axios from "axios";
// import { useEffect, useState } from "react"
// import '../style/lists.css'
// import Ratings from "./Ratings";
// import { Link } from "react-router-dom";

// import { storage } from "./firebase";
// import { ref, listAll, getDownloadURL } from "firebase/storage";


// const API = process.env.REACT_APP_API_URL;
// export default function Lists(){

//   const [listings, setListings] = useState([]);

//   const [id, setId] = useState("");
//   const [images, setImages] = useState([]);
//   const imgListRef = ref(storage, `listings/${id}`);
  

//   useEffect(() => {
//     axios
//     .get(`${API}/listings`)
//     .then((res) => {
//       setListings(res.data)
//     })
//     .catch((e) => console.warn("catch", e))
//   }, [])

//   // listings.map((el) => {
//   //   setId(el.listing_id)
//   // })

//   // useEffect(() => {
//   //   listAll(imgListRef).then((res) =>
//   //       res.items.forEach((item) =>
//   //           getDownloadURL(item).then((url) =>
//   //               setImages((prevs) => [...prevs, url])
//   //           )
//   //       )
//   //   )
//   // }, [id]);
//   //console.log(images);
//   return (
//     <div className="listing" >
//       {listings.map((el, index) => 
//         <Link className='listing__link' to={`/listings/show/${el.listing_id}`} key={el.listing_id}>
//           <div className="listing__single" >
//             <img src={el.image} alt=""/>
//             <Ratings rating={el.avg_rating}/>
//             <div>{el.size}</div> 
//             <div>${el.price}</div> 
//           </div>
//         </Link>
//       )}
//     </div>
//   );
// }

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
