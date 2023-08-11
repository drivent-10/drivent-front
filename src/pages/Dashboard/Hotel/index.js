import HotelCards from '../../../components/Hotel/HotelCards';
import BookingCard from '../../../components/Hotel/BookingCard';
import { useContext, useState } from 'react';
import RoomCards from '../../../components/Hotel/RoomCards';
import BookingContext from '../../../contexts/BookingContext';
import Button from '../../../components/Form/Button';

export default function Hotel() {
  const [isBooked, setIsBooked] = useState(false);
  const { hotelId, roomId } = useContext(BookingContext);

  if (isBooked) return <BookingCard />;
  return (
    <>
      <HotelCards />
      {hotelId && <RoomCards />}
      {roomId && (
        <Button type='button' onClick={() => setIsBooked(true)}>
        Reservar Quarto
        </Button>
      )}
    </>);
}
