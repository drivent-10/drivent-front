import { createContext, useState } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookingData, setBookingData] = useState({ hotelId: null, roomId: null });

  return <BookingContext.Provider value={{ bookingData, setBookingData }}>{children}</BookingContext.Provider>;
}

export default BookingContext;
