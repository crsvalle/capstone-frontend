import '../style/Login.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useDispatch } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { authenticateUser, updateUserInfo } from '../redux/slices/authSlice'
import { onLogin } from '../api/auth'
import { useState } from 'react';

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState(false)

  let navigate = useNavigate()

  const handleTextChange = (event) => {
    setInput({...input, [event.target.id]: event.target.value});
  }
  const dispatch = useDispatch()
  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const user = await onLogin(input);
      
      const { id, email } = user;
      console.log(user)
      
      dispatch(authenticateUser());
      dispatch(updateUserInfo({ id, email }));
  
      localStorage.setItem('isAuth', JSON.stringify(true));
      localStorage.setItem('id', id);
      localStorage.setItem('email', email );
      navigate('/')

    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
    }
  }

  return (
    <Box
      onSubmit={handleSignIn}
      className='login__box'
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        '& button': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <div className='login__box__main'> 
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
      <div className='login__box__btn'>
        <Button variant="outlined" size="large" type='submit'>
            LOGIN
        </Button>
      </div>
      <div className="login__box__footer">
      <div className="forgetPass">Forgot Password?</div>
      <div className='signUp'>Sign up Here!</div>
      </div>
      </div>
    </Box>
  );
}