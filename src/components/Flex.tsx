import styled from '@emotion/styled';

type FlexProps = {
  children?: React.ReactNode;
  align?: string;
  justify?: string;
  className?: string;
};

type FlexComponentProps = {
  align?: string;
  justify?: string;
};

const RowComponent = styled.div<FlexComponentProps>`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: ${props => props.justify && props.justify};
  align-items: ${props => props.align && props.align};
`;

const ColComponent = styled(RowComponent)`
  flex-direction: column;
`;

export const Row = ({ children, align, justify, className }: FlexProps) => {
  return (
    <RowComponent align={align} justify={justify} className={className}>
      {children}
    </RowComponent>
  );
};

export const Col = ({ children, align, justify, className }: FlexProps) => {
  return (
    <ColComponent align={align} justify={justify} className={className}>
      {children}
    </ColComponent>
  );
};

Row.defaultProps = {
  children: undefined,
  align: undefined,
  justify: undefined,
  className: undefined,
};

Col.defaultProps = {
  children: undefined,
  align: undefined,
  justify: undefined,
  className: undefined,
};
