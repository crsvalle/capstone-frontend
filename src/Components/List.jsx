import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import "../style/lists.css";
import "../style/Listing.css";

export default function List({ listing }) {
  const [id] = useState(listing.listing_id);

  const [images, setImages] = useState([]);
  const imgListRef = ref(storage, `listings/${id}`);

  useEffect(() => {
    listAll(imgListRef).then((res) =>
      res.items.forEach((item) =>
        getDownloadURL(item).then((url) =>
          setImages((prevs) => [...prevs, url])
        )
      )
    );
  }, []);

  return (
    // <div className="listing__info">
    // <Link to={`/listings/show/${listing.listing_id}`}>
    //   <div className="m-3">
    //     <div className="relative rounded-lg shadow-lg p-3 w-40  mx-auto border border-white bg-white">
    //       <div className="w-30 bg-transparent" >
    //         <div className=" overflow-hidden rounded-lg" style={{ height: "100px" }}>
    //           {images.length ? (<img src={images[0]} alt="pic" style={{ height: "100%" }}/>) : (<img src={process.env.PUBLIC_URL + '/imgs/no_image.jpeg'} alt="" />)}

    //         </div>
    //       </div>
    //       <div className="w-full md:w-1/2 mt-1 flex flex-col ">
    //         <div className="flex justify-between items-center">
    //           <div className="flex items-center">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="h-5 w-5 text-yellow-500"
    //               viewBox="0 0 20 20"
    //               fill="currentColor">
    //               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.810h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    //             </svg>
    //             <p className="text-gray-600 font-bold text-xs ml-1">
    //               {listing.avg_rating.toFixed(1)} / 5
    //               <span className="text-gray-500 font-normal"></span>
    //             </p>
    //           </div>
    //         </div>
    //         <div className="listing__info px-3 flex flex-row">
    //           <p className="text-xs font-black text-gray-800">
    //             ${listing.price}
    //             <span className="text-xs font-normal text-gray-600">
    //               /month
    //             </span>
    //           </p>
    //           <div className="font-black text-gray-800 md:text-xs text-xs px-2">
    //             {listing.size}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Link>
    // </div>

    <div className="listing__info">
      <Link to={`/listings/show/${listing.listing_id}`}>
        <div>
          <div
            className=" overflow-hidden rounded-sm"
            style={{ height: "100px" }}>
            {images.length ? (
              <img src={images[0]} alt="pic" style={{ height: "100%" }} />
            ) : (
              <img
                src={process.env.PUBLIC_URL + "/imgs/no_image.jpeg"}
                alt=""
              />
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-1 flex flex-col ">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.810h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p className="text-gray-600 font-bold text-xs ml-1">
                {listing.avg_rating.toFixed(1)} / 5
                {/* <span className="text-gray-500 font-normal"></span> */}
              </p>
            </div>
          </div>
          <div className="px-1 flex flex-row">
            <p className="text-xs font-black text-gray-800">
              ${listing.price}
              <span className="text-xs font-normal text-gray-600">/month</span>
            </p>
            <div className="font-black text-gray-800 md:text-xs text-xs px-2">
              {listing.size}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
