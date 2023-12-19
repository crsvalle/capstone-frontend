//DEPENDENCIES
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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
import EditUser from "./Pages/EditUser";


//COMPONENTS
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";

//STYLE
import './index.css';
import User from "./Pages/User";
import Confirmation from "./Pages/Confirmation";

const PrivateRoutes = () =>{
  const { isAuth } = useSelector((state) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to={'/login'} />}</>
}

const RestrictedRoutes = () =>{
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to={'/user/profile'} />}</>
}
// const KEY = process.env.REACT_APP_STRIPE_API_KEY
const stripePromise = loadStripe('pk_test_51O9Gs7Cc76lpQQjkc6I6oeSL3jvYpPB3oxLFVtZkyl2yUr3kcaCALKCRd4XMutSePlqF4C3s5CyB2zFhV0TIvnEl00n6xcO1e3');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/listings/new" element={<NewListing/>}/>
              <Route path="/listings/:id/edit" element={<EditListing />} />
            </Route>

            <Route element={<RestrictedRoutes />}>
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Route>
          
            <Route path="/listings/:index" element={<IndexListings />} />
            {/* <Route path="/listings/new" element={<NewListing/>}/> */}
            <Route path="/listings/show/:index" element={<ShowListing />}/>
            {/* <Route path="/listings/:index/edit" element={<EditListing />} /> */}
            <Route path="/confirmation" element={ <Confirmation />}  />
            <Route path="/user/profile" element={<User />} />
            <Route path="/user/:index/edit" element={<EditUser/>} />
            <Route path="/register" element={<SignUp/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path='*' element={<FourOFour />}/>
          </Routes>
        </main>
        <Footer/>
      </Router>
    </Elements>
  );
}

export default App;
