import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export function Title({ text }) {
  return (<StyledTypography variant="h4">{text}</StyledTypography>);
}
const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
