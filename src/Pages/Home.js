import Searchbar from "../Components/Searchbar";
import Lists from "../Components/Lists"
import '../style/Home.css'
import hero from './house.png'


export default function Home() {
  return (
    <div className="home">
      <img src={hero}></img>
      <Searchbar className="search__bar"/>
      <Lists/>
    </div>
  )
}
