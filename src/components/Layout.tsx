import styled from '@emotion/styled';
import store from 'store';

const LayoutComponent = styled.div<{ dark?: boolean }>`
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.dark && props.theme.colors.gray700};
  transition: background-color 1s ease;
`;

const HeaderComponent = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 30px;
`;

const ContainerComponent = styled.div`
  height: calc(100vh - 128px);
  padding: 24px;
`;

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const { themeMode } = store;
  return (
    <LayoutComponent dark={themeMode.mode === 'dark'}>
      {children}
    </LayoutComponent>
  );
};

export const LayoutHeader = ({ children }: LayoutProps) => {
  return <HeaderComponent>{children}</HeaderComponent>;
};

export const LayoutContainer = ({ children }: LayoutProps) => {
  return <ContainerComponent>{children}</ContainerComponent>;
};

Layout.defaultProps = {
  children: undefined,
};

LayoutHeader.defaultProps = {
  children: undefined,
};

LayoutContainer.defaultProps = {
  children: undefined,
};
