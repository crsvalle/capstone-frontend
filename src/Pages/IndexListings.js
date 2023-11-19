import Listings from "../Components/Listings";
import GeoLocation from "../Components/GeoLocation";
import Searchbar from "../Components/Searchbar";
import '../style/IndexListings.css'


export default function IndexListings() {
  return (
    <div>
    <div className="whole-page">
      <section className="left">
        <Listings/>
      </section>
      <section className="right">
        <div className="indexListings__searchbar"><Searchbar /></div>
        <GeoLocation/>
      </section>
    </div>
    </div>
  )
}
