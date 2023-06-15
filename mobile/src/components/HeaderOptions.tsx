import { useColorScheme } from 'react-native';

const DARK_COLOR_SCHEME = 'dark';

function HeaderOptions() {
  const colorSchemeRN = useColorScheme();
  return {
    headerShown: false,
    title: '',
    headerStyle: { backgroundColor: colorSchemeRN === DARK_COLOR_SCHEME ? '#000' : '#fff' },
    headerShadowVisible: false,
    headerBackTitleVisible: false,
    headerTintColor: colorSchemeRN === DARK_COLOR_SCHEME ? '#da01be' : '#121212',
  };
}

export default HeaderOptions;
