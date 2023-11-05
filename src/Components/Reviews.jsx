

export default function Reviews({review}) {
    return (
        <div>
            hello
            <div>{review.title}</div>
            <img src="" alt="pic" />
            <p>{review.author_id}</p>
            <div>{review.rating}</div>
            <div>{review.title}</div>
            <div>date</div>
            <div>{review.body}</div>
        </div>

    )
}