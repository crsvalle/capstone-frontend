import Searchbar from "../Components/Searchbar";
import Lists from "../Components/Lists"
import '../style/Home.css'


export default function Home() {
  return (
    <div className="home">
      <Searchbar/>
      <Lists/>
    </div>
  )
}
