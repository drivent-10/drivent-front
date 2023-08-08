import { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import EventInfoContext from '../../contexts/EventInfoContext';

import NavigationBar from '../../components/Dashboard/NavigationBar';

import DashboardLayout from '../../layouts/Dashboard';
import { Title } from '../../components/Title';

export default function Dashboard() {
  const { eventInfo } = useContext(EventInfoContext);
  const location = useLocation();
  const DashBoardTitle = {
    'subscription': 'Suas Informações',
    'payment': 'Ingresso e pagamento',
    'hotel': 'Escolha de hotel e quarto',
    'activities': 'Escolha de atividades',
    'certificate': 'Certificado',
  };
  return (
    <DashboardLayout background={eventInfo?.backgroundImageUrl}>
      <NavigationBar />
      <Container>
        <Title text={DashBoardTitle[location.pathname.replace('/dashboard/', '')]} />
        <Outlet />
      </Container>
    </DashboardLayout>
  );
}

const Container = styled.div`
  padding: 30px;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  @media (max-width: 600px) {
    height: calc(100vh - 80px);
    padding: 20px;
  }
`;
