import styled from 'styled-components';

export default function HotelCard({ id, name, accommodationType, availability, image, hotel, setHotel }) {
  return (
    <Card isActive={id === hotel} onClick={() => setHotel(id)}>
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

const Card = styled.li`
  width: 196px;
  height: 264px;
  border-radius: 10px;
  background: ${(props) => (props.isActive ? '#FFEED2' : '#ebebeb')};

  padding: 16px 14px;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.3) 0 19px 38px, rgba(0, 0, 0, 0.22) 0 15px 12px;
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
