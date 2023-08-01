import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function DashBoardLink({ text, path, isActive, children }) {
  return (
    <Link to={path}>
      <NavigationButton active={isActive}>
        {children}
        <span>{text}</span>
      </NavigationButton>
    </Link>);
}

const NavigationButton = styled.button`
  width: 100%;
  height: 100px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${props => props.active ? 'background-color: #ccc;' : ''}

  &:hover {
    background-color: #ccc;
  }

  & > *:not(:last-child) {
    margin-bottom: 4px;
  }

  & > *:first-child {
    font-size: 28px;
    color: #124090;
  }

  @media (max-width: 600px) {
    height: 80px;
  }
`;
