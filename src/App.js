//DEPENDENCIES
import './index.css';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";


import Inbox from "./Pages/Inbox";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


//PAGES
const Home = lazy(() => import('./Pages/Home'));
const FourOFour = lazy(() => import('./Pages/FourOFour'));
const IndexListings = lazy(() => import('./Pages/IndexListings'));
const NewListing = lazy(() => import('./Pages/NewListing'));
const ShowListing = lazy(() => import('./Pages/ShowListing'));
const EditListing = lazy(() => import('./Pages/EditListing'));
const SignUp = lazy(() => import('./Pages/SignUp'));
const Checkout = lazy(() => import('./Pages/Checkout'));
const Footer = lazy(() => import('./Pages/Footer'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const EditUser = lazy(() => import('./Pages/EditUser'));
const Login = lazy(() => import('./Pages/Login'));
const User = lazy(() => import('./Pages/User'));
const Confirmation = lazy(() => import('./Pages/Confirmation'));

const Navbar = lazy(() => import('./Components/Navbar'));


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
      <Suspense fallback={<div>Loading...</div>} >
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
        
          <Route path="/inbox" element={<Inbox  />} />
          <Route path="/listings/:index" element={<IndexListings />} />
          {/* <Route path="/listings/new" element={<NewListing/>}/> */}
          <Route path="/listings/show/:index" element={<ShowListing />}/>
          {/* <Route path="/listings/:index/edit" element={<EditListing />} /> */}
          <Route path="/confirmation/" element={ <Confirmation />}  />
          <Route path="/user/profile" element={<User />} />
          <Route path="/user/:index/edit" element={<EditUser/>} />
          <Route path="/register" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path='*' element={<FourOFour />}/>
        </Routes>
      </main>
      <Footer/>
      </Suspense>
    </Router>
</Elements>

  );
}

export default App;
