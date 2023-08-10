import styled from 'styled-components';
import PersonIcon from './PersonIcon';
import { useContext } from 'react';
import BookingContext from '../../contexts/BookingContext';

export default function RoomCard({ id, name, capacity, availability, setActive, isActive }) {
  const { roomId, setRoomId } = useContext(BookingContext);
  const isUnavailable = availability === 0;
  let icons = Array
    .from({ length: capacity })
    .map((_, index) => (
      { key: index,
        isFilled: isUnavailable || index >= availability,
        color: isUnavailable ? '#8c8c8c': '#000' }
    ));

  let bgColor = isUnavailable ? '#E9E9E9' : '#fff';
  if (isActive) {
    icons = [...icons.slice(1), { key: icons.length, isFilled: true, color: '#FF4791' }];
    bgColor = '#FFEED2';
  }

  function selectRoom() {
    if (availability !== 0) {
      setRoomId(id);
      setActive();
    }
  }

  return (
    <Card isFull={isUnavailable} bgColor={bgColor} onClick={selectRoom}>
      <p>{name}</p>
      <div>{icons.map(icon => (
        <PersonIcon key={icon.key} isFilled={icon.isFilled} color={icon.color} />
      ))}</div>
    </Card>
  );
}

const Card = styled.div`
  width: 190px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid #cecece;
  padding: 0 10px 0 16px;
  background: ${({ bgColor }) => bgColor};

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    cursor: ${({ isFull }) => (isFull ? 'not-allowed' : 'pointer')};
    box-shadow: ${({ isFull }) => (isFull ? '0' : '0 2px 10px 3px rgba(0, 0, 0, 0.2)')};
  }

  p {
    color: ${({ isFull }) => (isFull ? '#9D9D9D' : '#454545')};
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
  }
`;
