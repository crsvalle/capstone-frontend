import '../style/Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function Footer (){
    return (
        <>
            <hr/>
            <div className="footer__container">
                <div>
                    <div>Support</div>
                    <div>Help Center</div>
                    <div>FAQ</div>
                    <div>Report</div>
                </div>
                <div>
                    <div>Keepsake</div>
                    <div>Become</div>
                    <div>Carrers</div>
                    <div>Keepsake</div>
                </div>
            </div>
            <hr className='hr__second' />
            <div className="footer__last">
                <div className="footer__last__bottom">
                    <div className='footer__last__bottom__title'>© KEEPSAKE</div>
                    <div className='footer__last__bottom__title'>Terms</div>
                    <div className='footer__last__bottom__title'>Policy</div>
                </div>
                <div className="footer__icons">
                    <FacebookIcon/>
                    <InstagramIcon/>
                    <TwitterIcon/>
                    <MailOutlineIcon/>
                </div>
            </div>
        </>
    )
}