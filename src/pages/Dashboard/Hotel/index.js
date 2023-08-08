import HotelCards from '../../../components/Hotel/HotelCards';
import { useState } from 'react';
import RoomCards from '../../../components/Hotel/RoomCards';

export default function Hotel() {
  const [hotelId, setHotelId] = useState(null);
  return (
    <>
      <HotelCards hotelId={hotelId} setHotelId={setHotelId} />
      {hotelId && <RoomCards hotelId={hotelId} />}
    </>
  );
}
