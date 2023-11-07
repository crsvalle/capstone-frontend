import axios from "axios";
import { useEffect, useState } from "react"
import '../style/User.css'
import { useParams } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function User() {
  const [user, setUser] = useState([]);
  const { index } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3003/users/${index}`)
    .then((res) => setUser(res.data))
    .catch((e) => console.warn("catch", e))
  }, [index])

  return (
    <>
    <div class="user__conainer">
        <img src="" alt="avatar"/>
        <div class="profile">
            <span>****</span>
            <p>{user.firstname + " " + user.lastname}</p>
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
