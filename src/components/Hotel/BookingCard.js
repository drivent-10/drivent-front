import { useContext, useEffect, useState } from 'react';
import BookingContext from '../../contexts/BookingContext';
import { Card } from './Card';
import useBooking from '../../hooks/api/useBooking';
import Loader from 'react-loader-spinner';

export default function BookingCard() {
  const [bookingData, setBookingData] = useState(null);
  const { booking } = useBooking();

  useEffect(() => {
    if (booking) {
      setBookingData(booking);
    }
  }, [booking]);

  if (bookingData === null)
    return <Loader type="Rings" />;

  const { hotelName, hotelImage, roomNumber, roomSize, roomMessage } = bookingData;
  return (
    <Card isActive={true} hover={false}>
      <img src={hotelImage} alt={hotelName} />
      <h3>{hotelName}</h3>
      <div>
        <h4>Quarto reservado</h4>
        <p>{`${roomNumber} (${roomSize})`}</p>
      </div>
      <div>
        <h4>Pessoas no seu quarto</h4>
        <p>{roomMessage}</p>
      </div>
    </Card>
  );
}
