import Listings from "../Components/Listings";
// import GeoLocation from "../Components/GeoLocation";
import Searchbar from "../Components/Searchbar";
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
    <div>
      <div className="indexListings__searchbar"><Searchbar googleMapsLoader={googleMapsLoader}/></div>
      <div className="whole-page">
          <Listings googleMapsLoader={googleMapsLoader}/>
          {/* <GeoLocation/> */}
      </div>
    </div>
  )
}
