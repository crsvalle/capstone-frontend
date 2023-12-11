import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";

const API = process.env.REACT_APP_API_URL;

function EditProfile() {
  const navigate = useNavigate();
  const { index } = useParams();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios.get(`${API}/users/${index}`).then((res) => setUser(res.data));
  }, [index]);
  //console.log(user);

  const editProfile = (updateProfile) => {
    // console.log(updateProfile);
    axios
      .put(`${API}/users/${index}`, updateProfile)
      .then(() => navigate(`/user/${index}`))
      .catch((e) => console.warn("catch", e));
  };

  const handleTextChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
    // console.log(user);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editProfile(user);
    //console.log(user);
  };
  //console.log(user);
  return (
    <>
      <div className="my-10 flex flex-col w-10">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "30ch" },
            "& button": { m: 1 },
          }}
          noValidate
          autoComplete="off">
          <TextField
            id="first_name"
            label="First Name"
            //  variant="standard"
            size="small"
            value={user.first_name}
            onChange={handleTextChange}
            // InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="last_name"
            label="Last Name"
            // variant="standard"
            size="small"
            value={user.last_name}
            onChange={handleTextChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            helperText=""
            id="address"
            label="Address"
            // variant="standard"
            size="small"
            value={user.address}
            onChange={handleTextChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon className="w-s" style={{ fontSize: "20px" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            helperText=""
            id="email"
            label="Email"
            // variant="standard"
            size="small"
            value={user.email}
            onChange={handleTextChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon className="w-s" style={{ fontSize: "20px" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="phone"
            label="Phone"
            // variant="standard"
            size="small"
            value={user.phone}
            onChange={handleTextChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon
                    className="w-s"
                    style={{ fontSize: "20px" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            helperText=""
            id="image"
            size="small"
            label="Upload Image"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DriveFolderUploadIcon
                    className="w-s"
                    style={{ fontSize: "20px" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <button
            type="submit"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-500 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Save
          </button>
        </Box>
      </div>
    </>
  );
}

export default EditProfile;
