import '../style/review.css'
import Ratings from './Ratings'

export default function Reviews({review}) {
    return (
        <div className='review__container'>
            <div className='review__container__profile__pic'>
                <img src={review.image} alt="pic" />
                <Ratings rating={review.rating}/>
            </div>
            <div>{review.title}</div>
            <div>{review.body}</div>
            <hr className='review__hr'/>
        </div>

    )
}