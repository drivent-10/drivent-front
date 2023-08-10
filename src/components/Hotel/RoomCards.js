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
  const [activeRoom, setActiveRoom] = useState(null);
  const setActiveForNthChild = (nth) => () => setActiveRoom(nth);
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
        {rooms?.map((r, idx) => (
          <RoomCard key={r.id} {...r} setActive={setActiveForNthChild(idx)} isActive={activeRoom === idx}  />
        ))}
      </Rooms>
    </>
  );
}

const Rooms = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 17px;
  margin: 33px 0 46px;
`;
