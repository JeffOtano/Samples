import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

import App from '../../src/app/App';

test('renders correctly', async () => {
  const { getByTestId } = render(<App />);

  await waitFor(async () => {
    const textComponent = getByTestId('LoginHeader').children[0];
    expect(textComponent).toBe('Enter Your Phone Number to Continue');
  });
});
