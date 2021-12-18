import Image from 'next/image';
import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import { keyframes } from '@emotion/react';
import moment from 'moment';

import Keyboard from 'components/Keyboard';
import { Layout, LayoutHeader, LayoutContainer } from 'components/Layout';
import { Row, Col } from 'components/Flex';
import Margin from 'components/Margin';
import store from 'store';

const blink = (color: string) => keyframes`
  from, to {
    color: transparent;
    border-color: transparent;
  }
  50% {
    color: ${color};
    border-color: ${color};
  }
`;

const HeaderRightSection = styled(Row)<{ isDark: boolean }>`
  width: fit-content;
  color: ${props =>
    props.isDark ? props.theme.colors.gray10 : props.theme.colors.gray700};
  & > p {
    font-weight: bold;
  }
`;

const ModeButton = styled.div`
  cursor: pointer;
`;

const TimeWrapper = styled(Col)`
  width: fit-content;
  text-align: right;
`;

const Date = styled.div<{ isDark: boolean }>`
  font-size: 1.5rem;
  color: ${props =>
    props.isDark ? props.theme.colors.gray10 : props.theme.colors.gray700};
`;

const Time = styled.div<{ isDark: boolean }>`
  font-size: 1.25rem;
  color: ${props =>
    props.isDark ? props.theme.colors.gray40 : props.theme.colors.gray600};
  & > span {
    animation: ${props =>
        blink(
          props.isDark ? props.theme.colors.gray40 : props.theme.colors.gray600,
        )}
      1s step-end infinite;
  }
`;

const Title = styled.div<{ isDark: boolean }>`
  font-size: 3rem;
  color: ${props =>
    props.isDark ? props.theme.colors.gray10 : props.theme.colors.gray700};
`;

const KeyboardWrapper = styled.div`
  width: 850px;
`;

const KeyboardCaption = styled.div<{ isDark: boolean }>`
  width: 100%;
  text-align: right;
  font-size: 1.2rem;
  color: ${props =>
    props.isDark ? props.theme.colors.gray10 : props.theme.colors.gray700};
`;

const NameTyping = styled.div<{ isDark: boolean }>`
  width: 64px;
  height: 92px;
  font-size: 4rem;
  font-weight: 900;
  text-align: center;
  color: ${props =>
    props.isDark ? props.theme.colors.gray10 : props.theme.colors.gray700};
  border-bottom: 8px solid
    ${props =>
      props.isDark ? props.theme.colors.gray10 : props.theme.colors.gray700};
`;

const NameWrapper = styled(Row)<{ isDark: boolean }>`
  width: fit-content;
  height: fit-content;
  max-width: 900px;
  margin-bottom: 20vh;
  & > ${NameTyping} ~ ${NameTyping} {
    margin-left: 20px;
  }
  ${NameTyping} {
    :last-child {
      animation: ${props =>
          blink(
            props.isDark
              ? props.theme.colors.gray10
              : props.theme.colors.gray700,
          )}
        1s step-end infinite;
    }
    :nth-last-of-type(2) {
      color: ${props => props.theme.colors.gray30};
    }
  }
`;

const Home = () => {
  const { themeMode, userName } = store;
  const [name, setName] = useState<string>('');
  const [time, setTime] = useState({
    date: '',
    hour: '',
    min: '',
  });
  const [pressedKeyList, setPressedKeyList] = useState<{
    [key: string]: boolean;
  }>({});
  const nameRef = useRef(name);

  const handleKeyDown = (e: any) => {
    e.preventDefault();
    pressedKeyList[e.keyCode] = true;
    setPressedKeyList({ ...pressedKeyList });
  };

  const handleKeyUp = (e: any) => {
    e.preventDefault();
    pressedKeyList[e.keyCode] = false;
    setPressedKeyList({ ...pressedKeyList });
    if (e.keyCode > 64 && e.keyCode < 91 && nameRef.current.length < 10) {
      setName(prev => prev.concat(e.key));
      nameRef.current = nameRef.current.concat(e.key);
    } else if (e.keyCode === 8 && nameRef.current.length < 11) {
      setName(prev => prev.slice(0, -1));
      nameRef.current = nameRef.current.slice(0, -1);
    } else if (e.keyCode === 13) {
      userName.setUserName(nameRef.current);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      time.date = moment().format('YYYY.MM.DD');
      time.hour = moment().format('HH');
      time.min = moment().format('mm');
      setTime({ ...time });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Layout>
      <LayoutHeader>
        <Row justify="space-between" align="center">
          <ModeButton>
            <Image
              width={30}
              height={30}
              src={
                themeMode.mode === 'light'
                  ? '/icons/icn_sun.svg'
                  : '/icons/icn_moon.svg'
              }
              onClick={() =>
                themeMode.mode === 'light'
                  ? themeMode.toDark()
                  : themeMode.toLight()
              }
            />
          </ModeButton>
          <HeaderRightSection
            isDark={themeMode.mode === 'dark'}
            align="center"
            className="header-right"
          >
            {userName.name && <p>Welcome, {userName.name.toUpperCase()}</p>}
            <Margin row size={6} />
            <TimeWrapper justify="center" className="time">
              <Date isDark={themeMode.mode === 'dark'}>{time.date}</Date>
              <Margin size={0.5} />
              <Time isDark={themeMode.mode === 'dark'}>
                {time.hour} <span>:</span> {time.min}
              </Time>
            </TimeWrapper>
          </HeaderRightSection>
        </Row>
      </LayoutHeader>
      <LayoutContainer>
        <Col justify="center" align="center">
          <Title isDark={themeMode.mode === 'dark'}>Who are U?</Title>
          <Margin size={6} />
          <KeyboardWrapper>
            <Keyboard
              pressedKeys={pressedKeyList}
              type="fc660c"
              borderColor={themeMode.mode === 'dark' ? 'gray10' : 'gray700'}
            />
            <Margin size={2} />
            <KeyboardCaption isDark={themeMode.mode === 'dark'}>
              leopord fc660c layout
            </KeyboardCaption>
          </KeyboardWrapper>
          <Margin size={10} />
          <NameWrapper
            isDark={themeMode.mode === 'dark'}
            className="name-wrapper"
          >
            {name.split('').map((data, index) => (
              <NameTyping key={index} isDark={themeMode.mode === 'dark'}>
                {data.toUpperCase()}
              </NameTyping>
            ))}
            {name.length < 10 && (
              <NameTyping isDark={themeMode.mode === 'dark'} />
            )}
          </NameWrapper>
        </Col>
      </LayoutContainer>
    </Layout>
  );
};

export default Home;
