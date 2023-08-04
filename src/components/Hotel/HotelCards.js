import HotelCard from './HotelCard';
import styled from 'styled-components';
import { Subtitle } from '../Subtitle';
import useHotel from '../../hooks/api/useHotel';
import { useEffect } from 'react';
import { useState } from 'react';

export default function HotelCards({ hotelId, setHotelId }) {
  // TODO: get data from API
  const { hotel } = useHotel();
  const [hotels, setHotels] = useState();

  useEffect(() => {
    if (hotel) {
      setHotels(hotel);
      console.log(hotel);
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
