import styled from 'styled-components';
import { Pressable } from 'react-native';
import { TextH5 } from '../text';

export const InteractiveButtonOuter = styled(Pressable)`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.button.tertiary.background};
  height: 48px;
  flex: 1;
  margin-right: 2px;
  margin-left: 2px;
`;

export const InteractiveButtonText = styled(TextH5)`
  margin-left: 6px;
`;
