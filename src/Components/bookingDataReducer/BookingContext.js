import { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext();

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKING_DATA':
      return { ...state, bookingData: action.payload };
    default:
      return state;
  }
};

const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, { bookingData: null });

  const setBookingData = (data) => {
    dispatch({ type: 'SET_BOOKING_DATA', payload: data });
  };

  return (
    <BookingContext.Provider value={{ state, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};

const useBookingContext = () => {
  return useContext(BookingContext);
};

export { BookingProvider, useBookingContext };
