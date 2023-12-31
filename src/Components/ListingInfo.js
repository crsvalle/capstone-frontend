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

import { useAvailability } from "../api/fetch";
import { FeaturedImageGallery } from "./FeaturedImageGallery";


const API = process.env.REACT_APP_API_URL;


export default function ListingInfo() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { index } = useParams();
    const [listing, setListing] = useState([]);
    const [host, setHost] = useState([]);
    const [rated, setRated] = useState(null);
    const [id, setId] = useState('');
    const navigate = useNavigate();
    const availability = useAvailability(index);

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
            .then((response) => {
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

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const start = new Date(dateRange[0].startDate)
    const end = new Date(dateRange[0].endDate)
    let time = Math.round(Math.abs((start - end) / (1000 * 60 * 60 * 24)))

    const handleBooking = () => {

        const startDate = dateRange[0].startDate.toISOString();
        const endDate = dateRange[0].endDate.toISOString();

        localStorage.setItem('bookingData', JSON.stringify({
            index,
            time,
            startDate,
            endDate,
        }));


        navigate('/checkout');
    };

    const renderImages = () => {
        if (images.length > 1) {
            return (
                <>
                    <Carousel >
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image}
                                    alt="Listing"
                                    className="h-full w-full object-cover rounded-lg"
                                />
                                <div className="top-right-text">
                                    <h5>${listing.price}</h5>
                                    <p>per month</p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </>
            );
        } else {
            return (
                <div className="relative">
                    <img
                        src={images[0]}
                        alt="empty"
                        className="h-full w-full object-cover rounded-lg"
                    />
                    <div className="top-right-text">
                        <h5>${listing.price}</h5>
                        <p>per month</p>
                    </div>
                </div>

            );
        }
    };

    return (
        <div className="wholePage">
            <div className="header">
                <h2>{listing.size}</h2>
                <div className="flex justify-between px-1">
                    <p className=" mb-2">{listing.city}, {listing.state}</p>
                    <p>Hosted by: {host.first_name}</p>
                </div>
            </div>
            <div className="images">
                {windowWidth <= 800 ? (
                    renderImages()
                ) : (
                    <div className="images">
                        <FeaturedImageGallery initialImages={images} price={listing.price} />
                    </div>
                )}
            </div>
            <div className="details section mb-40  b-grey ">
                <h3>SPACE description</h3>
                <p className="disclaimer">Full address available after booking</p>
                <p>{listing.description} </p>
                <p>&nbsp;</p>
                {/* <p>&nbsp;</p> */}
            </div>
            <div className="access-info section  b-grey">
                <h3>ACCESS INFORMATION</h3>
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
                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </div>
            <div className="questions section b-grey">
                <h3>questions?</h3>
                <Button className=" bg-customBlue my-3" onClick={() => navigate('/inbox', { state: { ownerId: listing.host } })}>
                    Contact Owner
                </Button>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </div>
            <div className="calendar section b-grey">
                <h3>CALENDAR</h3>


                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Calendar dateRange={dateRange} setDateRange={setDateRange} listingId={index} />
                </div>

                <p>&nbsp;</p>
            </div>
            <Button onClick={handleBooking} className="bookButton mt-4 bg-customBlue hover:bg-customBlueLight text-white font-bold py-2 px-4 rounded">
                Book Now
            </Button>
        </div>
    )
}

// {availability && (
// <div className="availabilityInfo">
//     {availability.after_hours && (
//         <p className="availabilityMessage flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-md my-2">
//             <ExclamationCircleIcon className="h-4 w-4 mr-2" />
//             This facility allows for access after 9pm
//         </p>
//     )}
//     {availability.appointment_needed && (
//         <p className="availabilityMessage flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-md my-2">
//             <ExclamationCircleIcon className="h-4 w-4 mr-2" />
//             This facility requires appointment before entering
//         </p>
//     )}
//     {availability.private && (
//         <p className="availabilityMessage flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-md my-2">
//             <ExclamationCircleIcon className="h-4 w-4 mr-2" />
//             Exclusive access via individual security codes.
//         </p>
//     )}
// </div>
// )}
// <Calendar dateRange={dateRange} setDateRange={setDateRange} listingId={index}/>