import { createContext, useState } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [roomId, setRoomId] = useState(null);
  const [hotelId, setHotelId] = useState(null);
  const [bookingData, setBookingData] = useState({ hotelName: null, hotelImage: null, roomNumber: null, roomSize: null, roomMessage: null });

  return (
    <BookingContext.Provider value={{ roomId, setRoomId, hotelId, setHotelId, bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}

export default BookingContext;
