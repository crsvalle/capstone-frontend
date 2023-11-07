import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../style/ListingInfo.css'


import { Rating } from "@material-tailwind/react";
import { Carousel } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";



const API = process.env.REACT_APP_API_URL;

export default function ListingInfo() {
    const { index } = useParams();
    const [listing, setListing] = useState([]);
    const [host, setHost] = useState([]);
    const [rated, setRated] = useState(null)


    useEffect(() => {
        axios
        .get(`${API}/listings/${index}`)
        .then((response) =>{
            setListing((response.data))
            setRated((response.data.avg_rating));
        }).catch((e) => console.error("catch", e))

        axios.get(`${API}/users/${listing.host}`)
        .then((response) => {
            setHost(response.data)
        })
        .catch((e) => console.error("catch", e));

    }, [index, listing.host]);

    console.log(rated)
    return (
        <div className="wholePage">
            <div className="left">
                <div className="custom-carousel-container">
                    <Carousel className="rounded-xl">
                            <img
                                src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                                alt="iage 1"
                                className="h-full w-full object-cover"
                            />
                        <img
                            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                            alt="iage 2"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                            alt="iage 3"
                            className="h-full w-full object-cover"
                        />
                    </Carousel>
                </div>
                <div className="listingCard">
                    {rated !== null && (<Rating value={rated} readonly />)}
                    <h1 className="listingText">Size: {listing.size}</h1>
                    <h2 className="listingText">Hosted by: {host.firstname} {host.lastname}</h2>
                    <p className="listingText">Address: {listing.address}</p>
                    <p className="listingText">Posted at: {listing.posted_at}</p>
                </div>
                <div className="desc">
                    <p>
                        Incoming text
                    </p>
                </div>
                <div>
                    <Button fullWidth>Contact Owner</Button>;
                </div>
            </div>
            <div className="middle">test</div>
            <div className="right">test</div>
        </div>
    )
}
