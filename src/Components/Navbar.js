import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "./Searchbar";
import "../style/Navbar.css";
import logo from "../Pages/Pic/logo.png";

import { useDispatch, useSelector } from "react-redux";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { onLogout } from "../api/auth";
import { useUserInfoNav } from "../api/fetch";
import { formatName } from "../utils/formatters";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const { isAuth } = useSelector((state) => state.auth);
  const userInfo = useUserInfoNav(isAuth);

  const userName =
    userInfo.first_name && userInfo.last_name
      ? `${formatName(userInfo.first_name)} ${formatName(userInfo.last_name)}`
      : "";

  const dispatch = useDispatch();
  const location = useLocation();

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.setItem('isAuth', JSON.stringify(false));
    } catch (error) {
      console.log(error.response);
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <div className="nav">
      <Link to="/">
        <div className="nav__logo__wrapper">
          <img className="nav__logo" src={logo} alt="logo" />
          {/* <div className="nav__logo__text">KEEPSAKE</div> */}
        </div>
      </Link>
      {/* checking if the path and applying customClass attribute passed from searchbar comp */}
      {!isHomePage && <Search customClass="nav__searchBar" />}
      {isAuth ? (
        <div
          className={`nav__end ${isMenuOpen ? "nav__end--open" : ""}`}
          onClick={closeMenu}>
          <Link to="/listings/new">
            <button className="bg-customBlue hover:bg-customBlueLight text-white font-bold py-2 px-4 rounded mr-2">
              ＋ Create
            </button>
          </Link>
          <ProfileMenu logout={logout} id={userInfo.id} />
          {userName}
          <Link
            to="/user/profile"
            className="ml-2 flex items-center text-gray-700"></Link>
        </div>
      ) : (
        <div
          className={`nav__end ${isMenuOpen ? "nav__end--open" : ""}`}
          onClick={closeMenu}>
          <Link to="/about">
            <div className="nav__item">About</div>
          </Link>
          <Link to="/login">
            <div className="nav__item">Login</div>
          </Link>
          {/* <div>/</div> */}
          <Link to="/register">
            <div className="nav__item">Register</div>
          </Link>
        </div>
      )}
      <div className="nav__menu-icon" onClick={toggleMenu}>
        ☰
      </div>
    </div>
  );
}
