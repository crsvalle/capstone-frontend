import Searchbar from "../Components/Searchbar";
import Lists from "../Components/Lists"
import '../style/Home.css'
import hero from './house.png'
import china from './Pic/china.png'
import packing from './Pic/packing_boxes.png'
import ListingReviews from "./ListingReviews";



export default function Home() {
  return (
    <div className="home">
      <img src={hero}></img>
      <div className="search__bar" ><Searchbar /></div>
      <div className="home__img">
        <div className="home__img__wrapper">
          <div className="home__img__text1">"Your Memories, Our Keepsake.<br/>Where Memories Find Their Home.<br/>Making Space a Keepsake Experience."</div>
          <img className="home__img__china" src={china}></img>
        </div>
        <div className="home__img__wrapper">
          <img className="home__img__packing" src={packing}></img>
          <div className="home__img__text2">"Safe and Simple,<br/> Where space meets serenity." </div>
        </div>
      </div>
      <Lists/>
      <ListingReviews/>
    </div>
  )
}
