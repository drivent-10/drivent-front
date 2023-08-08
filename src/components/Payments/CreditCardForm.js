import styled from 'styled-components';
import Input from '../Form/Input';
import { CreditCard } from './CreditCard';

export function CreditCardForm({ data, errors, handleChange }) {
  return (<CreditCardFormContainer>
    <CreditCard numbers={data?.creditCardNumber?.replace(/\s/g, '')} name={data?.creditCardName} date={data?.creditCardDate} />
    <CreditCardSectionContainer>
      <InputWrapper>
        <Input label="Card Number" name="creditCardNumber" mask='9999 9999 9999 9999' value={data?.creditCardNumber?.replace(' ', '')} onChange={handleChange('creditCardNumber')} />
        {errors.creditCardNumber && <ErrorMsg>{errors.creditCardNumber}</ErrorMsg>}
      </InputWrapper>
      <p>E.g.: 49..., 51..., 36..., 37...</p>
      <InputWrapper>
        <Input label="Name" name="creditCardName" value={data?.creditCardName} onChange={handleChange('creditCardName')} />
        {errors.creditCardName && <ErrorMsg>{errors.creditCardName}</ErrorMsg>}
      </InputWrapper>
      <div>
        <InputWrapper>
          <InputValidThru label="Valid Thru" name="creditCardDate" mask='99/99' value={data?.creditCardDate} onChange={handleChange('creditCardDate')} />
          <InputCvc label="CVC" name="creditCardCvc" mask='999' value={data?.creditCardCvc} onChange={handleChange('creditCardCvc')} />
          {errors.creditCardDate && <DateErrorMsg>{errors.creditCardDate}</DateErrorMsg>}
          {errors.creditCardCvc && <CVCErrorMsg hasDateError={errors.creditCardDate}>{errors.creditCardCvc}</CVCErrorMsg>}
        </InputWrapper>
      </div>
    </CreditCardSectionContainer>
  </CreditCardFormContainer>);
}

const CreditCardSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  label {
    top: -5px !important;
  }
  label.Mui-focused{ 
    top: 0px !important;
  }
  label.MuiFormLabel-filled{ 
    top: 0px !important;
  }

  div{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  input {
    height: 5px;
  }
  p {
    margin-top: 5px;
    color: #c9c9c9;
  }
`;

const InputValidThru = styled(Input)`
  width: 180px !important;
`;

const InputCvc = styled(Input)`
  width: 100px !important;
`;
const CreditCardFormContainer = styled.div`
  display: flex;
`;
const InputWrapper = styled.div`
position:relative;
`;

const ErrorMsg = styled.p`
position:absolute;
top:-12px;
left:0;
color:red !important;
font-size:14px;
`;
const CVCErrorMsg = styled(ErrorMsg)`
top: ${({ hasDateError }) => hasDateError? '59px': '44px'};
left: ${({ hasDateError }) => hasDateError? '0px': '200px'};


`;
const DateErrorMsg = styled(ErrorMsg)`
top: 44px;
`;
