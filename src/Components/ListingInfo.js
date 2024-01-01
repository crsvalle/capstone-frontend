import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import '../style/ListingInfo.css';
import { Carousel } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { EditIcon, Star } from '../style/icons'


import { storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

// import { formatDate } from "../utils/formatters";
import Calendar from "./Calendar";


import { useAvailability, useUserInfo } from "../api/fetch";
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
    const userInfo = useUserInfo();


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
        <div className="wholePage" style={{ maxWidth: '1000px' }}>
            <div className="header">
                <div className="flex items-center justify-between px-1">
                    <h2>{listing.size}</h2>
                    {host.id && userInfo.id && host.id === userInfo.id ?
                        <Link to={`/listings/${id}/edit`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className=' text-logoGold' role="img" aria-label="Edit" style={{ fontSize: '1.75rem' }}>
                                <EditIcon />
                            </span>
                        </Link> : ''
                    }
                </div>
                <div className="flex justify-between px-1">
                    <p className="mb-2">
                        {listing.city}, {listing.state}{' '}
                    </p>
                    <p>
                        <strong className="flex items-center">
                            <Star /> {rated}/5
                        </strong>
                    </p>

                </div>

                <div className="images">
                    {windowWidth <= 600 ? (
                        renderImages()
                    ) : (
                        <div className="">
                            <FeaturedImageGallery initialImages={images} price={listing.price} />
                        </div>
                    )}
                </div>
                <div className="details section mb-40  b-grey ">
                    <h3>SPACE description</h3>
                    <p>{listing.description} </p>
                    <p>&nbsp;</p>
                    {/* <p>&nbsp;</p> */}
                </div>
                <div className="access-info section  b-grey">
                    <h3>ACCESS INFORMATION</h3>
                    {availability && (
                        <div className="availabilityInfo">
                            {availability.after_hours && (
                                <li>
                                    This facility allows for access after 9pm
                                </li>
                            )}
                            {availability.appointment_needed && (
                                <li>
                                    This facility requires appointment before entering
                                </li>
                            )}
                            {availability.private && (
                                <li>
                                    Exclusive access via individual security codes.
                                </li>
                            )}
                        </div>
                    )}
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                </div>
                <div className="overview section b-grey">
                    <h3>overview</h3>
                    <p className="flex items-center">
                        <strong>Rated</strong>: <Star /> {rated}/5
                    </p>
                    <p><strong>size</strong>: {listing.size}</p>
                    <p><strong>Price</strong>: ${listing.price} per month</p>
                    <p><strong>Hosted by</strong>:{(host.last_name && host.last_name.length > 0) ? ` ${host.first_name} ${host.last_name[0]}.` : ''}</p>
                    <p><strong>Located around</strong>: {listing.zip} {listing.city}, {listing.state}</p>
                    <p className="disclaimer"><strong>Full address available after booking</strong></p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                </div>
                <div className="calendar section b-grey">
                    <h3>CALENDAR</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Calendar dateRange={dateRange} setDateRange={setDateRange} listingId={index} />
                    </div>
                </div>
                <div className="bookBtn section">
                    <p> Total price ({time} days): ${((listing.price / 30) * time).toFixed(2)}</p>
                    <Button onClick={handleBooking} className="bookButton mb-4 bg-customBlue hover:bg-customBlueLight text-white font-bold py-2 px-4 rounded">
                        Book Now
                    </Button>
                    <p>&nbsp;</p>
                </div>
                <div className="questions section b-grey">
                    <h3>questions?</h3>
                    <p>
                        If you want to{' '}
                        <a
                            href="/inbox"
                            className="text-blue-500 underline"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/inbox', { state: { ownerId: listing.host } });
                            }}
                        >
                            contact the owner
                        </a>{' '}
                        directly, feel free to reach out. If there is something not right about the listing,{' '}
                        <a href="mailto:keepsake@gmail.com" className="text-blue-500 underline">contact us</a>.
                    </p>

                </div>
            </div>
        </div>
    )
}
