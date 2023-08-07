import { useEffect, useState } from 'react';
import styled from 'styled-components';
import chipUrl from '../../assets/images/chip.svg';
export function CreditCard({ numbers, name, date }) {
  const unknownNumbers = new Array(16).fill(<UnknownNumber />);
  const unknowMonth = new Array(2).fill(<UnknownNumber />);
  const unknownYear = new Array(2).fill(<UnknownNumber />);
  const [creditCardNumber, setCreditCardNumbers] = useState(() => unknownNumbers);
  const [creditCardName, setCreditCardName] = useState('YOUR NAME HERE');
  const [creditCardDate, setCreditCardDate] = useState(() => [unknowMonth, unknownYear]);
  useEffect(() => {
    const writtenNumbers = numbers.slice(0, 16);
    const [month, year] = date.split('/');
    const unknowCardNumberRest = numbers.length === 0 ? unknownNumbers : unknownNumbers.slice(numbers.length - 1, 16);
    const unknowMonthRest = !month ? unknowMonth : unknowMonth.slice(month.length - 1, 1);
    const unknowYearRest = !year ? unknownYear : unknownYear.slice(year.length - 1, 1);
  
    setCreditCardNumbers(prev => [...writtenNumbers, ...unknowCardNumberRest]);
    setCreditCardDate(prev => [...month, ...unknowMonthRest, '/', year, ...unknowYearRest]);
    setCreditCardName(prev => name.length === 0 ? 'YOUR NAME HERE' : name.toUpperCase().slice(0, 19));
  }, [numbers, name, date]);
  return (
    <CreditCardContainer>
      <Chip src={chipUrl} alt="chip" />
      <CreditCardNumbersContainer>
        <span>{creditCardNumber.slice(0, 4)}</span>
        <span>{creditCardNumber.slice(4, 8)}</span>
        <span>{creditCardNumber.slice(8, 12)}</span>
        <span>{creditCardNumber.slice(12, 16)} </span>
      </CreditCardNumbersContainer>
      <CardName>{creditCardName}</CardName>
      <CardDateTitle>valid thru</CardDateTitle>
      <CardDate>{<>{creditCardDate}</>}</CardDate>
    </CreditCardContainer>
  );
}

const CardDateTitle = styled.div`
  position: absolute;
  display: inline-block;
  bottom: 55px;
  right: 25px;
  color: #c9c9c9;
  font-size: 10px;
`;
const CardDate = styled.div`
  position: absolute;
  bottom: 35px;
  right: 25px;
  color: #c9c9c9;

  font-size: 14px;
`;
const CardName = styled.div`
  position: absolute;
  bottom: 35px;
  left: 25px;
  color: #c9c9c9;
`;
const Chip = styled.img`
  position: absolute;
  top: 23px;
  left: 30px;
  width: 35px;
  height: 26px;
`;

const UnknownNumber = styled.div`
  display: inline-block;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  margin: 0 2px 2px 2px;
  background-color: white;
`;
const CreditCardContainer = styled.div`
  width: 290px;
  height: 170px;
  background-color: rgb(146, 146, 146);
  border-radius: 20px;
  position: relative;
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
  letter-spacing:1px;
}

`;
