import styled from '@emotion/styled';
import { Theme } from '@emotion/react';

const keyCapTheme = {
  height: '42px',
  width: {
    wp: '22px',
    sm: '44px',
    md: '55px',
    ml: '61px',
    lg: '77px',
    xl: '99px',
    gt: '300px',
  },
};

type BoxTypes = {
  size: 'wp' | 'sm' | 'md' | 'ml' | 'lg' | 'xl' | 'gt';
  isPressed?: boolean;
  fillColor?: keyof Theme['colors'];
  borderColor?: keyof Theme['colors'];
};

const Box = styled.div<BoxTypes>`
  width: ${props => keyCapTheme.width[props.size]};
  height: ${keyCapTheme.height};
  border: 3px solid
    ${props => {
      if (props.size === 'wp') return 'none';
      if (props.borderColor) {
        return props.theme.colors[props.borderColor];
      }
      return 'none';
    }};
  border-radius: 9px;
  background-color: ${props =>
    props.isPressed && props.fillColor && props.theme.colors[props.fillColor]};
`;

type KeyCapProps = {
  children?: React.ReactNode;
  isPressed?: boolean;
  size: 'wp' | 'sm' | 'md' | 'ml' | 'lg' | 'xl' | 'gt';
  fillColor?: keyof Theme['colors'];
  borderColor?: keyof Theme['colors'];
};

const KeyCap = ({
  children,
  isPressed,
  size,
  fillColor,
  borderColor,
}: KeyCapProps) => {
  return (
    <Box
      size={size}
      isPressed={isPressed}
      fillColor={fillColor}
      borderColor={borderColor}
    >
      {children}
    </Box>
  );
};

KeyCap.defaultProps = {
  children: undefined,
  isPressed: undefined,
  fillColor: undefined,
  borderColor: undefined,
};

export default KeyCap;
