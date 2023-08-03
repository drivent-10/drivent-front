import styled from 'styled-components';
import { Title } from '../../../components/Title';
import { useEffect, useState } from 'react';
import chipUrl from '../../../assets/images/chip.svg';
import Input from '../../../components/Form/Input';

export default function Payment() {
  const [date, setDate] = useState(''); 
  const [cvc, setCvc] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [name, setName] = useState('');
  return (
    <>
      <Subtitle>Ingresso Escolhido</Subtitle>
      <InfoCard text="Online" price="R$ 100" isSelected width="290px" height="108px" />
      <Subtitle>Pagamento</Subtitle>
      <CreditCardFormContainer>
        <CreditCard numbers={creditCardNumber.replace(/\s/g, '')} name={name} date={date} />
        <CreditCardSectionContainer>
          <Input label="Card Number" mask='9999 9999 9999 9999' value={ creditCardNumber } onChange={ e => setCreditCardNumber( e.target.value ) }/>
          <p>E.g.: 49..., 51..., 36..., 37...</p>
          <Input label="Name" value={ name } onChange={ e => setName( e.target.value ) }/>
          <div>
            <InputValidThru label="Valid Thru" mask='99/99' value={ date } onChange={ e => setDate( e.target.value ) }/>
            <InputCvc label="CVC" mask='999' value={ cvc } onChange={ e => setCvc( e.target.value ) }/>
          </div>
        </CreditCardSectionContainer>
      </CreditCardFormContainer>
      <AppButton>finalizar compra</AppButton>
    </>);
}
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
  display: flex;
  flex-direction: column;
  width: 300px;
  label{
    top: -5px !important;
  }
  label:focus{
      top:5px !important;
    }
  div{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  input{
    height: 5px;
  }
  p{
    margin-top: 5px;
    color:#c9c9c9;
  }
`;

const InputValidThru = styled(Input)`
  width: 180px !important;
`;

const InputCvc = styled(Input)`
  width: 100px !important;
`;
function CreditCard({ numbers, name = 'Eduardo S Santos', date }) {
  const unknownNumbers = new Array(16).fill(<UnknownNumber />);
  const unknowMonth = new Array(2).fill(<UnknownNumber />);
  const unknownYear = new Array(2).fill(<UnknownNumber />);
  const [creditCardNumber, setCreditCardNumbers] = useState(() => unknownNumbers);
  const [creditCardName, setCreditCardName] = useState('');
  const [creditCardDate, setCreditCardDate] = useState(() => unknowMonth, unknowMonth);
  useEffect(() => {
    const writtenNumbers = numbers.slice(0, 16);
    const [month, year] = date.split('/');
    const unknowCardNumberRest = numbers.length===0?unknownNumbers:unknownNumbers.slice(numbers.length - 1, 16);
    const unknowMonthRest = !month?unknowMonth:unknowMonth.slice(month.length - 1, 1);
    const unknowYearRest = !year?unknownYear:unknownYear.slice(year.length - 1, 1);

    setCreditCardNumbers(prev => [...writtenNumbers, ...unknowCardNumberRest]);
    setCreditCardDate(prev => [...month, ...unknowMonthRest, '/', year, ...unknowYearRest]);
    setCreditCardName(prev => name.length===0?'YOUR NAME HERE':name.toUpperCase());
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
margin-right: 30px;
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
  display: flex;
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

