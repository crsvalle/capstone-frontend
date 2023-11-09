import '../style/Login.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login() {
  return (
    <Box className='login__box'
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
          id="outlined-input"
          label="Email"
          defaultValue=""
        />
        <TextField
          required  
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
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
