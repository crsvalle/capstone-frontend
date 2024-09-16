import Searchbar from "../Components/Searchbar";
import Lists from "../Components/Lists";
import "../style/Home.css";
import hero from "./house.png";
// import hero from "./Pic/garage1.jpeg";
import china from "./Pic/china.png";
import packing from "./Pic/packing_boxes.png";
import ListingReviews from "./ListingReviews";

export default function Home() {
  return (
    <>
      <div className="home bg-customCreamyButterLight">
        
        <img src={hero} alt="hero"></img>
        <div className="search__bar">
          <Searchbar />
        </div>
        <div className="home__img">
          <div className="home__img__text__wrapper">
            <div>
              <p className="home__img__text1 one first">
                Your 
              </p>
              <p className="home__img__text1 one second">Memories, Our</p>
              <p className="home__img__text1 one span">Keepsake.</p>
              <p className="home__img__text1 two ">
                <span>Where Memories Find &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Their Home.</span>
              </p>
              <p className="home__img__text1 three">
                Making Space a <span>Keepsake Experience.</span>
              </p>
            </div>

            <img className="home__img__china" src={china} alt="china"></img>
          </div>
          <div className="home__img__text__wrapper">
            <img className="home__img__packing" src={packing} alt="boxes"></img>
            <p className="home__img__text2 one">
              Safe and Simple,
              <br /> Where space meets serenity.
            </p>
          </div>
        </div>
        <div className="home__list__header">
          • MANHATTAN • BROOKLYN • LISTINGS NEAR BY • QUEENS • BRONX •
        </div>
        <Lists />
      </div>
      <ListingReviews />
    </>
  );
}
