import Listings from "../Components/Listings";
import Map from "../Components/Map";
import '../style/IndexListings.css'

export default function IndexListings() {
  return (
    <div className="whole-page">
      <section className="left">
        <Listings/>
      </section>
      <section className="right">
        <Map />
      </section>
    </div>
  )
}
