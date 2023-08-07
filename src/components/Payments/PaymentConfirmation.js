
import styled from 'styled-components';
import check from '../../assets/images/check.jpg';
export function PaymentConfirmation() {
  return (<PaymentConfirmationContainer>
    <img src={check} alt="confirmed!!" />
    <div>
      <p>Pagamento confirmado!</p>
      <p>Prossiga para escolha de hospedagem e atividades</p>
    </div>
  </PaymentConfirmationContainer>);
}
const PaymentConfirmationContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    display: block;
    width: 40px;
    height: 40px;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-left: 14px;
    p:first-child {
      font-weight: 700;
    }
    p {
      color: #454545;
      font-weight: 400;
      font-size: 16px;
      line-height: 18.75px;
    }
  }
`;
