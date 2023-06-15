import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { InteractiveButtonOuter, InteractiveButtonText } from './StyledInteractiveButton';
import { Mail } from '../icons';
import { RootStackParamList } from '../../types';

type MessageButtonProps = {
  segmentId: string;
  title: string;
};

function MessageButton({ segmentId, title }: MessageButtonProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const openReplyToCreatorModal = useCallback(() => {
    navigation.navigate('SendMessageScreenModal', { title, segmentId });
  }, [navigation, segmentId, title]);

  return (
    <InteractiveButtonOuter onPress={openReplyToCreatorModal}>
      <Mail height="24px" width="24px" />
      <InteractiveButtonText>Message</InteractiveButtonText>
    </InteractiveButtonOuter>
  );
}

export default MessageButton;
