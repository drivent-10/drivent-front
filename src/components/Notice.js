import styled from 'styled-components';

export default function Notice({ children }) {
  return <NoticeContainer>{children}</NoticeContainer>;
}

const NoticeContainer = styled.div`
  width: 388px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 250px;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  color: #8e8e8e;
  text-align: center;
`;
