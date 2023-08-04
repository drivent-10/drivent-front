import HotelCard from './HotelCard';
import styled from 'styled-components';
import { Subtitle } from '../Subtitle';
import useHotel from '../../hooks/api/useHotel';
import { useEffect } from 'react';
import { useState } from 'react';
import useRoom from '../../hooks/api/useRoom';

export default function HotelCards({ hotelId, setHotelId }) {
  const { hotel } = useHotel();
  const [hotels, setHotels] = useState();

  useEffect(() => {
    if (hotel) {
      setHotels(hotel);
    }
  }, [hotel]);

  return (
    <>
      <Subtitle>Primeiro, escolha seu hotel</Subtitle>
      <Hotels>
        {hotels?.map((h) => (
          <HotelCard key={h.id} {...h} hotelId={hotelId} setHotelId={setHotelId} />
        ))}
      </Hotels>
    </>
  );
}

const Hotels = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 19px;
  margin: 18px 0 52px;
`;
