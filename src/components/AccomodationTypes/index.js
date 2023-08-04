import styled from 'styled-components';

export default function AccomodationType({ id, type, price, accomodationSelected, selectAccomodationType }) {
  return(
    <AccomodationTypeContainer accomodationSelected={accomodationSelected} id={id} onClick={() => selectAccomodationType(id)}>
      <h2>{type}</h2>
      <h3>R$ {price}</h3>

    </AccomodationTypeContainer>
  );
}

export const AccomodationTypeContainer = styled.div`
    background-color: ${({ accomodationSelected, id }) => (accomodationSelected && accomodationSelected.includes(id) ? '#FFEED2' : 'transparent')};
    width: 145px;
    height: 145px;
    border: 1px solid #CECECE;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    cursor: pointer;
    h2{
      font-size: 16px;
      line-height: 19px;
      color: #454545;  
    }
    h3{
      font-size: 14px;
      line-height: 16px;
      color: #898989;  
    }
`;
