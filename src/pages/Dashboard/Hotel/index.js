import HotelCards from '../../../components/Hotel/HotelCards';
import { useState } from 'react';

export default function Hotel() {
  const [hotel, setHotel] = useState(null);
  return (
    <>
      <HotelCards hotel={hotel} setHotel={setHotel} />
    </>
  );
}
