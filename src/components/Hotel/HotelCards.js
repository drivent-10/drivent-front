import { hotels } from '../../mocks/hotel.mock';
import HotelCard from './HotelCard';
import styled from 'styled-components';
import { Subtitle } from '../Subtitle';

export default function HotelCards({ hotelId, setHotelId }) {
  // TODO: get data from API
  return (
    <>
      <Subtitle>Primeiro, escolha seu hotel</Subtitle>
      <Hotels>
        {hotels.map((h) => (
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
