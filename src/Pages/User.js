import axios from "axios";
import { useEffect, useState } from "react"
import '../style/User.css'

const API = process.env.REACT_APP_API_URL;

export default function User() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get(`${API}/users/1`)
    .then((res) => setUser(res.data))
    .catch((e) => console.warn("catch", e))
  }, [])

  return (
    <>
    <div class="user__conainer">
        <img src="" alt="avatar"/>
        <div class="profile">
            <span>****</span>
            <h1>{user.firstName + " " + user.lastName}</h1>
            <p>role :{user.role}</p>
            <p>add :{user.address}</p>
            <p>phone :{user.phone}</p>
            <p>email :{user.email}</p>
            <p>password :{user.password}</p>
            <p>verified :{user.verified}</p>
            <p>member since :{user.created_at}</p> 
            <hr/>
            <p>payment info</p>
        </div>
        <div class="message">message</div>
    </div>
    <div class="reviews">reviews for</div>
    <div class="reviews__posted">reviews posted</div>
    </>
  )
}
