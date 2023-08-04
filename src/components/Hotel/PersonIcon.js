import { BsFillPersonFill, BsPerson } from 'react-icons/all';
import styled from 'styled-components';

export const PersonFillIcon = styled(BsFillPersonFill)`
  font-size: 27px;
  color: ${(props) => props.color};
`;

export const PersonIcon = styled(BsPerson)`
  font-size: 27px;
  color: #000;
`;
