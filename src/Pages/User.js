import axios from "axios";
import { useEffect, useState } from "react"
import '../style/User.css'
import Ratings from "../Components/Ratings";

import { useUserInfo } from '../api/fetch';
import Bookings from "../Components/Bookings";
import CustomTabs  from "../Components/Tabs";

const API = process.env.REACT_APP_API_URL;

export default function User() {
  const [user, setUser] = useState([]);
  const { id } = useUserInfo();

  useEffect(() => {
    axios.get(`${API}/users/${id}`)
    .then((res) => setUser(res.data))
    .catch((e) => console.warn("catch", e))
  }, [id])

  const { first_name, last_name, role, address, phone, email, is_verified, created_at } = user;

  return (
    <>
      <div className="user__conainer">
        <img src={user.image} alt="avatar"/>
        <div className="profile">
          <Ratings rating={user.rating}/>
          <p>name: {first_name && last_name ? `${first_name} ${last_name}` : 'N/A'}</p>
          <p>role: {role || 'N/A'}</p>
          <p>add: {address || 'N/A'}</p>
          <p>phone: {phone || 'N/A'}</p>
          <p>email: {email || 'N/A'}</p>
          <p>verified:{is_verified ? " ✅" :" Not Yet"}</p>
          <p>member since :{created_at}</p> 
          <hr/>
          <p>payment info</p>
        </div>
        <div className="message">message</div>
      </div>
      <div className="reviews">reviews for</div>
      <div className="reviews__posted">reviews posted</div>
      <CustomTabs userId={id}/>
      {/* <div><Bookings userId={id}/></div> */}
    </>
  )
}
