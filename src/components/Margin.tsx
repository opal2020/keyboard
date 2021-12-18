import styled from '@emotion/styled';
import { css } from '@emotion/react';

type MarginProps = {
  size?: number;
  row?: boolean;
};
const Margin = styled.div<MarginProps>`
  height: calc(${props => props.size} * 0.5rem);
  min-height: calc(${props => props.size} * 0.5rem);

  ${props =>
    props.row &&
    css`
      height: 0;
      width: calc(${props.size} * 0.5rem);
    `}
`;

export default Margin;
