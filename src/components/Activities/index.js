import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { ContainerActivities } from './Container';
import Button from '../Form/Button';
import check from '../../assets/images/akar-icons_circle-check.svg';
import xIcon from '../../assets/images/ant-design_close-circle-outlined.svg';
import enter from '../../assets/images/pepicons_enter.svg';
import { useEffect, useState } from 'react';
import useActivities from '../../hooks/api/useActivities';

export default function ActivitiesContainer() {
  const { activities, activitiesError } = useActivities();
  const [ activity, setActivity ] = useState();
  const [alreadyPaidForEvent, setAlreadyPaidForEvent] = useState(true);
  const [hasVipTicket, setHasVipTicket] = useState(false);
  const [hasAlreadySelectedADate, setHasAlreadySelectedADate] = useState(1); 
  //  1)falta fazer requisição para buscar datas do evento e preencher os botões dinamicamente
  //  2)depois ao clicar no botão setar o hasAlreadySelectedADate como true e
  //  buscar todas atividades na data escolhida
  //  3)Também buscar junto ao clique anterior se o usuário está inscrito ou não nas atividades.
  useEffect(() => {
    if(activities) {
      console.log(activities);
      setActivity(activities);
    }
    if(activitiesError) {
      if(activitiesError.response.data === 'Payment Required') {
        setAlreadyPaidForEvent(false);
      }
      if(activitiesError.response.data === 'unavailable') {
        setHasVipTicket(true);
      }
    }
  }, [activities, activitiesError]);
  return (
    <>
      {!hasVipTicket && !alreadyPaidForEvent && <StyledMessage>Você precisa ter confirmado pagamento antes<br /> de fazer a escolha de atividades</StyledMessage>}
      {hasVipTicket && <StyledMessage>Sua modalidade de ingresso não necessita escolher<br /> atividade. Você terá acesso a todas as atividades.</StyledMessage>}
      {!hasVipTicket && alreadyPaidForEvent && <ContainerActivities>
        {!hasAlreadySelectedADate && <FirstStyledTypography variant="h6" color="textSecondary">Primeiro, filtre pelo dia do evento:</FirstStyledTypography>}
        <ButtonsContainer>
          <SelectionDayButton isSelected >Sexta, 22/10</SelectionDayButton>
          <SelectionDayButton>Sábado, 23/10</SelectionDayButton>
          <SelectionDayButton>Domingo, 24/10</SelectionDayButton>
        </ButtonsContainer>
        {hasAlreadySelectedADate && (<><ScheduleEvent>
          <EventPlaces>
            <StyledTypography variant="h6" color="textSecondary">Auditório Principal</StyledTypography>
            <StyledTypography variant="h6" color="textSecondary">Auditório Lateral</StyledTypography>
            <StyledTypography variant="h6" color="textSecondary">Sala de Workshop</StyledTypography>
          </EventPlaces>
          <EventInformations>
            <EventInfoSection>
              <EventInfoItem isSubscribed hours={1}>
                <EventDescription>
                  <p>Minecraft: montando o PC ideal</p>
                  <p>09:00 - 10:00</p>
                </EventDescription>
                <ColumnSeparator isSubscribed />
                <EventCapacity>
                  <img src={true ? check :/* isFull ? xIcon :*/enter} alt="" />
                  <p>{27} vagas</p>
                </EventCapacity>
              </EventInfoItem>
              <EventInfoItem hours={1}>
                <EventDescription>
                  <p>Minecraft: montando o PC ideal</p>
                  <p>09:00 - 10:00</p>
                </EventDescription>
                <ColumnSeparator />
                <EventCapacity>
                  <img src={enter} alt="" />
                  <p>{27} vagas</p>
                </EventCapacity>
              </EventInfoItem>
            </EventInfoSection>
            <EventInfoSection>
              <EventInfoItem hours={2}>
                <EventDescription>
                  <p>Minecraft: montando o PC ideal</p>
                  <p>09:00 - 10:00</p>
                </EventDescription>
                <ColumnSeparator />
                <EventCapacity>
                  <img src={enter} alt="" />
                  <p>{27} vagas</p>
                </EventCapacity>
              </EventInfoItem>
              <EventInfoItem hours={1}>
                <EventDescription>
                  <p>Minecraft: montando o PC ideal</p>
                  <p>09:00 - 10:00</p>
                </EventDescription>
                <ColumnSeparator />
                <EventCapacity>
                  <img src={enter} alt="" />
                  <p>{27} vagas</p>
                </EventCapacity>
              </EventInfoItem>
            </EventInfoSection>
            <EventInfoSection>
              <EventInfoItem hours={2}>
                <EventDescription>
                  <p>Minecraft: montando o PC ideal</p>
                  <p>09:00 - 10:00</p>
                </EventDescription>
                <ColumnSeparator />
                <EventCapacity>
                  <img src={enter} alt="" />
                  <p>{27} vagas</p>
                </EventCapacity>
              </EventInfoItem>
              <EventInfoItem hours={1}>
                <EventDescription>
                  <p>Minecraft: montando o PC ideal</p>
                  <p>09:00 - 10:00</p>
                </EventDescription>
                <ColumnSeparator />
                <EventCapacity>
                  <img src={enter} alt="" />
                  <p>{27} vagas</p>
                </EventCapacity>
              </EventInfoItem>
            </EventInfoSection>

          </EventInformations>
        </ScheduleEvent>
        </>)}
      </ContainerActivities>}
    </>
  );
}

const SelectionDayButton = styled(Button)`
background-color: ${({ isSelected }) => isSelected ? '#FFD37D !important' : '#E0E0E0 !important'};
`;

const ColumnSeparator = styled.div`
  content: "";
  display: block;
  height: 100%;
  width: 1px;
  background-color: ${({ isSubscribed }) => isSubscribed ? '#99E8A1' : '#F1F1F1'};

`;
const EventDescription = styled.div`
  width: 80%;
  p:first-child{
    font-weight:700;
    margin-bottom:6px;
  }
  p{
    font-size:12px;
    line-height: 14px;
  }
  `;
const EventCapacity = styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
color:#078632;
line-height:10.55px;
font-size:9px;
width: 20%;
padding-left:10px;
`;
const EventInfoItem = styled.div`
display:flex;
width:100%;
background-color: ${({ isSubscribed }) => isSubscribed ? '#D0FFDB' : '#F1F1F1'};
border-radius:5px;
height: ${({ hours }) => hours ? `${String(hours * 79 + 10)}px` : '79px'};
padding:12px 14px 9px 10px; 
margin-bottom:10px;
`;
const EventInfoSection = styled.div`
    width: 288px;
    min-height: 390px;
    border: 1px solid #D7D7D7;
    padding:10px;
`;

const StyledTypography = styled(Typography)`
  display:block;
  font-size: 17px !important;
  line-height:19.92px !important;
  text-align:center !important;
  width:100%;
  margin-bottom: 13px!important;
`;
const FirstStyledTypography = styled(StyledTypography)`
font-size:20px !important;
line-height:23.45px !important;
text-align: left !important;
height:fit-content;
`;
const StyledMessage = styled(FirstStyledTypography)`
width:100%;
height:50%;
display:flex;
align-items:flex-end;
padding-bottom:93px;
justify-content:center;
color: #8E8E8E !important;
text-align: center !important;
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
  max-height:392px; 
  height: 100%; 
  padding-bottom:60px;
`;

