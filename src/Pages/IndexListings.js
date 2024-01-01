import Listings from "../Components/Listings";
//import Searchbar from "../Components/Searchbar";
import GeoLocation from "../Components/GeoLocation";
import '../style/IndexListings.css'
import { Loader } from '@googlemaps/js-api-loader';


const apiKey = process.env.REACT_APP_GEOLOCATION_API;

const googleMapsLoader = new Loader({
  apiKey: apiKey,
  version: 'weekly',
  libraries: ['places'],
});
export default function IndexListings() {
  return (
    <div className="whole-page">
      <Listings googleMapsLoader={googleMapsLoader} />
      <GeoLocation googleMapsLoader={googleMapsLoader} />
    </div>

  )
}
