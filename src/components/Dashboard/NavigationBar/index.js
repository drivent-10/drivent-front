import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaFileContract,
  FaMoneyBill,
  FaBed,
  FaCalendarWeek,
  FaCertificate,
} from 'react-icons/fa';
import { DashBoardLinkButton } from './DashBoardLinkButton';

export default function NavigationBar() {
  const location = useLocation();

  const DashBoardButtonsInfo = [
    { text: 'Inscrição', path: '/dashboard/subscription', icon: <FaFileContract /> },
    { text: 'Pagamento', path: '/dashboard/payment', icon: <FaMoneyBill /> },
    { text: 'Hotel', path: '/dashboard/hotel', icon: <FaBed /> },
    { text: 'Atividades', path: '/dashboard/activities', icon: <FaCalendarWeek /> },
    { text: 'Certificado', path: '/dashboard/certificate', icon: <FaCertificate /> }
  ];

  return (
    <Container>
      {DashBoardButtonsInfo.map(button => <DashBoardLinkButton text={button.text} path={button.path} isActive={button.path === location.pathname}>{button.icon}</DashBoardLinkButton>)}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ddd;
  box-shadow: 2px 0 10px 0 rgba(0,0,0,0.1);
  width: 100px;
  flex-shrink: 0;
  justify-content: flex-start;

  > a {
    text-decoration: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 80px;
    flex-direction: row;
  }
`;
