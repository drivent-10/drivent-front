import { Subtitle } from '../Subtitle';
import { rooms } from '../../mocks/hotel.mock';
import styled from 'styled-components';
import RoomCard from './RoomCard';

export default function RoomCards({ roomId, setRoomId }) {
  // TODO: get data from API
  return (
    <>
      <Subtitle>Ótima pedida! Agora escolha seu quarto:</Subtitle>
      <Rooms>
        {rooms.map((r) => (
          <RoomCard key={r.id} {...r} roomId={roomId} setRoomId={setRoomId} />
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
