import React from 'react';
import { Alert, Dimensions, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { sendSupportMessage, useUser } from '@jam/api-client';

import Button from '../../components/Button';
import { RootStackParamList } from '../../types';
import Close from '../../components/icons/Close';
import { TextH2, TextLabel, TextP1, FormTextInput } from '../../components/text';
import colors from '../../../colors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const FormTitle = styled(TextH2)`
  align-self: center;
  padding: 0 10px 10px;
  margin-bottom: 24px;
`;

const PageSendMessage = styled.View`
  background-color: ${({ theme }) => theme.background.primary};
  height: ${SCREEN_HEIGHT}px;
  padding: 0 16px;
  vertical-align: top;
`;

const MessageBox = styled.TextInput`
  border-width: 2px;
  border-color: ${({ theme }) => theme.border.primary};
  width: 100%;
  border-radius: 12px;
  min-height: 20%;
  height: 25%;
  color: ${({ theme }) => theme.text.paragraph};
  padding: 16px;
`;

const Subtitle = styled(TextP1)`
  margin-bottom: 8px;
`;

const HeaderBox = styled.View`
  margin-top: 48px;
`;

const CloseButton = styled.Pressable`
  align-self: flex-end;
`;

type ContactSupportScreenModalProps = NativeStackScreenProps<RootStackParamList, 'ContactSupportScreenModal'>;

function ContactSupportScreenModal({ navigation }: ContactSupportScreenModalProps) {
  const isDark = useColorScheme() === 'dark';
  const { data: user } = useUser();

  const handleSendSupportMessage = async (values, helpers) => {
    const { setSubmitting } = helpers;
    const { email, message } = values;
    try {
      await sendSupportMessage(message, email);
      navigation.navigate('SettingsHome');
    } catch (error) {
      // TODO https://github.com/altoindustries/jam/issues/174
      Alert.alert('Unexpected Error', 'Something went wrong. Try again later.');
      setSubmitting(false);
    }
  };

  return (
    <PageSendMessage>
      <HeaderBox>
        <CloseButton onPress={() => navigation.navigate('SettingsHome')}>
          <Close height="24px" width="24px" pathStroke={isDark ? colors.white : colors.black[1]} />
        </CloseButton>
        <FormTitle>Support</FormTitle>
      </HeaderBox>
      {user && (
        <Formik
          initialValues={{ message: '', email: user.email }}
          onSubmit={async (values, helpers) => handleSendSupportMessage(values, helpers)}
        >
          {({ handleBlur, handleChange, handleSubmit, isSubmitting, values, dirty }) => (
            <>
              <Subtitle testID="send-support-message-subtitle">
                Send us a message and we&apos;ll get back to you as soon as possible
              </Subtitle>
              <TextLabel>Your email address</TextLabel>
              <FormTextInput
                autoComplete="email"
                autoFocus={!user?.email}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                placeholderTextColor={isDark ? colors.gray[2] : colors.gray[4]}
                placeholder="listener@example.com"
                testID="sender-email"
                value={values.email}
                textContentType="emailAddress"
                autoCapitalize="none"
              />
              <TextLabel>How can we help?</TextLabel>
              <MessageBox
                autoFocus={user?.email?.length > 0}
                maxLength={240}
                multiline
                numberOfLines={4}
                onBlur={handleBlur('message')}
                onChangeText={handleChange('message')}
                placeholder={`Tell us as much as possible about the issue you're having`}
                placeholderTextColor={isDark ? colors.gray[3] : colors.gray[4]}
                testID="support-message"
                textAlignVertical="top" // Android-specific: align placeholder to top line of TextInput
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
                testID="send-support-message"
              />
            </>
          )}
        </Formik>
      )}
    </PageSendMessage>
  );
}

export default ContactSupportScreenModal;
