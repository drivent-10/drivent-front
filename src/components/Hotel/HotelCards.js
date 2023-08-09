import HotelCard from './HotelCard';
import styled from 'styled-components';
import { Subtitle } from '../Subtitle';
import useHotel from '../../hooks/api/useHotel';
import { useEffect } from 'react';
import { useState } from 'react';
import useRoom from '../../hooks/api/useRoom';
import Notice from '../Notice';

export default function HotelCards() {
  const { hotel, hotelError } = useHotel();
  const [hotels, setHotels] = useState();
  const [message, setMessage] = useState();
  useEffect(() => {
    if (hotel) {
      setHotels(hotel);
    }
    if (hotelError) {
      if (hotelError.response.data === 'Not Found') {
        setMessage('Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso');
      }
      else if (hotelError.response.data.type === 'unpaid') {
        setMessage('Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem');
      }
      else if (hotelError.response.data.type === 'unavailable') {
        setMessage('Sua modalidade de ingresso não inclui hospedagem, prossiga para a escolha de atividades');
      }
    }
  }, [hotel, hotelError]);

  return (
    <>
      {hotelError ? (
        <Notice>{message}</Notice>
      ) : (
        <>
          <Subtitle>Primeiro, escolha seu hotel</Subtitle>
          <Hotels>
            {hotels?.map((h) => (
              <HotelCard key={h.id} {...h} />
            ))}
          </Hotels>
        </>
      )}
    </>
  );
}

const Hotels = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 19px;
  margin: 18px 0 52px;
`;
