import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

import { RootStackParamList } from '../../types/navigation';

type WebviewProps = NativeStackScreenProps<RootStackParamList, 'Webview'>;

export default function WebviewScreen({ route }: WebviewProps) {
  const { uri } = route.params;
  return (
    <SafeAreaView className="flex-1">
      <WebView source={{ uri }} />
    </SafeAreaView>
  );
}
