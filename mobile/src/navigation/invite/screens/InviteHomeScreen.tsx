import React, { useCallback, useState } from 'react';
import { ScrollView, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik, FormikHelpers } from 'formik';
import { CountryCode } from 'react-native-country-picker-modal';
import CheckBox from '@react-native-community/checkbox';
import styled from 'styled-components/native';

import { sendInvitation, useAggregationStreamsInclude, useUser } from '@jam/api-client';
import { isValidNumber } from 'react-native-phone-number-input';
import colors from '../../../../colors';
import toast from '../../../lib/utils/toast';
import Button from '../../../components/Button';
import StyledPhoneInput from '../../../components/login/StyledPhoneInput';
import { TextH2, TextLabel, TextP1, FormTextInput } from '../../../components/text';

const SafeAreaViewInvite = styled(SafeAreaView)`
  display: flex;
  flex: 1 1 0%;
  background-color: ${({ theme }) => theme.background.primary};
`;

const TitleInviteScreen = styled(TextH2)`
  margin-top: 32px;
  text-align: center;
`;

const TextRecommendation = styled(TextP1)`
  color: ${({ theme }) => theme.text.paragraph};
`;

const TextCheckbox = styled(TextP1)`
  margin-left: 16px;
`;

const FormView = styled.View`
  margin: 24px;
`;

const PressableCheckbox = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin-top: 12px;
`;

const JamCheckbox = styled(CheckBox)`
  border-radius: 6px;
  height: 24px;
  width: 24px;
`;

type InviteForm = {
  goes_by: string;
  inviterGoesBy?: string;
  phone: string;
  recommendedStreams?: string[];
};

export default function InviteHomeScreen() {
  const isDark = useColorScheme() === 'dark';
  const { data: user } = useUser();
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const { data: streamsList } = useAggregationStreamsInclude();
  const [recommendedStreams, setRecommendedStreams] = React.useState<string[]>([]);
  const [phone, setPhone] = useState<string | null | undefined>('');

  const handleCheckboxChange = useCallback(
    (stream: string) => {
      if (recommendedStreams.includes(stream)) {
        setRecommendedStreams(recommendedStreams.filter((recommendedStream) => recommendedStream !== stream));
      } else {
        setRecommendedStreams([...recommendedStreams, stream]);
      }
    },
    [recommendedStreams],
  );

  const handleSendInvitation = useCallback(
    async (values: InviteForm, { setSubmitting, resetForm }: FormikHelpers<InviteForm>) => {
      try {
        await sendInvitation(values, recommendedStreams);
        resetForm({ values: { goes_by: '', phone: null } });
        setPhone('');
        setRecommendedStreams([]);
        setSubmitting(false);
      } catch (e) {
        toast.danger({ message: 'Something went wrong. Try again later.' });
      }
    },
    [recommendedStreams],
  );

  const jamsToRecommend = streamsList?.data?.map(({ stream_id, stream }) => (
    <PressableCheckbox key={stream_id} onPress={() => handleCheckboxChange(stream_id)}>
      <JamCheckbox
        boxType="square"
        data-testid={`stream-field-${stream_id}`}
        offAnimationType="bounce"
        onAnimationType="bounce"
        onCheckColor={isDark ? colors.white : colors.black[1]}
        onTintColor={isDark ? colors.gray[4] : colors.gray[6]}
        value={recommendedStreams.includes(stream_id)}
        tintColors={{ true: colors.gray[4] }}
      />
      <TextCheckbox>{stream?.name}</TextCheckbox>
    </PressableCheckbox>
  ));

  return (
    <SafeAreaViewInvite>
      <ScrollView>
        <TitleInviteScreen testID="InviteHeader">Invite a Friend to Try Jam</TitleInviteScreen>
        <Formik
          onSubmit={async (values, helpers) => handleSendInvitation(values, helpers)}
          validate={(values) => {
            const errors: { goes_by?: string; phone?: string } = {};
            if (!values.goes_by) {
              errors.goes_by = 'Please enter a name';
            }
            const isPhoneValid = isValidNumber(values.phone, countryCode);
            if (!isPhoneValid) {
              errors.phone = 'Please enter a valid number';
            }
            return errors;
          }}
          initialValues={{ inviterGoesBy: '', goes_by: '', phone: '' }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, values }) => (
            <FormView className="m-6">
              {!user?.goes_by && (
                <>
                  <TextLabel>Your first name</TextLabel>
                  <FormTextInput
                    autoComplete="name-given"
                    onChangeText={handleChange('inviterGoesBy')}
                    onBlur={handleBlur('inviterGoesBy')}
                    value={values.inviterGoesBy}
                    placeholder="We'll let them know it's you"
                    textContentType="givenName"
                    placeholderTextColor={isDark ? colors.gray[2] : colors.gray[4]}
                  />
                </>
              )}
              <TextLabel>Invitee&apos;s first name</TextLabel>
              <FormTextInput
                onChangeText={handleChange('goes_by')}
                onBlur={handleBlur('goes_by')}
                value={values.goes_by}
                placeholder="First name or whatever they like to go by"
                placeholderTextColor={isDark ? colors.gray[2] : colors.gray[4]}
                testID="goesBy-field"
              />
              <TextLabel>Their phone number</TextLabel>
              <StyledPhoneInput
                onChangeFormattedText={handleChange('phone')}
                onChangeText={(e) => setPhone(e)}
                value={phone}
                onChangeCountry={(country) => setCountryCode(country.cca2)}
              />
              <TextRecommendation>Recommend some jams that you think they&#8217;ll enjoy:</TextRecommendation>
              {jamsToRecommend}
              <Button
                testID="send-invitation-button"
                buttonStyle="Primary"
                onPress={handleSubmit}
                title="Send Invitation"
                buttonClassName="min-w-full flex items-center h-12 justify-center mt-6"
                titleClassName="font-sans-bold text-base"
                disabled={
                  !values.goes_by ||
                  !values.phone ||
                  errors.goes_by?.length > 0 ||
                  errors.phone?.length > 0 ||
                  isSubmitting
                }
                isLoading={isSubmitting}
              />
            </FormView>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaViewInvite>
  );
}
