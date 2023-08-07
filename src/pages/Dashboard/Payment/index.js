import useEnrollment from '../../../hooks/api/useEnrollment';
import styled from 'styled-components';
import useTicketTypes from '../../../hooks/api/useTicketTypes';
import TicketType from '../../../components/TicketTypes';
import AccomodationType from '../../../components/AccomodationTypes';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useSaveTicket from '../../../hooks/api/useSaveTicket';
import useSavePayment from '../../../hooks/api/useSavePayment';
import useTicket from '../../../hooks/api/useTicket';
import FormValidations from '../../../components/Payments/FormValidations';
import { useForm } from '../../../hooks/useForm';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Form/Button';
import Notice from '../../../components/Notice';
import Loader from 'react-loader-spinner';
import { CreditCardForm } from '../../../components/Payments/CreditCardForm';
import { PaymentConfirmation } from '../../../components/Payments/PaymentConfirmation';
import { InfoCard } from '../../../components/TicketTypes/InfoCard';
export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticketTypes } = useTicketTypes();
  const [ticketSelected, setTicketSelected] = useState([]);
  const isLoading = !ticketTypes;
  const [showAccomodation, setShowAccomodation] = useState(false);
  const [showTotalReservation, setShowTotalReservation] = useState(false);
  const [showTicketContainer, setShowTicketContainer] = useState(true);
  const [showPaymentContainer, setShowPaymentContainer] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { saveTicketLoading, saveTicket, ticketSaved } = useSaveTicket();
  const { ticket, getTicket } = useTicket();
  const [ticketChoosed, setTicketChoosed] = useState('');
  const [priceTicketChoosed, setPriceTicketChoosed] = useState('');
  const [{ token }] = useLocalStorage('userData');
  const navigate = useNavigate();
  const { savePaymentLoading, savePayment } = useSavePayment();
  const {
    handleSubmit,
    handleChange,
    data,
    errors,
  } = useForm({
    validations: FormValidations,

    onSubmit: async(data) => {
      const newData = {
        name: data.creditCardName,
        number: data.creditCardNumber.replaceAll(' ', ''),
        expirationDate: data.creditCardDate.replace('/', '-'),
        cvv: data.creditCardCvc,
      };
    
      try {
        await savePayment({ ticketId: ticket?.id ? ticket.id : ticketSaved.id, cardData: newData }, token);
        toast('Informações salvas com sucesso!');
        setIsPaid(true);
        setTimeout(() => navigate('/dashboard/hotel'), 5000);
      } catch (err) {
        toast('Não foi possível salvar suas informações!');
      }
    },

    initialValues: {
      creditCardNumber: '',
      creditCardDate: '',
      creditCardName: '',
      creditCardCvc: ''
    },
  });

  useEffect(async() => {
    try {
      // const ticket = await getTicket();
      if (ticket.TicketType.includesHotel) {
        setTicketChoosed(ticket.TicketType.name + ' + Com Hotel');
      } else {
        setTicketChoosed(ticket.TicketType.name);
      }
      setPriceTicketChoosed(ticket.TicketType.price);
      setShowTicketContainer(false);
      setShowPaymentContainer(true);
      if(ticket.status ==='PAID') {
        setIsPaid(() => true);
      }
    } catch (err) {
      console.log('Usuário não tem ingresso reservado!');
    }
  }, [ticket]);

  const accomodationTypes = [
    {
      id: 1,
      name: 'Sem Hotel',
      price: 0,
      includesHotel: false,
    },
    {
      id: 2,
      name: 'Com Hotel',
      price: 350,
      includesHotel: true,
    },
  ];
  const [accomodationSelected, setAccomodationSelected] = useState([]);

  function selectTicketType(typeId) {
    if (!ticketSelected.includes(typeId)) {
      setTicketSelected([typeId]);

      const ticket = ticketTypes.filter((t) => t.id === typeId);
      if (ticket[0].name === 'Online') {
        setShowTotalReservation(true);
        setShowAccomodation(false);
      } else {
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
    if (ticketTypes && ticketSelected.length !== 0) {
      const ticket = ticketTypes.filter((t) => t.id === ticketSelected[0]);
      total += ticket[0].price;
    }
    if (accomodationTypes && accomodationSelected.length !== 0) {
      const accomodation = accomodationTypes.filter((a) => a.id === accomodationSelected[0]);
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

  async function bookTicket(ticketSelected, accomodationSelected) {
    let ticketTypeId = ticketSelected[0];

    if (accomodationSelected.length !== 0) {
      const accomodation = accomodationTypes.filter((a) => a.id === accomodationSelected[0]);
      const ticketType = ticketTypes.filter(
        (t) => t.name !== 'Online' && t.includesHotel === accomodation[0].includesHotel
      );
      ticketTypeId = ticketType[0].id;
    }

    const obj = { ticketTypeId };
  
    try {
      await saveTicket(obj);
      toast('Ingresso reservado com sucesso!');
      setShowTicketContainer(false);
      setShowPaymentContainer(true);
    } catch (err) {
      toast('Não foi possível reservar o ingresso!');
    }
  }

  function infoCardText() {
    let name;
    if (ticketTypes && ticketSelected.length !== 0) {
      if (accomodationSelected.length !== 0) {
        const accomodation = accomodationTypes.filter((a) => a.id === accomodationSelected[0]);

        if (accomodation[0].includesHotel) {
          name = 'Presencial + Com Hotel';
        } else {
          name = 'Presencial';
        }
      } else {
        name = 'Online';
      }
    } else {
      name = ticketChoosed;
    }
    return name;
  }

  return !enrollment ? (
    <Notice>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Notice>
  ) : (
    <>
      <TicketContainer showTicketContainer={showTicketContainer}>
        <TicketTypesContainer>
          <h1>Primeiro, escolha sua modalidade de ingresso</h1>
          {isLoading ? (
            <Spinner color="#454545" height={40} width={40} type="Oval" />
          ) : (
            <div>
              {ticketTypes
                .filter((t) => t.includesHotel === false)
                .map((t) => (
                  <TicketType
                    key={t.id}
                    id={t.id}
                    type={t.name}
                    price={t.price}
                    isRemote={t.isRemote}
                    includesHotel={t.includesHotel}
                    ticketSelected={ticketSelected}
                    setTicketSelected={setTicketSelected}
                    selectTicketType={selectTicketType}
                  />
                ))}
            </div>
          )}
        </TicketTypesContainer>
        <AccomodationTypesContainer showAccomodation={showAccomodation}>
          <h1>Ótimo! Agora escolha sua modalidade de hospedagem</h1>
          <div>
            {accomodationTypes.map((a) => (
              <AccomodationType
                key={a.id}
                id={a.id}
                type={a.name}
                price={a.price}
                accomodationSelected={accomodationSelected}
                setAccomodationSelected={setAccomodationSelected}
                selectAccomodationType={selectAccomodationType}
              />
            ))}
          </div>
        </AccomodationTypesContainer>
        <ReservationContainer showTotalReservation={showTotalReservation}>
          <h1>
            Fechado! O total ficou em{' '}
            <strong>R$ {ticketTypes && ticketSelected.length !== 0 ? calculateTotalReservation() : ''}</strong>. Agora é
            só confirmar:
          </h1>
          <button onClick={() => bookTicket(ticketSelected, accomodationSelected)}>RESERVAR INGRESSO</button>
        </ReservationContainer>
      </TicketContainer>
      {savePaymentLoading ? 
        <Spinner color="#454545" height={40} width={40} type="Oval" /> :
        (<PaymentContainer onSubmit={handleSubmit} showPaymentContainer={showPaymentContainer}>
          <Subtitle>Ingresso Escolhido</Subtitle>
          <InfoCard
            text={infoCardText()}
            price={ticketTypes && ticketSelected.length !== 0 ? calculateTotalReservation() : priceTicketChoosed}
            isSelected
            width="290px"
            height="108px"
          />
          <Subtitle>Pagamento</Subtitle>
          {!isPaid ? ( <CreditCardForm data={data} errors={errors} handleChange={handleChange}/>) : <PaymentConfirmation />}
          {!isPaid &&  <AppButton onClick={handleSubmit}>finalizar compra</AppButton>}
        </PaymentContainer>)}
    </>
  );
}

const PaymentContainer = styled.form`
display: ${({ showPaymentContainer }) => !showPaymentContainer && 'none'};

`;

const TicketContainer = styled.div`
  display: ${({ showTicketContainer }) => !showTicketContainer && 'none'};
`;
const Spinner = styled(Loader)`
  position:fixed;
  top: calc(50% - 30px);
  left:calc(50% - 30px);
`;
const AppButton = styled(Button)`
padding: ${({ padding }) => padding ? padding : '10px 13px'};
font-size:14px;
text-align:center;
text-transform:uppercase;
margin-top: 50px !important;
color:black;
border: none;
background-color:#E0E0E0;
box-shadow: drop-shadow(0px 2px 10px black);
border-radius:4px;
cursor:pointer;
:hover{
  background-color:#CCC;
}

`;

const TicketTypesContainer = styled.div`
  margin-bottom: 25px;
  h1 {
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    color: #8e8e8e;
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
const Subtitle = styled.h5`
font-size: 20px;
color: #8e8e8e;
margin: 17px 0;
`;

const ReservationContainer = styled.div`
  display: ${({ showTotalReservation }) => !showTotalReservation && 'none'};
  font-weight: 400;
  h1 {
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
  }
  button {
    margin-top: 8px;
    width: 170px;
    height: 37px;
    border: none;
    border-radius: 4px;
    background-color: #dddddd;
    text-align: center;
    font-size: 14px;
    line-height: 14px;
    color: #000000;
    box-shadow: 2px 0 10px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

