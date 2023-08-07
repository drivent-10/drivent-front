import styled from 'styled-components';

export function InfoCard({ text, price, width, height, isSelected = false }) {
  return (
    <InfoCardContainer isSelected={isSelected} width={width} height={height}>
      <p>{text}</p>
      <p>R$ {price}</p>
    </InfoCardContainer>
  );
}
  
const InfoCardContainer = styled.section`
width: 290px;
height: 108px;
border-radius: 20px;
background-color: ${({ isSelected }) => (isSelected ? '#FFEED2' : 'transparent')};
border: ${({ isSelected }) => (isSelected ? '1px solid transparent' : '1px solid #CECECE')};
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
flex-wrap: wrap;
margin-bottom: 30px;
p:first-child {
  font-size: 16px;
  color: #454545;
}
p {
  font-size: 14px;
  color: #898989;
  margin-top: 8px;
}
`;
