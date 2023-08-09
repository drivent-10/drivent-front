import { createContext, useState } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [roomId, setRoomId] = useState(null);
  const [hotelId, setHotelId] = useState(null);

  return <BookingContext.Provider value={{ roomId, setRoomId, hotelId, setHotelId }}>{children}</BookingContext.Provider>;
}

export default BookingContext;
