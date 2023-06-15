import styled from 'styled-components/native';

const BottomBorder = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.border.primary};
  padding-bottom: 12px;
`;

export default BottomBorder;
