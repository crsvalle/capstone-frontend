import Searchbar from "../Components/Searchbar";
import Lists from "../Components/Lists"
import '../style/Home.css'
import hero from './house.png'
import ListingReviews from "./ListingReviews";
import Geolocation from "../Components/GeoLocation";



export default function Home() {
  return (
    <div className="home">
      <img src={hero}></img>
      <Searchbar className="search__bar"/>
      <Lists/>
      <ListingReviews/>
      <Geolocation/>
    </div>
  )
}
