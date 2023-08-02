import useEnrollment from '../../../hooks/api/useEnrollment';
import styled from 'styled-components';
import useTicketTypes from '../../../hooks/api/useTicketTypes';
import TicketType, { TypeContainer } from '../../../components/TicketTypes';
import { useState } from 'react';
import AccomodationType from '../../../components/AccomodationTypes';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticketTypes } = useTicketTypes();
  const [ticketSelected, setTicketSelected ] = useState([]);
  const isLoading = !ticketTypes;
  const [showAccomodation, setShowAccomodation] = useState(false);
  const [showTotalReservation, setShowTotalReservation] = useState(false);

  const accomodationTypes = [
    {
      id: 1,
      name: 'Sem Hotel',
      price: 0
    },
    {
      id: 2,
      name: 'Com Hotel',
      price: 350
    }
  ];
  const [accomodationSelected, setAccomodationSelected ] = useState([]);

  function selectTicketType(typeId) {
    if (!ticketSelected.includes(typeId)) {
      setTicketSelected([typeId]);

      const ticket = ticketTypes.filter(t => t.id === typeId);
      if (ticket[0].name === 'Online') {
        setShowTotalReservation(true);
        setShowAccomodation(false);
      } else{
        setShowAccomodation(true);
        setShowTotalReservation(false);
      }
    } else {
      setTicketSelected([]);
      setShowTotalReservation(false);
      setShowAccomodation(false);
    }
  }

  function calculateTotalReservation() {
    let total = 0;
    if(ticketTypes && ticketSelected.length !== 0) {
      const ticket = ticketTypes.filter(t => t.id === ticketSelected[0]);
      total += ticket[0].price;
    }
    if(accomodationTypes && accomodationSelected.length !== 0) {
      const accomodation = accomodationTypes.filter(a => a.id === accomodationSelected[0]);
      total += accomodation[0].price;
    }
    return total;
  }

  function selectAccomodationType(typeId) {
    if (!accomodationSelected.includes(typeId)) {
      setAccomodationSelected([typeId]);
      setShowTotalReservation(true);
    } else {
      setAccomodationSelected([]);
      setShowTotalReservation(false);
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
      <AccomodationTypesContainer showAccomodation={showAccomodation}>
        <h1>Ótimo! Agora escolha sua modalidade de hospedagem</h1>
        <div>
          {accomodationTypes.map(a => <AccomodationType key={a.id} id={a.id} type={a.name} price={a.price}  accomodationSelected={accomodationSelected} setAccomodationSelected={setAccomodationSelected} selectAccomodationType={selectAccomodationType}/>)}
        </div>
      </AccomodationTypesContainer>
      <ReservationContainer showTotalReservation={showTotalReservation}>
        <h1>Fechado! O total ficou em <strong>R$ {ticketTypes && ticketSelected.length !== 0 ? calculateTotalReservation() : ''}</strong>. Agora é só confirmar:</h1>
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
display: ${({ showAccomodation }) => !showAccomodation && 'none'};
`;

const ReservationContainer = styled.div`
display: ${({ showTotalReservation }) => !showTotalReservation && 'none'};
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

