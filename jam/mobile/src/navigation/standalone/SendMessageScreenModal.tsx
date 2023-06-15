import React from 'react';
import { Alert, Dimensions, Pressable, useColorScheme, View } from 'react-native';
import styled from 'styled-components';
import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TextInput } from 'react-native-gesture-handler';
import { postMessageToCreator } from '@jam/api-client';

import Button from '../../components/Button';
import { RootStackParamList } from '../../types';
import Close from '../../components/icons/Close';
import { TextH2, TextP1 } from '../../components/text';
import colors from '../../../colors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const FormTitle = styled(TextH2)`
  align-self: center;
  padding: 0 10px 10px;
  margin-bottom: 24px;
`;

const PageSendMessage = styled(View)<{ isDark: boolean }>`
  background-color: ${({ isDark }) => (isDark ? colors.black[0] : colors.white)};
  height: ${SCREEN_HEIGHT}px;
  padding: 0 16px;
  vertical-align: top;
`;

const MessageBox = styled(TextInput)<{ isDark: boolean }>`
  border-width: 2px;
  border-color: ${({ isDark }) => (isDark ? colors.gray[2] : colors.gray[4])};
  width: 100%;
  border-radius: 12px;
  min-height: 20%;
  height: 25%;
  color: ${({ isDark }) => (isDark ? colors.gray[6] : colors.gray[3])};
  padding: 16px;
`;

const Subtitle = styled(TextP1)<{ isDark: boolean }>`
  margin-bottom: 8px;
  color: ${({ isDark }) => (isDark ? colors.gray[4] : colors.gray[2])};
`;

const HeaderBox = styled(View)`
  margin-top: 48px;
`;

const CloseButton = styled(Pressable)`
  align-self: flex-end;
`;

type SendMessageScreenModalProps = NativeStackScreenProps<RootStackParamList, 'SendMessageScreenModal'>;

function SendMessageScreenModal({ navigation, route }: SendMessageScreenModalProps) {
  const { title, segmentId } = route.params;
  const isDark = useColorScheme() === 'dark';

  const initialValues = { message: '' };

  const handleSendMessage = async (values, helpers) => {
    const { setSubmitting } = helpers;
    const { message } = values;
    try {
      await postMessageToCreator(segmentId, message);
      navigation.navigate('ListenHome');
    } catch (error) {
      // TODO https://github.com/altoindustries/jam/issues/174
      Alert.alert('Unexpected Error', 'Something went wrong. Try again later.');
      setSubmitting(false);
    }
  };

  return (
    <PageSendMessage isDark={isDark}>
      <HeaderBox>
        <CloseButton onPress={() => navigation.navigate('ListenHome')}>
          <Close height="24px" width="24px" pathStroke={isDark ? colors.white : colors.black[1]} />
        </CloseButton>
        <FormTitle>Reply</FormTitle>
      </HeaderBox>
      <Formik initialValues={initialValues} onSubmit={async (values, helpers) => handleSendMessage(values, helpers)}>
        {({ handleBlur, handleChange, handleSubmit, isSubmitting, values, dirty }) => (
          <>
            <Subtitle isDark={isDark} testID="send-message-subtitle">
              {`Jam will forward your message on to the creator of ${title}. We won't share your personal information.`}
            </Subtitle>
            <MessageBox
              autoFocus
              isDark={isDark}
              maxLength={240}
              multiline
              numberOfLines={4}
              onBlur={handleBlur('message')}
              onChangeText={handleChange('message')}
              placeholder="Send some love to this jammer"
              placeholderTextColor={isDark ? colors.gray[6] : colors.gray[3]}
              testID="message"
              textAlignVertical="top"
              value={values.message}
            />
            <Button
              disabled={!dirty || isSubmitting || !values.message}
              isLoading={isSubmitting}
              buttonStyle="Primary"
              title="Send"
              titleClassName="pr-6 pl-6"
              buttonClassName="min-w-full flex items-center h-12 justify-center mt-6 bottom-0"
              onPress={handleSubmit}
              testID="send-message-creator"
            />
          </>
        )}
      </Formik>
    </PageSendMessage>
  );
}

export default SendMessageScreenModal;
