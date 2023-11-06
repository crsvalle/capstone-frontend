import '../style/Navbar.css';
import { Link } from "react-router-dom"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function Navbar() {
  return (
    <div className='nav'>
      <Link to='/'><img src='' alt='logo' className='nav__logo' /></Link>
      <div className='nav__end'>
        <Link to='/about'><div className='nav__item'>About</div></Link>
        <Link to='/login'><AccountCircleOutlinedIcon/></Link>
        <Link to='/login'><div className='nav__item'>Login</div></Link>
        <div>/</div>
        <Link to='/register'><div className='nav__item'>Register</div></Link>
      </div>
    </div>
  );
}
