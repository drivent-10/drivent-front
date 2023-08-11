import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { ContainerActivities } from './Container';
import Button from '../Form/Button';
import check from '../../assets/images/akar-icons_circle-check.svg';
import xIcon from '../../assets/images/ant-design_close-circle-outlined.svg';
import enter from '../../assets/images/pepicons_enter.svg';
import { useEffect, useState } from 'react';
import useActivities from '../../hooks/api/useActivities';
import { format } from 'date-fns';
import useActivitiesPost from '../../hooks/api/useActivitiesPost';
import { toast } from 'react-toastify';

export default function ActivitiesContainer() {
  const { activities, activitiesError } = useActivities();
  const [ activity, setActivity ] = useState();
  const [ userActivities, setUserActivities ] = useState();
  const [ listActivity, setListActivity ] = useState(null);
  const [alreadyPaidForEvent, setAlreadyPaidForEvent] = useState(true);
  const [hasVipTicket, setHasVipTicket] = useState(false);
  const [hasAlreadySelectedADate, setHasAlreadySelectedADate] = useState(null); 
  const [selectedDay, setSelectedDay] = useState('');
  const { postActivities, postActivitiesError } = useActivitiesPost();
  const [ enrollmentIncomplete, setEnrollmentIncomplete ] = useState(false);
  
  useEffect(() => {
    if(activities) {
      const combinedActivities = [
        ...activities.mainAuditorium,
        ...activities.sideAuditorium,
        ...activities.workShop
      ];
      setUserActivities(activities.userActivities);
      setActivity(combinedActivities);
    }
    if(activitiesError) {
      if(activitiesError.response.data === 'Payment Required') {
        setAlreadyPaidForEvent(false);
      }
      if(activitiesError.response.data === 'Service Unavailable') {
        setHasVipTicket(true);
      }
      if(activitiesError.response.data === 'Not Found') {
        setEnrollmentIncomplete(true);
      }
    }
  }, [activities, activitiesError]);

  function selectDay(day) {
    setSelectedDay(day);
    const filterActivities = activity.filter((a) => a.name.includes(day));
    setListActivity(filterActivities);
    setHasAlreadySelectedADate(true);
  }

  async function selectActivity(id) {
    if(userActivities.includes(id)) return;
    const body = { activityId: id };
    try {
      await postActivities(body);
      setUserActivities([...userActivities, id]);
      toast('Inscrição feita com sucesso');
    } catch (err) {
      if(err.response.data.message === 'User already has an activity scheduled at this time') {
        toast('Você já está inscrito em outro evento neste horário!');
      }else{
        toast('Um erro desconhecido ocorreu! Por favor, tente novamente!');
      }
    }
  }

  return (
    <>
      {!hasVipTicket && !alreadyPaidForEvent && <StyledMessage>Você precisa ter confirmado pagamento antes<br /> de fazer a escolha de atividades</StyledMessage>}
      {hasVipTicket && <StyledMessage>Sua modalidade de ingresso não necessita escolher<br /> atividade. Você terá acesso a todas as atividades.</StyledMessage>}
      {enrollmentIncomplete && <StyledMessage>Você precisa completar sua inscrição antes<br /> de prosseguir pra escolha das atividades</StyledMessage>}
      {!hasVipTicket && alreadyPaidForEvent && !enrollmentIncomplete && <ContainerActivities>
        {!hasAlreadySelectedADate && <FirstStyledTypography variant="h6" color="textSecondary">Primeiro, filtre pelo dia do evento:</FirstStyledTypography>}
        <ButtonsContainer>
          <SelectionDayButton onClick={() => selectDay('Friday')} isSelected={selectedDay === 'Friday'} >Sexta, 22/10</SelectionDayButton>
          <SelectionDayButton onClick={() => selectDay('Saturday')} isSelected={selectedDay === 'Saturday'} >Sábado, 23/10</SelectionDayButton>
          <SelectionDayButton onClick={() => selectDay('Sunday')} isSelected={selectedDay === 'Sunday'} >Domingo, 24/10</SelectionDayButton>
        </ButtonsContainer>
        {hasAlreadySelectedADate && (<><ScheduleEvent>
          <EventPlaces>
            <StyledTypography variant="h6" color="textSecondary">Auditório Principal</StyledTypography>
            <StyledTypography variant="h6" color="textSecondary">Auditório Lateral</StyledTypography>
            <StyledTypography variant="h6" color="textSecondary">Sala de Workshop</StyledTypography>
          </EventPlaces>
          <EventInformations>
            <EventInfoSection>
              {
                listActivity && listActivity.map((activities) => {
                  if(activities.local === 'Auditório Principal') {
                    const formattedStartsAt = format(new Date(activities.startsAt), 'HH:mm');
                    const formattedEndsAt = format(new Date(activities.endsAt), 'HH:mm');
                    return (
                      <EventInfoItem key={activities.id} isSubscribed={userActivities.includes(activities.id)} hours={activities.activityTime}>
                        <EventDescription>
                          <p>{activities.name}</p>
                          <p>{formattedStartsAt} - {formattedEndsAt}</p>
                        </EventDescription>
                        <ColumnSeparator isSubscribed={userActivities.includes(activities.id)} />
                        <EventCapacity isFull={activities.available === 0}>
                          {/*                                                                                                                                                            ta disponivel?              to cadastrada?               se sim, check, se nao, enter  se não ta disponivel xIncon */}
                          <img style={{ cursor: activities.available === 0 || userActivities.includes(activities.id)? 'not-allowed' : 'pointer' }} onClick={() => activities.available > 0 && selectActivity(activities.id)} src={activities.available > 0 ? userActivities.includes(activities.id) ? check : enter : xIcon} alt="" />
                          <p>{activities.available === 0 ? 'Esgotado' : userActivities.includes(activities.id) ? 'Inscrito' : activities.available + ' vagas'}</p>
                        </EventCapacity>
                      </EventInfoItem>
                    );
                  }
                })
              }
            </EventInfoSection>
            <EventInfoSection>
              {
                listActivity && listActivity.map((activities) => {
                  if(activities.local === 'Auditório Lateral') {
                    const formattedStartsAt = format(new Date(activities.startsAt), 'HH:mm');
                    const formattedEndsAt = format(new Date(activities.endsAt), 'HH:mm');
                    return (
                      <EventInfoItem key={activities.id} isSubscribed={userActivities.includes(activities.id)} hours={activities.activityTime}>
                        <EventDescription>
                          <p>{activities.name}</p>
                          <p>{formattedStartsAt} - {formattedEndsAt}</p>
                        </EventDescription>
                        <ColumnSeparator isSubscribed={userActivities.includes(activities.id)} />
                        <EventCapacity isFull={activities.available === 0}>
                          {/*                                                                                                                                                            ta disponivel?              to cadastrada?               se sim, check, se nao, enter  se não ta disponivel xIncon */}
                          <img style={{ cursor: activities.available === 0 || userActivities.includes(activities.id)? 'not-allowed' : 'pointer' }} onClick={() => activities.available > 0 && selectActivity(activities.id)} src={activities.available > 0 ? userActivities.includes(activities.id) ? check : enter : xIcon} alt="" />
                          <p>{activities.available === 0 ? 'Esgotado' : userActivities.includes(activities.id) ? 'Inscrito' : activities.available + ' vagas'}</p>
                        </EventCapacity>
                      </EventInfoItem>
                    );
                  }
                })
              }
            </EventInfoSection>
            <EventInfoSection>
              {
                listActivity && listActivity.map((activities) => {
                  if(activities.local === 'Sala de Workshop') {
                    const formattedStartsAt = format(new Date(activities.startsAt), 'HH:mm');
                    const formattedEndsAt = format(new Date(activities.endsAt), 'HH:mm');
                    return (
                      <EventInfoItem key={activities.id} isSubscribed={userActivities.includes(activities.id)} hours={activities.activityTime}>
                        <EventDescription>
                          <p>{activities.name}</p>
                          <p>{formattedStartsAt} - {formattedEndsAt}</p>
                        </EventDescription>
                        <ColumnSeparator isSubscribed={userActivities.includes(activities.id)} />
                        <EventCapacity isFull={activities.available === 0}>
                          {/*                                                                                                                                                            ta disponivel?              to cadastrada?               se sim, check, se nao, enter  se não ta disponivel xIncon */}
                          <img style={{ cursor: activities.available === 0 || userActivities.includes(activities.id)? 'not-allowed' : 'pointer' }} onClick={() => activities.available > 0 && selectActivity(activities.id)} src={activities.available > 0 ? userActivities.includes(activities.id) ? check : enter : xIcon} alt="" />
                          <p>{activities.available === 0 ? 'Esgotado' : userActivities.includes(activities.id) ? 'Inscrito' : activities.available + ' vagas'}</p>
                        </EventCapacity>
                      </EventInfoItem>
                    );
                  }
                })
              }
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
  background-color: ${({ isSubscribed }) => isSubscribed ? '#99E8A1' : '#D7D7D7'};

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
  color: ${({ isFull }) => isFull ? '#CC6666' : '#078632'};
  line-height:10.55px;
  font-size:9px;
  width: 20%;
  padding-left:10px;
  text-align: center;
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

