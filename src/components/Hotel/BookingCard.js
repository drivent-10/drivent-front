import { useContext, useEffect, useState } from 'react';
import BookingContext from '../../contexts/BookingContext';
import { Card } from './Card';
import useBooking from '../../hooks/api/useBooking';

export default function BookingCard() {
  const [bookingData, setBookingData] = useState(null);
  const { booking } = useBooking();

  useEffect(() => {
    (async() => {
      if (booking) {
        setBookingData(booking);
        console.log(booking);
      }
    })();
  }, [booking]);

  return (
    <Card isActive={true}>
      {/* <img src={image} alt={name} />
      <h3>{name}</h3>
      <div>
        <h4>Quarto reservado</h4>
        <p>{accommodationType}</p>
      </div>
      <div>
        <h4>Pessoas no seu quarto</h4>
        <p>{availability}</p>
      </div>*/}
    </Card>
  );
}
