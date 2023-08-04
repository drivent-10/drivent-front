import styled from 'styled-components';

export default function HotelCard({ id, name, accommodationType, availability, image, hotelId, setHotelId }) {
  return (
    <Card isActive={id === hotelId} onClick={() => setHotelId(id)}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <div>
        <h4>Tipos de acomodação:</h4>
        <p>{accommodationType}</p>
      </div>
      <div>
        <h4>Vagas disponíveis:</h4>
        <p>{availability}</p>
      </div>
    </Card>
  );
}

const Card = styled.div`
  width: 196px;
  height: 264px;
  border-radius: 10px;
  background: ${(props) => (props.isActive ? '#FFEED2' : '#ebebeb')};

  padding: 16px 14px;
  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 10px 5px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }

  h3 {
    color: #343434;
    font-size: 20px;
    line-height: 24px;
    margin: 10px 0;
  }

  div {
    font-size: 12px;
    line-height: 14px;
    color: #3c3c3c;
    margin-bottom: 14px;
    h4 {
      font-weight: 700;
      margin-bottom: 2px;
    }
  }
`;
