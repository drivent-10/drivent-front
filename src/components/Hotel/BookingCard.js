import { useContext, useEffect, useState } from 'react';
import BookingContext from '../../contexts/BookingContext';
import { Card } from './Card';
import useBooking from '../../hooks/api/useBooking';

export default function BookingCard() {
  const { bookingData } = useContext(BookingContext);
  const { hotelName, hotelImage, roomNumber, roomSize, roomMessage } = bookingData;
  return (
    <Card isActive={true}>
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
