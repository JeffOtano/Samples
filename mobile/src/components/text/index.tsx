import { Text } from 'react-native';
import styled from 'styled-components/native';

const TextH1 = styled(Text)`
  font-size: 32px;
  line-height: 38.4px;
  font-family: 'Lato-Bold';
  color: ${({ theme }) => theme.text.heading};
`;

const TextH2 = styled(Text)`
  font-size: 24px;
  line-height: 28.8px;
  font-family: 'Lato-Bold';
  color: ${({ theme }) => theme.text.heading};
`;

const TextH3 = styled(Text)`
  font-size: 20px;
  line-height: 24px;
  font-family: 'Lato-Bold';
  color: ${({ theme }) => theme.text.heading};
`;

const TextH4 = styled(Text)`
  font-size: 16px;
  line-height: 19.2px;
  font-family: 'Lato-Bold';
  color: ${({ theme }) => theme.text.heading};
`;

const TextH5 = styled(Text)`
  font-size: 14px;
  line-height: 16.8px;
  font-family: 'Lato-Bold';
  color: ${({ theme }) => theme.text.heading};
`;

const TextH6 = styled(Text)`
  font-size: 12px;
  line-height: 18px;
  font-family: 'Lato-Bold';
  color: ${({ theme }) => theme.text.heading};
`;

const TextH7 = styled(Text)`
  font-size: 10px;
  line-height: 18px;
  font-family: 'Lato-Bold';
  color: ${({ theme }) => theme.text.heading};
`;

const TextP1 = styled(Text)`
  font-size: 16px;
  line-height: 19.2px;
  font-family: 'Lato-Regular';
  color: ${({ theme }) => theme.text.paragraph};
`;

const TextP2 = styled(Text)`
  font-size: 14px;
  line-height: 16.8px;
  font-family: 'Lato-Regular';
  color: ${({ theme }) => theme.text.paragraph};
`;

const TextP3 = styled(Text)`
  font-size: 12px;
  line-height: 14.4px;
  font-family: 'Lato-Regular';
  color: ${({ theme }) => theme.text.paragraph};
`;

const TextP4 = styled(Text)`
  font-size: 10px;
  line-height: 12px;
  font-family: 'Lato-Regular';
  color: ${({ theme }) => theme.text.paragraph};
`;

const TextLink1 = styled(Text)`
  font-size: 16px;
  line-height: 19.2px;
  font-family: 'Lato-Bold';
  color: ${({ theme }) => theme.text.link};
`;

const TextLink2 = styled(Text)`
  font-size: 14px;
  line-height: 16.8px;
  font-family: 'Lato-Bold';
  color: ${({ theme }) => theme.text.link};
`;

const TextLink3 = styled(Text)`
  font-size: 12px;
  line-height: 14.4px;
  font-family: 'Lato-Bold';
  color: ${({ theme }) => theme.text.link};
`;

const TextSecondaryLink = styled(Text)`
  font-size: 12px;
  line-height: 14.4px;
  font-family: 'Lato-Bold';
  color: ${({ theme }) => theme.text.secondaryLink};
`;

const TextLabel = styled(TextH4)`
  margin: 24px 0 12px 0;
`;

const FormTextInput = styled.TextInput`
  padding: 16px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.border.primary};
  border-radius: 12px;
  color: ${({ theme }) => theme.text.paragraph};
  font-size: 16px;
  line-height: 19.2px;
  font-family: 'Lato-Regular';
`;

export {
  TextH1,
  TextH2,
  TextH3,
  TextH4,
  TextH5,
  TextH6,
  TextH7,
  TextP1,
  TextP2,
  TextP3,
  TextP4,
  TextLink1,
  TextLink2,
  TextLink3,
  TextSecondaryLink,
  TextLabel,
  FormTextInput,
};
