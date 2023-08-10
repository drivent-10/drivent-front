import HotelCards from '../../../components/Hotel/HotelCards';
import { useContext, useState } from 'react';
import RoomCards from '../../../components/Hotel/RoomCards';
import BookingContext from '../../../contexts/BookingContext';
import Button from '../../../components/Form/Button';
import useSaveEnrollment from '../../../hooks/api/useSaveEnrollment';
import useSaveBooking from '../../../hooks/api/useSaveBooking';

export default function Hotel() {
  const { hotelId, roomId } = useContext(BookingContext);
  const { saveBookingLoading, saveBooking } = useSaveBooking();
  function bookRoom() {
    saveBooking({ roomId });
  }
  return (
    <>
      <HotelCards />
      {hotelId && <RoomCards />}
      {roomId && (
        <Button type="button" onClick={bookRoom}>
          Reservar Quarto
        </Button>
      )}
    </>
  );
}
