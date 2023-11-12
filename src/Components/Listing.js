import axios from "axios";
import { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;


export default function Listing({listing}) {
  const [host, setHost] = useState([])

  useEffect(() => {
    axios
    .get(`${API}/users/${listing.host}`)
    .then((response) =>{
        setHost((response.data));
    }).catch((e) => console.error("catch", e))
}, [listing.host]);



return (
  <Card className="w-full max-w-[30rem] shadow-lg my-1">
    <CardHeader floated={false} color="blue-gray">
      <img
        src="https://dingdong887180022.files.wordpress.com/2021/06/empty-room.jpg"
        alt="ui/ux review check"
      />
      <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
    </CardHeader>
    <CardBody>
      <div className="mb-3 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray" className="font-medium">
          {listing.size}
        </Typography>
        <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {listing.avg_rating.toFixed(1)}
          </Typography>
      </div>
      <Typography color="gray">
        Hosted by: {host.firstname} {host.lastname}
      </Typography>
      <div className="group mt-8 inline-flex flex-wrap items-center gap-3 ">
        <p style={{color:"green"}}>${listing.price}.00 per month</p>
        <Tooltip content="24/7 Availability">
            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C9.79 2 8 3.79 8 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 7c-2.67 0-8 1.34-8 4v3c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-3c0-2.66-5.33-4-8-4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Tooltip>
      </div>
    </CardBody>
    <CardFooter className="pt-3">
      <Link to={`/listings/${listing.listing_id}`}>
      <Button size="lg" fullWidth={true}>
        See more
      </Button>
      </Link>
    </CardFooter>
  </Card>
);

}
