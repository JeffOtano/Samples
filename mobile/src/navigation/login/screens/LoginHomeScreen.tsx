import React, { useCallback, useState } from 'react';
import { View, Text, Linking, Pressable } from 'react-native';
import classnames from 'classnames';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { requestLoginOtp } from '@jam/api-client';
import { isValidNumber } from 'react-native-phone-number-input';
import { CountryCode } from 'react-native-country-picker-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import JamLogo from '../../../components/icons/JamLogo';
import { LoginStackParamList } from '../../../types';
import StyledPhoneInput from '../../../components/login/StyledPhoneInput';

type Props = NativeStackScreenProps<LoginStackParamList, 'LoginHome'>;

export default function LoginHomeScreen({ navigation }: Props) {
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [plainPhoneNumber, setPlainPhoneNumber] = useState('');

  const submitPhoneNumber = useCallback(async () => {
    const otpSent = await requestLoginOtp(formattedPhoneNumber);
    if (otpSent) {
      navigation.navigate('Verification', { phoneNumber: formattedPhoneNumber });
    } else {
      // eslint-disable-next-line no-alert
      alert('Something went wrong. Please try again.'); // TODO: #66
    }
  }, [formattedPhoneNumber, navigation]);

  const handlePhoneNumberChange = useCallback(
    (phoneNumber: string) => {
      setFormattedPhoneNumber(phoneNumber);
      const isValid = isValidNumber(phoneNumber, countryCode);
      setIsPhoneNumberValid(isValid);
    },
    [countryCode],
  );

  return (
    <SafeAreaView className="flex-col bg-white dark:bg-slate-900 flex-1">
      <JamLogo containerClassName="items-center w-full" imageClassName="h-8 w-[68px] rounded" />

      <View className="items-center justify-center flex-1 px-6">
        <Text className={classnames(['text-center text-black-0 text-2xl mb-6 font-sans-bold'])} testID="LoginHeader">
          Enter Your Phone Number to Continue
        </Text>
        <StyledPhoneInput
          onChangeFormattedText={handlePhoneNumberChange}
          onChangeCountry={(country) => setCountryCode(country.cca2)}
          onChangeText={(phone) => setPlainPhoneNumber(phone)}
          value={plainPhoneNumber}
        />
        <Pressable
          className={classnames([
            'h-12 w-full justify-center rounded-lg',
            { 'bg-plum-2': !isPhoneNumberValid },
            { 'bg-plum-1': isPhoneNumberValid },
          ])}
          onPress={submitPhoneNumber}
          disabled={!isPhoneNumberValid}
          testID="LoginButton"
        >
          <Text
            className={classnames([
              'text-center font-sans-bold',
              { 'text-plum-1 opacity-50': !isPhoneNumberValid },
              { 'text-white': isPhoneNumberValid },
            ])}
          >
            Continue
          </Text>
        </Pressable>
        <Text className="text-justify text-xs mt-6 text-gray-3 font-sans-normal">
          Jam sends daily audio playlists via SMS. You have the option to opt out and not receive messages. Message and
          data rates may apply. Reply HELP for help or STOP to cancel.
          <Text
            className="text-plum-1 font-sans-normal"
            onPress={() => Linking.openURL('https://www.jam.ai/sms-terms')}
          >
            {' '}
            Jam SMS Terms
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
