import axios from "axios";
import { useEffect, useState } from "react"
import '../style/User.css'
import Ratings from "../Components/Ratings";

import { useUserInfo } from '../api/fetch';
import Bookings from "../Components/Bookings";

const API = process.env.REACT_APP_API_URL;

export default function User() {
  const [user, setUser] = useState([]);
  const userInfo = useUserInfo();

  useEffect(() => {
    axios.get(`${API}/users/${userInfo.id}`)
    .then((res) => setUser(res.data))
    .catch((e) => console.warn("catch", e))
  }, [userInfo.id])

  return (
    <>
    <div className="user__conainer">
        <img src={user.image} alt="avatar"/>
        <div className="profile">
            <Ratings rating={user.rating}/>
            <p>name: {user.firstname + " " + user.lastname}</p>
            <p>role :{user.role}</p>
            <p>add :{user.address}</p>
            <p>phone :{user.phone}</p>
            <p>email :{user.email}</p>
            <p>password :{user.password}</p>
            <p>verified :{user.isVerified}</p>
            <p>member since :{user.created_at}</p> 
            <hr/>
            <p>payment info</p>
        </div>
        <div className="message">message</div>
    </div>
    <div className="reviews">reviews for</div>
    <div className="reviews__posted">reviews posted</div>
    <div><Bookings userId={userInfo.id}/></div>
    </>
  )
}
