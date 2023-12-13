import { useBlackoutInfo, useListingInfo, useUserInfo, useUserDataById } from '../api/fetch'
import { formatName, formatDate } from '../utils/formatters';
const API = process.env.REACT_APP_API_URL;


export default function OrderConfirmation({bookingData}) {
  const blackoutInfo = useBlackoutInfo(bookingData.blackoutdate_id, API);
  const listingInfo = useListingInfo(bookingData.listing_id, API)
  const userInfo  = useUserInfo()

  const hostId = listingInfo ? listingInfo.host : null;
  const hostInfo = useUserDataById(hostId, API)

  const startDate = blackoutInfo ? blackoutInfo.start_date : '';
  const endDate = blackoutInfo ? blackoutInfo.end_date : '';

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  const { 
      type: listingType = '',
      street = '',
      city = '',
      state = '',
      zip = ''
  } = listingInfo || {};

  const {
    first_name ='',
    last_name = '',
    email = '',
    phone =''
  } = hostInfo || {};

  return (
    <div className="mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
      <div className="bg-white shadow-md rounded px-8 py-6 flex">
        {/* Left side  */}
        <div className="w-1/2 pr-4">
          <h3 className="text-xl font-bold mb-3 text-green-800">✅ Booking Confirmed!</h3>
          <div className="mb-4">
            <p>Name: {formatName(userInfo.first_name)} {formatName(userInfo.last_name)}</p>
            <p>Email: {userInfo.email}</p>
            <p>Booking Date: {formattedStartDate} - {formattedEndDate}</p>
            {/* Add more user details as needed */}
          </div>
          <div className="flex items-center mt-4">
            <a href="/" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back to Home</a>
            {/* <a href="/" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</a> */}
            {/* Add more actions or buttons here */}
          </div>
        </div>

        {/* Right side */}
        <div className="w-1/2 pl-4">
          <div className="mb-4">
            <h2 className='font-bold'>Host Details</h2>
            <p>Name: {formatName(first_name)} {formatName(last_name)}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            {listingInfo && (
              <div className="border border-gray-300 rounded p-4 max-w-xs">
                <h2 className="text-lg font-semibold mb-2">{listingType}</h2>
                <p>{street}</p>
                <p>{city}, {state}, {zip}</p>
                {/* Add more host details as needed */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
