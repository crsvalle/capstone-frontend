import '../style/review.css'

export default function Reviews({review}) {
    return (
        <div className='review__container'>
            <div className='review__container__profile__pic'>
                <img src="" alt="pic" />
                <div>{review.rating}</div>
            </div>
            <div>{review.title}</div>
            <div>{review.body}</div>
        </div>

    )
}