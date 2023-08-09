import HotelCards from '../../../components/Hotel/HotelCards';
import { useContext, useState } from 'react';
import RoomCards from '../../../components/Hotel/RoomCards';
import BookingContext from '../../../contexts/BookingContext';

export default function Hotel() {
  const { hotelId } = useContext(BookingContext);
  return (
    <>
      <HotelCards />
      {hotelId && <RoomCards />}
    </>
  );
}
