import useEnrollment from '../../../hooks/api/useEnrollment';
import styled from 'styled-components';
import useTicketTypes from '../../../hooks/api/useTicketTypes';
import TicketType, { TypeContainer } from '../../../components/TicketTypes';
import AccomodationType from '../../../components/AccomodationTypes';
import { Title } from '../../../components/Title';
import { useEffect, useState } from 'react';
import chipUrl from '../../../assets/images/chip.svg';
import check from '../../../assets/images/check.jpg';
export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticketTypes } = useTicketTypes();
  const [ticketSelected, setTicketSelected ] = useState([]);
  const isLoading = !ticketTypes;
  const [showAccomodation, setShowAccomodation] = useState(false);
  const [showTotalReservation, setShowTotalReservation] = useState(false);
  const [showTicketContainer, setShowTicketContainer] = useState(true);
  const [showPaymentContainer, setShowPaymentContainer] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

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

  function bookTicket() {
    setShowTicketContainer(false);
    setShowPaymentContainer(true);
  }

  return (!enrollment ? 
    <NoticeContainer>
      Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso 
    </NoticeContainer>
    : 
    <>
      <TicketContainer showTicketContainer={showTicketContainer}>
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
          <button onClick={bookTicket}>RESERVAR INGRESSO</button>
        </ReservationContainer>
      </TicketContainer>
      <PaymentContainer showPaymentContainer={showPaymentContainer}>
        <Subtitle>Ingresso Escolhido</Subtitle>
        <InfoCard text={ticketTypes && ticketSelected.length !== 0 ? (ticketTypes.filter(t => t.id === ticketSelected[0]))[0].name : ''} price={ticketTypes && ticketSelected.length !== 0 ? calculateTotalReservation() : ''} isSelected width="290px" height="108px" />
        <Subtitle>Pagamento</Subtitle>
        {!isPaid ? <CreditCardFormContainer>
          <CreditCard numbers="121212312312388" />
        </CreditCardFormContainer> :
          <PaymentConfirmationContainer>
            <img src={check} alt="confirmed!!" />
            <div>
              <p>Pagamento confirmado!</p>
              <p>Prossiga para escolha de hospedagem e atividades</p>
            </div>
          </PaymentConfirmationContainer>}
        <AppButton>finalizar compra</AppButton>
      </PaymentContainer>
    </>
  );
}
const PaymentConfirmationContainer = styled.div`
display:flex;
align-items:center;
img{
  display:block;
  width:40px;
  height:40px;
}
div {
  display:flex;
  flex-direction:column;
  align-items:start;
  margin-left:14px;
  p:first-child{
    font-weight:700;
  }
  p{
    color: #454545;
    font-weight:400;
    font-size:16px;
    line-height:18.75px;
  }
}
`;
const PaymentContainer = styled.div`
display: ${({ showPaymentContainer }) => !showPaymentContainer && 'none'};
`;

const TicketContainer = styled.div`
display: ${({ showTicketContainer }) => !showTicketContainer && 'none'};
`;

function AppButton({ children }) {
  return <StyledButton>{children}</StyledButton>;
}
const StyledButton = styled.button`
padding: ${({ padding }) => padding ? padding : '10px 13px'};
font-size:14px;
text-align:center;
text-transform:uppercase;
margin-top: 50px;
color:black;
border: none;
background-color:#E0E0E0;
box-shadow: drop-shadow(0px 2px 10px black);
border-radius:4px;
:hover{
  background-color:#CCC;
}
`;

