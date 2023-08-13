import HotelCards from '../../../components/Hotel/HotelCards';
import BookingCard from '../../../components/Hotel/BookingCard';
import { useContext, useState } from 'react';
import RoomCards from '../../../components/Hotel/RoomCards';
import BookingContext from '../../../contexts/BookingContext';
import Button from '../../../components/Form/Button';
import useSaveBooking from '../../../hooks/api/useSaveBooking';

export default function Hotel() {
  const [isBooked, setIsBooked] = useState(false);
  const { hotelId, roomId } = useContext(BookingContext);
  const { saveBooking } = useSaveBooking();

  function bookRoom() {
    saveBooking({ roomId });
    setIsBooked(true);
  }

  if (isBooked) return <BookingCard />;
  return (
    <>
      <HotelCards />
      {hotelId && <RoomCards />}
      {roomId && (
        <Button type='button' onClick={bookRoom}>
        Reservar Quarto
        </Button>
      )}
    </>);
}
