import { render } from '@testing-library/react-native';
import { ThemeProvider, DefaultTheme } from 'styled-components/native';
import React from 'react';
import { lightTheme } from '../../theme';

const renderWithTheme = (children: React.ReactNode, theme: DefaultTheme = lightTheme) =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

export default renderWithTheme;
