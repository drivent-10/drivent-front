import { useContext } from 'react';
import BookingContext from '../../contexts/BookingContext';
import { Card } from './Card';

export default function HotelCard({ id, name, accommodationType, availability, image }) {
  const { hotelId, setHotelId } = useContext(BookingContext);

  function selectHotel() {
    setHotelId(id);
  }
  return (
    <Card isActive={id === hotelId} onClick={selectHotel} hover={true}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <div>
        <h4>Tipos de acomodação:</h4>
        <p>{accommodationType}</p>
      </div>
      <div>
        <h4>Vagas disponíveis:</h4>
        <p>{availability}</p>
      </div>
    </Card>
  );
}
