import '../style/Navbar.css';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { unauthenticateUser } from '../redux/slices/authSlice';
import { onLogout } from '../api/auth';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useUserInfo } from '../api/fetch';

export default function Navbar() {
  const userInfo = useUserInfo();
  const { isAuth } = useSelector((state) => state.auth);

  const userName = userInfo.firstname && userInfo.lastName ?
    `${userInfo.firstname} ${userInfo.lastName}` :
    '';

  const dispatch = useDispatch()

  const logout = async () => {
    localStorage.setItem('isAuth', JSON.stringify(false));
    window.location.reload();
    try {
      await onLogout();
      
      dispatch(unauthenticateUser());

    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className='nav'>
      <Link to='/'><img src='' alt='logo' className='nav__logo' /></Link>
      
      {isAuth ? 
           <div className='nav__end'>
            <Link to='/listings/new'><div className='nav__item'>Create</div></Link>
            <Link to='/login'>
              <AccountCircleOutlinedIcon/> Hello {userName}
            </Link>
            <button onClick={logout}> Logout</button>
          </div>:
          <div className='nav__end'>
            <Link to='/about'><div className='nav__item'>About</div></Link>
            {/* <Link to='/login'><AccountCircleOutlinedIcon/></Link> */}
            <Link to='/login'><div className='nav__item'>Login</div></Link>
            <div>/</div>
            <Link to='/register'><div className='nav__item'>Register</div></Link>
          </div> 
    }
    </div>
  );
}
