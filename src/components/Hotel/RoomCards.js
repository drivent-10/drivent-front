import { Subtitle } from '../Subtitle';
import styled from 'styled-components';
import RoomCard from './RoomCard';
import { useContext, useEffect, useState } from 'react';
import useRoom from '../../hooks/api/useRoom';
import BookingContext from '../../contexts/BookingContext';

export default function RoomCards() {
  const { getRoom } = useRoom();
  const { hotelId } = useContext(BookingContext);
  const [rooms, setRooms] = useState();

  useEffect(() => {
    (async() => {
      const room = await getRoom(hotelId);
      setRooms(room);
    })();
  }, [hotelId]);

  return (
    <>
      <Subtitle>Ótima pedida! Agora escolha seu quarto:</Subtitle>
      <Rooms>
        {rooms?.map((r) => (
          <RoomCard key={r.id} {...r} />
        ))}
      </Rooms>
    </>
  );
}

const Rooms = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 17px;
  margin-top: 33px;
`;
