import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../style/User.css";
import icon from "../Pages/Pic/icon-chat.png";
import Ratings from "../Components/Ratings";
import VerifiedIcon from "@mui/icons-material/Verified";

import { useUserInfo } from "../api/fetch";
import CustomTabs from "../Components/Tabs";
import { storage } from "../Components/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import { formatName, formatDate } from "../utils/formatters";
import defaultPhoto from "../Pages/Pic/default-user-photo.jpg";

const API = process.env.REACT_APP_API_URL;

export default function User() {
  const { id } = useUserInfo();
  const [user, setUser] = useState([]);
  const [userImg, setUserImg] = useState("");
  const imgRef = ref(storage, `users/${id}`);

  useEffect(() => {
    axios
      .get(`${API}/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((e) => console.warn("catch", e));

    listAll(imgRef).then((res) => {
      if (res.items[0]) {
        getDownloadURL(res.items[0]).then((url) => setUserImg(url));
      }
    });
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
    user.first_name &&
    user.last_name &&
    user.address &&
    user.phone &&
    user.email
      ? "Edit your profile"
      : "Complete your profile";

  return (
    <>
      <div className="user__conainer">
        <div className="user__block bg-customBlue"></div>
        <div className="hello">Hello, {first_name}</div>
        <img src={userImg || defaultPhoto} alt="avatar" />
        {/* <img
          src={process.env.PUBLIC_URL + "/imgs/no_image.jpeg"}
          alt="avatar"
        /> */}
        <div className="profile">
          <Ratings rating={user.rating} />
          <div className="user__field">
            <div className="label">Name:</div>
            <div className="value">
              {first_name && last_name
                ? `${formatName(first_name)} ${formatName(last_name)}`
                : "N/A"}
            </div>
          </div>
          <hr className="user__hr" />
          <div className="user__field">
            <div className="label">Role: </div>
            <div>{role || "N/A"}</div>
          </div>
          <hr className="user__hr"/>
          <div className="user__field">
            <div className="label">Address: </div>
            <div>{address || "N/A"}</div>
          </div>
          <hr className="user__hr" />
          <div className="user__field">
            <div className="label">Phone: </div>
            <div>{phone || "N/A"}</div>
          </div>
          <hr className="user__hr" />
          <div className="user__field">
            <div className="label">Email: </div>
            <div>{email || "N/A"}</div>
          </div>
          <hr className="user__hr" />
          <div className="user__field">
            <div className="label">Verified:</div>
            <div>
              {is_verified ? (
                <VerifiedIcon color="success" size="small" />
              ) : (
                "N/A"
              )}
            </div>
          </div>
          <hr className="user__hr" />
          <div className="user__field">
            <div className="label">Member since: </div>
            <div>{formatDate(created_at)}</div>
          </div>
          <hr className="user__hr" />
          {/* <hr/> */}
          {/* <p>payment info</p> */}
        </div>
        <Link to={`/user/${id}/edit`}>
          <div className="profile__btn">
            <button className="bg-customBlue hover:bg-customBlueLight text-white py-2 px-4 rounded mr-2">
              {buttonLabel}
            </button>
          </div>
        </Link>
        <Link to="/inbox">
          <div className="message">
            {/* <div>message</div> */}
            <div className="user__icon">
              <img src={icon} alt="icon"></img>
            </div>
          </div>
        </Link>
        {/* <div className="reviews">reviews for</div> */}
      </div>
      {/* <div className="reviews__posted">reviews posted</div> */}
      <CustomTabs userId={id} />
    </>
  );
}
