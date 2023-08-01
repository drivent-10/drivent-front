import { hotels } from '../../mocks/hotel.mock';
import HotelCard from './HotelCard';
import styled from 'styled-components';

export default function HotelCards({ hotel, setHotel }) {
  // TODO: get data from API
  return (
    <Hotels>
      {hotels.map((h) => (
        <HotelCard key={h.id} {...h} hotel={hotel} setHotel={setHotel} />
      ))}
    </Hotels>
  );
}

const Hotels = styled.ul`
  display: flex;
  gap: 19px;
`;
