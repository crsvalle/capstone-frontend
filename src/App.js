//DEPENDENCIES
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//PAGES
import Home from "./Pages/Home";
import FourOFour from "./Pages/FourOFour";
import IndexListings from "./Pages/IndexListings";
import NewListing from "./Pages/NewListing";
import ShowListing from "./Pages/ShowListing";
import EditListing from "./Pages/EditListing";
import SignUp from "./Pages/SignUp";
import Checkout from "./Pages/Checkout";
import Footer from "./Pages/Footer";


//COMPONENTS
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";

//STYLE
import './index.css';
import User from "./Pages/User";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/listings" element={<IndexListings />} />
          <Route path="/listings/new" element={<NewListing/>}/>
          <Route path="/listings/:index" element={<ShowListing />}/>
          <Route path="/listings/:index/edit" element={<EditListing />} />
          <Route path="/user/:index" element={<User />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path='*' element={<FourOFour />}/>
        </Routes>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
