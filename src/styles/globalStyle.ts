import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

const globalStyles = css`
  ${emotionReset}
  html,
  body {
    font-family: 'Rhodium Libre', serif;
  }
`;

export default globalStyles;
