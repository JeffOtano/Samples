import { NativeStackScreenProps } from '@react-navigation/native-stack';
import classnames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginWithOtp, requestLoginOtp } from '@jam/api-client';
import { setAccessToken } from '../../../lib/auth-manager';
import JamLogo from '../../../components/icons/JamLogo';
import OTPInput from '../../../components/login/OTPInput';
import { LoginStackParamList } from '../../../types/navigation';

const RESEND_OTP_TIME = 30;
const RESEND_OTP_MULTIPLIER = 2;
const PHONE_ENDING_LENGTH = 4;

type VerificationProps = NativeStackScreenProps<LoginStackParamList, 'Verification'>;

export default function VerificationScreen({ navigation, route }: VerificationProps) {
  const { phoneNumber } = route.params;
  const resendOTPWait = useRef(RESEND_OTP_TIME);
  const countDownRef = useRef(0);
  const [countDown, setCountDown] = useState(0);

  const createCountDown = (secs: number) => {
    countDownRef.current = secs;
    const interval = setInterval(() => {
      if (countDownRef.current > 0) {
        countDownRef.current -= 1;
        setCountDown(countDownRef.current);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return interval;
  };

  useEffect(() => {
    const interval = createCountDown(resendOTPWait.current);
    return () => clearInterval(interval);
  }, []);

  const submitOTP = useCallback(
    async (otp: string) => {
      const response = await loginWithOtp(phoneNumber, otp);
      if (response.token.length > 0) {
        await setAccessToken(response.token);
        navigation.replace('TabNavigator');
      } else {
        // eslint-disable-next-line no-alert
        alert('Invalid Verification Code'); // TODO: #66
      }
    },
    [navigation, phoneNumber],
  );

  const resendOTP = async () => {
    try {
      resendOTPWait.current *= RESEND_OTP_MULTIPLIER;
      createCountDown(resendOTPWait.current);

      await requestLoginOtp(phoneNumber);
    } catch (error) {
      createCountDown(resendOTPWait.current);
    }
  };

  return (
    <SafeAreaView className="dark:bg-slate-900 bg-white flex-1">
      <JamLogo containerClassName="items-center w-full" imageClassName="h-8 w-[68px] rounded" />
      <View className="items-center justify-center flex flex-1">
        <Text testID="VerificationHeader" className="text-center text-2xl text-black-0 mb-4 font-sans-bold">
          Verify It&apos;s You
        </Text>
        <Text className="text-center text-gray-2 w-72 mb-6 font-sans-normal">
          We sent a 6 digit code to your phone number ending{' '}
          {phoneNumber.slice(phoneNumber.length - PHONE_ENDING_LENGTH)}
        </Text>
        <OTPInput onSubmit={submitOTP} />
        <View className="flex-row justify-center align-middle mt-8">
          <Text className="text-gray-2 mr-1 font-sans-regular">Didn&apos;t receive a text?</Text>
          <TouchableOpacity onPress={() => countDown === 0 && resendOTP()} disabled={countDown > 0}>
            <Text
              className={classnames([
                'font-sans-bold',
                { 'text-plum-1': countDown === 0 },
                { 'text-gray-2': countDown > 0 },
              ])}
            >
              Resend {countDown > 0 && `in ${countDown} seconds`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
