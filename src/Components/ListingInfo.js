import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../style/ListingInfo.css';

import { Rating } from "@material-tailwind/react";
import { Carousel } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

import { storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Calendar from "./Calendar";


const API = process.env.REACT_APP_API_URL;


export default function ListingInfo() {
    const { index } = useParams();
    const [listing, setListing] = useState([]);
    const [host, setHost] = useState([]);
    const [rated, setRated] = useState(null);
    const [id, setId] = useState('');
    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const imgListRef = ref(storage, `listings/${id}`);

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);

    useEffect(() => {
        axios
        .get(`${API}/listings/${index}`)
        .then((response) =>{
            setListing((response.data));
            setRated((response.data.avg_rating));
            setId(listing.listing_id);
        })
        .catch((e) => console.error("catch", e));

        axios
        .get(`${API}/users/${listing.host}`)
        .then((response) => {
            setHost(response.data);
        })
        .catch((e) => console.error("catch", e));

    }, [index, listing.host, listing.listing_id]);

    
    useEffect(() => {
        listAll(imgListRef).then((res) =>
            res.items.forEach((item) =>
                getDownloadURL(item).then((url) =>
                    setImages((prevs) => [...prevs, url])
                )
            )
        )
    }, [id]);


    const start = new Date(dateRange[0].startDate)
    const end = new Date (dateRange[0].endDate) 
    let time = Math.round(Math.abs((start - end) / (1000*60*60*24)))

    const handleBooking = () => {
        // Extract start and end dates from the dateRange state
        const startDate = dateRange[0].startDate.toISOString();
        const endDate = dateRange[0].endDate.toISOString();
    
        // Store data in localStorage
        localStorage.setItem('bookingData', JSON.stringify({
            index,
            time,
            startDate,
            endDate,
        }));
    
        // Redirect to the checkout page
        navigate('/checkout');
    };

    return (
        <div className="wholePage">
            <div className="left">
                <div className="custom-carousel-container">
                    <Carousel className="rounded-xl">
                        {images.map((image, index) =>
                            <img
                                src={image}
                                key={index}
                                alt="Listing"
                                className="h-full w-full object-cover"
                            />
                        )}
                    </Carousel>
                </div>
                <div className="listingCard">
                    {rated !== null && (<Rating value={rated} readonly />)}
                    <h1 className="listingText">Size: {listing.size}</h1>
                    <h2 className="listingText">Hosted by: {host.first_name} {host.last_name}</h2>
                    <p className="listingText">Address: {listing.address}</p>
                    <p className="listingText">Posted at: {listing.posted_at}</p>
                </div>
                <div className="desc">
                    <p>{listing.description}</p>
                </div>
                <div>
                    <Button fullWidth>Contact Owner</Button>
                </div>
            </div>

            <div className="middle">
                <div className="calendar">
                    <Calendar dateRange={dateRange} setDateRange={setDateRange} listingId={index}/>
                </div>
                <div className="priceCard">
                    <p> Daily price: ${listing.price}</p>
                    <p> Total price ({time} days): ${listing.price * time}</p>
                </div>

                <Button className="bookButton" variant="outlined" onClick={handleBooking}>Book</Button>
            </div>

            <div className="right">test</div>
        </div>
    )
}
