import styled from 'styled-components';

export const ContainerActivities = styled.div`
  display: flex;
  /* height: fit-content; */
  /* flex-direction: column; */
  width: 100%;
  /* height: 530px; */
  /* padding-bottom:60px; */
  flex-wrap: wrap;
  button{
    height: 37px;
    width: 131px;
  }

  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;
