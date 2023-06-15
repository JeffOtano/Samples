import { checkHandleAvailability, updateHandle, useUser } from '@jam/api-client';
import { Formik, FormikHelpers } from 'formik';
import React, { useCallback, useState } from 'react';
import { useColorScheme, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { isHandleValid } from '@jam/utils';

import { Attention, Checkmark } from '../../../components/icons';
import { SettingsStackParamList } from '../../../types';
import toast from '../../../lib/utils/toast';
import Button from '../../../components/Button';
import colors from '../../../../colors';
import { TextLabel, TextH5, FormTextInput } from '../../../components/text';

const StyledSafeAreaView = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.background.primary};
  display: flex;
  flex: 1 1 0%;
`;

const ViewBox = styled.View`
  padding: 0 24px;
`;

const FeedbackMessage = styled(TextH5)<{ isAvailable: boolean }>`
  color: ${({ isAvailable }) => (isAvailable ? colors.lime[1] : colors.strawberry[1])};
  margin-left: 4px;
`;

const FeedbackBox = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
`;

export type EditHandleScreenModalProps = NativeStackScreenProps<SettingsStackParamList, 'EditHandle'>;

export default function EditHandleScreen({ navigation }: EditHandleScreenModalProps) {
  const isDark = useColorScheme() === 'dark';
  const { data: user } = useUser();
  const [showIsAvailable, setShowIsAvailable] = useState(false);

  const handleUpdateHandle = useCallback(
    async (newHandle, { setSubmitting }: FormikHelpers<{ handle: string }>) => {
      try {
        await updateHandle(newHandle);
        setSubmitting(false);
        navigation.navigate('SettingsHome');
      } catch (error) {
        setSubmitting(false);
        // TODO https://github.com/altoindustries/jam/issues/174
        toast.danger({ message: 'That did not work. Try again later.' });
        console.error('Something went wrong when updating handle.');
      }
    },
    [navigation],
  );

  const validate = async (values) => {
    let errors = {};

    if (values.handle === user?.handle) return errors;

    if (!isHandleValid(values.handle)) {
      setShowIsAvailable(false);
      errors = { handle: 'Usernames can contain only letters, numbers, and underscores.' };
      return errors;
    }

    if (values.handle.length < 4) {
      setShowIsAvailable(false);
      return errors;
    }

    try {
      const { available: isHandleAvailable }: { available?: string } = await checkHandleAvailability(values.handle);

      if (!isHandleAvailable) {
        errors = { handle: 'This username is not available.' };
        setShowIsAvailable(false);
      } else {
        setShowIsAvailable(true);
      }
    } catch (error) {
      // TODO https://github.com/altoindustries/jam/issues/174
      console.error('Something went wrong trying to verify handle availability.', { error });
      errors = { handle: 'Something went wrong trying to verify handle availability.' };
    }
    return errors;
  };

  return (
    <StyledSafeAreaView>
      <ViewBox>
        <Formik
          initialValues={{ handle: '' }}
          onSubmit={async (values, helpers) => handleUpdateHandle(values.handle, helpers)}
          validate={async (values) => validate(values)}
        >
          {({ dirty, errors, handleBlur, handleChange, handleSubmit, isSubmitting, isValidating, values }) => (
            <>
              <TextLabel testID="new-handle-label">New Username</TextLabel>
              <FormTextInput
                autoCapitalize="none"
                autoComplete="username"
                autoCorrect={false}
                autoFocus
                clearButtonMode="while-editing"
                maxLength={15}
                onBlur={handleBlur('handle')}
                onChangeText={handleChange('handle')}
                placeholder={user?.handle || 'Choose your new handle'}
                placeholderTextColor={isDark ? colors.gray[2] : colors.gray[4]}
                testID="new-handle"
                textContentType="username"
                value={values.handle}
              />
              {showIsAvailable && (
                <FeedbackBox>
                  <Checkmark pathStroke={colors.lime[1]} height="16px" width="16px" />
                  <FeedbackMessage isAvailable={showIsAvailable}>This username is available.</FeedbackMessage>
                </FeedbackBox>
              )}
              {!showIsAvailable && errors.handle && (
                <FeedbackBox>
                  <Attention pathFill={colors.strawberry[1]} height="16px" width="16px" />
                  <FeedbackMessage isAvailable={showIsAvailable}>{String(errors.handle)}</FeedbackMessage>
                </FeedbackBox>
              )}
              <Button
                testID="save-handle-button"
                buttonStyle="Primary"
                onPress={handleSubmit}
                title="Save"
                buttonClassName="min-w-full flex items-center h-12 justify-center mt-6"
                titleClassName="font-sans-bold text-base"
                disabled={
                  !dirty || values.handle.length < 4 || isSubmitting || !isHandleValid(values.handle) || isValidating
                }
                isLoading={isSubmitting}
              />
            </>
          )}
        </Formik>
      </ViewBox>
    </StyledSafeAreaView>
  );
}
