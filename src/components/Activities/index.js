import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { ContainerActivities } from './Container';
import Button from '../Form/Button';

export default function ActivitiesContainer() {
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <ContainerActivities>
        {/* <StyledTypography variant="h6" color="textSecondary">Primeiro, filtre pelo dia do evento:</StyledTypography> */}
        <ButtonsContainer>
          <Button>Sexta, 22/10</Button>
          <Button>Sábado, 23/10</Button>
          <Button>Domingo, 24/10</Button>
        </ButtonsContainer>
        <ScheduleEvent>
          <EventPlaces>
            <StyledTypography variant="h6" color="textSecondary">Auditório Principal</StyledTypography>
            <StyledTypography variant="h6" color="textSecondary">Auditório Lateral</StyledTypography>
            <StyledTypography variant="h6" color="textSecondary">Sala de Workshop</StyledTypography>
          </EventPlaces>
          <EventInformations>
            <div></div>
            <div></div>
            <div></div>
          </EventInformations>
        </ScheduleEvent>
      </ContainerActivities>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 15px!important;
`;

const ButtonsContainer = styled.div`
  display: flex;
  button{
    margin-right: 15px;
    font-size: 10px!important;;
  }
`;

const ScheduleEvent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
`;

const EventPlaces = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const EventInformations = styled.div`
  width: 100%;
  display: flex;
  div{
    width: 288px;
    height: 380px;
    border: 1px solid #D7D7D7;
  }
`;

