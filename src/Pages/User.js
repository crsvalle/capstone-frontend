import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../style/User.css";
import Ratings from "../Components/Ratings";
import Button from "@mui/material/Button";
import VerifiedIcon from '@mui/icons-material/Verified';

import { useUserInfo } from "../api/fetch";
import Bookings from "../Components/Bookings";
import CustomTabs from "../Components/Tabs";

const API = process.env.REACT_APP_API_URL;

export default function User() {
  const [user, setUser] = useState([]);
  const { id } = useUserInfo();

  useEffect(() => {
    axios
      .get(`${API}/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((e) => console.warn("catch", e));
  }, [id]);

  const {
    first_name,
    last_name,
    role,
    address,
    phone,
    email,
    is_verified,
    created_at,
  } = user;

  // Conditionally render the edit or complete profile btn 
  const buttonLabel =
    user.first_name && user.last_name && user.address && user.phone && user.email
      ? "Edit your profile"
      : "Complete your profile";

  return (
    <>
      <div className="user__conainer">
        <img
          src={process.env.PUBLIC_URL + "/imgs/no_image.jpeg"}
          alt="avatar"
        />
        <div className="profile">
          <Ratings rating={user.rating} />
          <p>
            name:{" "}
            {first_name && last_name ? `${first_name} ${last_name}` : "N/A"}
          </p>
          <p>role: {role || "N/A"}</p>
          <p>add: {address || "N/A"}</p>
          <p>phone: {phone || "N/A"}</p>
          <p>email: {email || "N/A"}</p>
          <p>verified:{is_verified ? <VerifiedIcon color="success" size="small"/> : "N/A"}</p>
          <p>member since :{created_at}</p>
          {/* <hr/> */}
          {/* <p>payment info</p> */}
          <Link to={`/user/${id}/edit`}>
            <div className="profile__btn">
              <Button
                class="bg-white hover:bg-gray-100 text-gray-600 py-2 px-4 border border-gray-400 rounded shadow"
                variant="outlined"
                size="large">
                {buttonLabel}
              </Button>
            </div>
          </Link>
        </div>
        <div className="message">message</div>
      </div>
      <div className="reviews">reviews for</div>
      <div className="reviews__posted">reviews posted</div>
      <CustomTabs userId={id} />
      {/* <div><Bookings userId={id}/></div> */}
    </>
  );
}
