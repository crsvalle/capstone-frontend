import '../style/Navbar.css';

export default function Navbar() {
  return (
    <div className='nav'>
      <img src='' alt='logo' className='nav__logo' />
      <div className='nav__end'>
        <div className='nav__item'>About</div>
        <div className='nav__item'>Login</div>
        <div>/</div>
        <div className='nav__item'>Register</div>
      </div>
    </div>
  );
}
