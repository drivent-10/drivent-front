import useEnrollment from '../../../hooks/api/useEnrollment';
import styled from 'styled-components';
import useTicketTypes from '../../../hooks/api/useTicketTypes';
import TicketType, { TypeContainer } from '../../../components/TicketTypes';
import { useState } from 'react';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticketTypes } = useTicketTypes();
  const [ticketSelected, setTicketSelected ] = useState([]);
  const isLoading = !ticketTypes;

  function selectTicketType(typeId) {
    if (!ticketSelected.includes(typeId)) {
      setTicketSelected([typeId]);
    } else {
      setTicketSelected([]);
    }
  }

  return (!enrollment ? 
    <NoticeContainer>
      Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso 
    </NoticeContainer>
    : 
    <>
      <TicketTypesContainer>
        <h1>Primeiro, escolha sua modalidade de ingresso</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>{ticketTypes.map(t => <TicketType key={t.id} id={t.id} type={t.name} price={t.price} isRemote={t.isRemote} includesHotel={t.includesHotel} ticketSelected={ticketSelected} setTicketSelected={setTicketSelected} selectTicketType={selectTicketType}/>)}</div>
        )}
      </TicketTypesContainer>
      <AccomodationTypesContainer>
        <h1>Ótimo! Agora escolha sua modalidade de hospedagem</h1>
        <div>
          <TypeContainer>
            <h2>Sem Hotel</h2>
            <h3>+ R$ 0</h3>
          </TypeContainer>
          <TypeContainer>
            <h2>Com Hotel</h2>
            <h3>+ R$ 350</h3>
          </TypeContainer>
        </div>
      </AccomodationTypesContainer>
      <ReservationContainer>
        <h1>Fechado! O total ficou em <strong>R$ 600</strong>. Agora é só confirmar:</h1>
        <button>RESERVAR INGRESSO</button>
      </ReservationContainer>
    </>
  );
}

const NoticeContainer = styled.div`
width: 388px;
margin-left: auto;
margin-right: auto;
margin-top: 250px;
font-size: 20px;
font-weight: 400;
line-height: 23px;
color: #8E8E8E;
text-align: center;
`;

const TicketTypesContainer = styled.div`
  margin-bottom: 25px;
  h1 {
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    color: #8E8E8E;
  }
  div {
    margin-top: 8px;
    display: flex;
    gap: 20px;
  }
`;

const AccomodationTypesContainer = styled(TicketTypesContainer)`
`;

const ReservationContainer = styled.div`
font-weight: 400;
  h1 {
    font-size: 20px;
    line-height: 23px;
    color: #8E8E8E;
  }
  button {
    margin-top: 8px;
    width: 170px;
    height: 37px;
    border: none;
    border-radius: 4px;
    background-color: #DDDDDD;
    text-align: center;
    font-size: 14px;
    line-height: 14px;
    color: #000000;
    box-shadow: 2px 0 10px 0 rgba(0,0,0,0.1);
    cursor:pointer;
  }
`;

