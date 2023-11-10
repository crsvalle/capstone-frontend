import '../style/review.css';
import Ratings from './Ratings';
import Avatar from '@mui/material/Avatar';

export default function Reviews({review}) {
    return (
        <div className='review__container'>
            <div className='review__container__profile__pic'>
                <Avatar src='' alt='pic' sx={{ width: 30, height: 30 }} />
                <Ratings rating={review.rating}/>
            </div>
            <div>{review.title}</div>
            <div>{review.body}</div>
            <hr className='review__hr'/>
        </div>
    )
}