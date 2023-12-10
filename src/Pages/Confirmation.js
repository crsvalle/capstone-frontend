import { useLocation } from 'react-router-dom';
import OrderConfirmation from '../Components/OrderConfirmation';


export default function Confirmation() {
    const location = useLocation();
    const { bookingData } = location.state || {};
  
    return (
        <div>
            {!bookingData ? "Nothing here" :
            <OrderConfirmation bookingData={bookingData}/>
            }
        </div>
    );
}
