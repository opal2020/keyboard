import styled from '@emotion/styled';
import { Theme } from '@emotion/react';
import { fc660c } from 'assets/keyboardLayouts';
import KeyCap from './KeyCap';
import { Col, Row } from './Flex';

const KeyboardWrapper = styled.div`
  width: 850px;
  height: 256px;
`;

const KeyboardCol = styled(Col)`
  & > div ~ div {
    margin-top: 4px;
  }
`;

const KeyBoardRow = styled(Row)`
  & > div ~ div {
    margin-left: 3px;
  }
`;

type KeyboardProps = {
  borderColor: keyof Theme['colors'];
  type: string;
  pressedKeys?: any;
};

const Keyboard = ({ borderColor, type, pressedKeys }: KeyboardProps) => {
  return (
    <KeyboardWrapper>
      <KeyboardCol className="keyboard-col">
        {type === 'fc660c' &&
          fc660c.map((rowData, rowIndex) => (
            <KeyBoardRow key={`row_${rowIndex}`} className="keyboard-row">
              {rowData.map((data, colIndex) => (
                <KeyCap
                  isPressed={
                    data.key && pressedKeys ? pressedKeys[data.key] : undefined
                  }
                  fillColor="yellow20"
                  key={`keycode_${data.key}_${colIndex}`}
                  size={data.size}
                  borderColor={borderColor}
                />
              ))}
            </KeyBoardRow>
          ))}
      </KeyboardCol>
    </KeyboardWrapper>
  );
};

Keyboard.defaultProps = {
  pressedKeys: undefined,
};

export default Keyboard;
