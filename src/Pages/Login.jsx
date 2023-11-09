import '../style/Login.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  })

  const handleTextChange = (event) => {
    setInput({...input, [event.target.id]: event.target.value});
  }

  const handleSignIn = (event) => {
    event.preventDefault();
    handleTextChange()
  }

  //console.log(input);

  return (
    <Box 
      onSubmit = {handleSignIn}
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
          defaultValue=""
          value={input.value}
          onChange={handleTextChange}
        />
        <TextField
          required  
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={input.value}
          onChange={handleTextChange}
        />
      <div className='login__box__btn'>
        <Button variant="outlined" size="large">
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