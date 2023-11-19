import Listings from "../Components/Listings";
import GeoLocation from "../Components/GeoLocation";
import '../style/IndexListings.css'

export default function IndexListings() {
  return (
    <div className="whole-page">
        <Listings/>
        <GeoLocation/>
    </div>
  )
}
