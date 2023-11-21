import Listings from "../Components/Listings";
import GeoLocation from "../Components/GeoLocation";
import Searchbar from "../Components/Searchbar";
import '../style/IndexListings.css'


export default function IndexListings() {
  return (
    <div>
      <div className="indexListings__searchbar"><Searchbar /></div>
      <div className="whole-page">
          <Listings/>
          <GeoLocation/>
      </div>
    </div>
  )
}
