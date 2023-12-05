//DEPENDENCIES
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'

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
import Dashboard from "./Pages/Dashboard";


//COMPONENTS
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";

//STYLE
import './index.css';
import User from "./Pages/User";

const PrivateRoutes = () =>{
  const { isAuth } = useSelector((state) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to={'/login'} />}</>
}

const RestrictedRoutes = () =>{
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to={'/user/profile'} />}</>
}

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/listings/new" element={<NewListing/>}/>
            <Route path="/listings/:index/edit" element={<EditListing />} />
          </Route>

          <Route element={<RestrictedRoutes />}>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
        
          <Route path="/listing/:index" element={<IndexListings />} />
          {/* <Route path="/listings/new" element={<NewListing/>}/> */}
          <Route path="/listings/show/:index" element={<ShowListing />}/>
          {/* <Route path="/listings/:index/edit" element={<EditListing />} /> */}
          <Route path="/user/:index" element={<User />} />
          <Route path="/register" element={<SignUp/>} />
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
