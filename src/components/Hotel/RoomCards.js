import { Subtitle } from '../Subtitle';
import styled from 'styled-components';
import RoomCard from './RoomCard';
import { useEffect, useState } from 'react';
import useRoom from '../../hooks/api/useRoom';
import { getRoomApi } from '../../services/roomApi';

export default function RoomCards({ hotelId }) {
  const { getRoom } = useRoom();
  const [rooms, setRooms] = useState();

  useEffect(() => {
    const fetchRooms = async() => {
      const room = await getRoom(hotelId);
      setRooms(room);
    };
    fetchRooms();
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
