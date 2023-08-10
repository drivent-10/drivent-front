import HotelCards from '../../../components/Hotel/HotelCards';
import { useContext, useState } from 'react';
import RoomCards from '../../../components/Hotel/RoomCards';
import BookingContext from '../../../contexts/BookingContext';
import Button from '../../../components/Form/Button';

export default function Hotel() {
  const { hotelId, roomId } = useContext(BookingContext);
  return (
    <>
      <HotelCards />
      {hotelId && <RoomCards />}
      {roomId && (
        <Button type="button">
          Reservar Quarto
        </Button>
      )}
    </>
  );
}
