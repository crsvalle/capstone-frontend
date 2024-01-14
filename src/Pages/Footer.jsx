import '../style/Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link } from 'react-router-dom';

export default function Footer (){
    return (
        <div className="footer__main__wrapper">
            <hr/>
            <div className="footer__container bg-customBlue">
                <div>
                    <div>Support</div>
                    <div>Help Center</div>
                    <div>FAQ</div>
                    <div>Report</div>
                </div>
                <div>
                <Link to="/"><div>Keepsake</div></Link>
                    <Link to="/register"><div>Become a Host</div></Link>
                    <div>Carrers</div>
                    <div>Terms of Service</div>
                </div>
            </div>
            <hr className='hr__second' />
            <div className="footer__last">
                <div className="footer__last__bottom">
                    <Link to="/"><div className='footer__last__bottom__title'>© KEEPSAKE</div></Link>
                    <div className='footer__last__bottom__title footer__sm__text'>Terms</div>
                    <div className='footer__last__bottom__title footer__sm__text'>Policy</div>
                </div>
                <div className="footer__icons">
                    <FacebookIcon className='mx-2 mx-sm-0'/>
                    <InstagramIcon className='mx-2 mx-sm-0'/>
                    <TwitterIcon className='mx-2 mx-sm-0'/>
                    <MailOutlineIcon className='mx-2 mx-sm-0'/>
                </div>
            </div>
        </div>
    )
}