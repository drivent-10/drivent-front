import { BsFillPersonFill, BsPerson } from 'react-icons/all';
import styled from 'styled-components';

export default function PersonIcon({ isFilled, color }) {
  return isFilled ? <PersonFillIcon color={color} /> : <PersonOutlineIcon color={color} />;
}

const PersonFillIcon = styled(BsFillPersonFill)`
  font-size: 24px;
  color: ${({ color }) => color};
`;

const PersonOutlineIcon = styled(BsPerson)`
  font-size: 24px;
  color: ${({ color }) => color};;
`;
