import "../style/Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import pic from "./Pic/handTruck.png";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authenticateUser, updateUserInfo } from "../redux/slices/authSlice";
import { onLogin } from "../api/auth";
import { useState } from "react";
import { Typography } from "@material-tailwind/react";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  let navigate = useNavigate();

  const handleTextChange = (event) => {
    setInput({ ...input, [event.target.id]: event.target.value });
  };
  const dispatch = useDispatch();
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await onLogin(input);
      dispatch(authenticateUser());

      localStorage.setItem("isAuth", JSON.stringify(true));

      navigate("/");
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }
  };

  return (
    <div className="login__wrapper">
      <div className="login__pic">
        <img src={pic} alt="hand-truck" />
      </div>
      <Box
        onSubmit={handleSignIn}
        className="login__box"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          "& button": { m: 1 },
        }}
        noValidate
        autoComplete="off">
        <div className="login__box__main">
          <TextField
            required
            id="email"
            label="Email"
            type="email"
            value={input.email}
            onChange={(e) => handleTextChange(e)}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={input.password}
            onChange={(e) => handleTextChange(e)}
          />
          <Typography style={{ color: "red" }}>{error}</Typography>
          <div className="login__box__btn">
          <button className="bg-customBlue hover:bg-customBlueLight text-white py-2 px-4 rounded mr-2">
              LOGIN
            </button>
          </div>
          <div className="login__box__footer">
            <div className="forgetPass">Forgot Password?</div>
            <Link to="/register">
              <div className="signUp">Sign up Here!</div>
            </Link>
          </div>
        </div>
      </Box>
    </div>
  );
}
