import { useEffect, useState } from 'react';
import '../style/review.css';
import Ratings from './Ratings';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export default function Reviews({review}) {
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios
        .get(`${API}/users/${review.author_id}`)
        .then((res) => setUser(res.data))
        .catch((e) => console.warn("catch", e))
    },[review.author_id])
    return (
        <div className='review__container'>
            <div className='review__container__profile__pic'>
                <Avatar src={user.image} alt='pic' sx={{ width: 30, height: 30 }} />
                <Ratings rating={review.rating}/>
            </div>
            <div className='review__title pt-3'>{review.title}</div>
            <div className='review__body'>{review.body}</div>
        </div>
    )
}