const CreditCardSectionContainer = styled.form`
  
`;
function CreditCard({ numbers, name = 'Eduardo S Santos', date = '-' }) {
  const unknownNumbers = new Array(16).fill(<UnknownNumber />);
  const unknowMonth = new Array(2).fill(<UnknownNumber />);
  const unknownYear = new Array(2).fill(<UnknownNumber />);
  const [creditCardNumber, setCreditCardNumbers] = useState(() => unknownNumbers);
  const [creditCardName, setCreditCardName] = useState('');
  const [creditCardDate, setCreditCardDate] = useState(() => unknowMonth / unknowMonth);
  useEffect(() => {
    const writtenNumbers = numbers.slice(0, 16);
    const [month, year] = date.split('-');
    const unknowCardNumberRest = unknownNumbers.slice(numbers.length - 1, 16);
    const unknowMonthRest = !month?unknowMonth:unknowMonth.slice(month.length - 1, 1);
    const unknowYearRest = !year?unknownYear:unknownYear.slice(year.length - 1, 1);
    // new Array(5 - creditCardDate.lenght).map((item, i) => i === 2 ? (<span>/</span>) :( <UnknownNumber />))

    setCreditCardNumbers(prev => [...writtenNumbers, ...unknowCardNumberRest]);
    setCreditCardDate(prev => [...month, ...unknowMonthRest, '/', ...year, ...unknowYearRest]);
    setCreditCardName(prev => name);
  }, [numbers, name, date]);
  return (<CreditCardContainer>
    <Chip src={chipUrl} alt="chip" />
    <CreditCardNumbersContainer>
      <span>{creditCardNumber.slice(0, 4)}</span>
      <span>{creditCardNumber.slice(4, 8)}</span>
      <span>{creditCardNumber.slice(8, 12)}</span>
      <span>{creditCardNumber.slice(12, 16)} </span>
    </CreditCardNumbersContainer>
    <CardName>{creditCardName}</CardName>
    <CardDateTitle>valid thru</CardDateTitle>
    <CardDate>{<>
      {creditCardDate}
    </>}</CardDate>
  </CreditCardContainer>);
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

const CardDateTitle = styled.div`
  position:absolute;
  display:inline-block;
  bottom: 55px;
  right: 25px;
  color:#c9c9c9;
  font-size:10px;
`;
const CardDate = styled.div`
  position:absolute;
  bottom: 35px;
  right: 25px;
  color:#c9c9c9;
  
  font-size:14px;
`;
const CardName = styled.div`
  position:absolute;
  bottom: 35px;
  left: 25px;
  color:#c9c9c9;
`;
const Chip = styled.img`
position: absolute;
top:23px;
left:30px;
width:35px;
height:26px;
`;
// function CreditCardNumbers() {
//   // const [numbers, setNumbers] = useState(() => new Uint8Array(16).fill('•'))
//   return (<CreditCardNumbersContainer>{userCardNumber}
//   </CreditCardNumbersContainer>);
// }
function CardNumber({ children }) {
  return <span>{children}</span>;
}
const UnknownNumber = styled.div`
display:inline-block;
border-radius:50%;
width:6px;
height:6px;
margin: 0 2px 2px 2px;
background-color:white;
`;
const CreditCardContainer = styled.div`
width:290px;
height:170px;
background-color: rgb(146,146,146);
border-radius:20px;
position:relative;
`;
const CreditCardNumbersContainer = styled.p`
color: white;
height:100%;
width:100%;
display: flex;
align-items:center;
justify-content:space-evenly;
span {
  /* margin-left:10px; */
  letter-spacing:1px;

}
`;
const CreditCardFormContainer = styled.form`

`;

export function InfoCard({ text, price, width, height, isSelected = false }) {
  return (
    <InfoCardContainer isSelected={isSelected} width={width} height={height}>
      <p>{text}</p>
      <p>{price}</p>
    </InfoCardContainer>);
}
const InfoCardContainer = styled.section`
  width: 290px;
  height: 108px;
  border-radius: 20px;
  background-color:${({ isSelected }) => (isSelected ? '#FFEED2' : 'transparent')};
  border:${({ isSelected }) => (isSelected ? '1px solid transparent' : '1px solid #CECECE')};
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  flex-wrap:wrap;
  margin-bottom:30px;
  p:first-child {
    font-size:16px;
    color: #454545;
  }
  p{
    font-size:14px;
    color: #898989;
    margin-top: 8px;
  }
`;
const Subtitle = styled.h5`
font-size: 20px;
color: #8e8e8e;
margin:17px 0;
`;

