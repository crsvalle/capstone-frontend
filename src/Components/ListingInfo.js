import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../style/ListingInfo.css';

import { Rating } from "@material-tailwind/react";
import { Carousel } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';


import { storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import { formatDate } from "../utils/formatters";
import Calendar from "./Calendar";

import { useAvailability  } from "../api/fetch";


const API = process.env.REACT_APP_API_URL;


export default function ListingInfo() {
    const { index } = useParams();
    const [listing, setListing] = useState([]);
    const [host, setHost] = useState([]);
    const [rated, setRated] = useState(null);
    const [id, setId] = useState('');
    const navigate = useNavigate();
    const availability = useAvailability(index);
    console.log(availability)

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
                            {images.map((image, index) => (
                                <div className="image-container rounded-xl overflow-hidden mb-4" key={index}>
                                    <div className="pb-9/16"> {/* 16:9 aspect ratio */}
                                        <img
                                            src={image}
                                            alt="Listing"
                                            className="absolute  w-full h-full object-cover rounded-xl"
                                        />
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                <div className="listingCard">
                    {rated !== null && (<Rating value={rated} readonly />)}
                    <h1 className="listingText">Size: {listing.size}</h1>
                    <h2 className="listingText">Hosted by: {host.first_name} {host.last_name}</h2>
                    <p className="listingText">Posted on: {formatDate(listing.posted_at)}</p>
                    <p className="listingText mb-5">To see full address, make a reservation</p>
                </div>
                
                <div className="desc mb-5">
                    <p>{listing.description}</p>
                </div>
                    <div className="mb-5">
                        <h1 className=" text-xl font-bold">Access Information</h1>
                        {availability && (
                        <div className="availabilityInfo">
                            {availability.after_hours && (
                                <p className="availabilityMessage flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-md my-2">
                                    <ExclamationCircleIcon className="h-4 w-4 mr-2" />
                                    This facility allows for access after 9pm
                                </p>
                            )}
                            {availability.appointment_needed && (
                                <p className="availabilityMessage flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-md my-2">
                                    <ExclamationCircleIcon className="h-4 w-4 mr-2" />
                                    This facility requires appointment before entering
                                </p>
                            )}
                            {availability.private && (
                                <p className="availabilityMessage flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-md my-2">
                                    <ExclamationCircleIcon className="h-4 w-4 mr-2" />
                                    Exclusive access via individual security codes.
                                </p>
                            )}
                        </div>
                    )}

                    </div>
                <div>
                    <Button fullWidth>Contact Owner</Button>
                </div>
            </div>

            <div className="middle">
                <div className="calendar">
                    <Calendar dateRange={dateRange} setDateRange={setDateRange} listingId={index}/>
                </div>
                <div className="priceCard rounded-lg p-4  bg-white">
                    <p className="text-lg font-bold">Monthly price: ${listing.price}</p>
                    <p className="text-sm">Total price ({time} days): ${((listing.price / 30) * time).toFixed(2)}</p>
                    <Button onClick={handleBooking} className="bookButton mt-4 bg-customBlue hover:bg-customBlueLight text-white font-bold py-2 px-4 rounded">
                        Book Now
                    </Button>
                </div>

            </div>
        </div>
    )
}
