/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

interface OTPInputProps {
  onSubmit: (otp: string) => void;
}

const VERIFICATION_CODE_LENGTH = 6;

function OTPInput(props: OTPInputProps) {
  const { onSubmit } = props;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: VERIFICATION_CODE_LENGTH });
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  useEffect(() => {
    if (value.length === VERIFICATION_CODE_LENGTH) {
      onSubmit(value);
    }
  }, [onSubmit, value]);

  // Auto focuses the input
  useEffect(() => {
    ref.current?.focus();
  }, [ref]);

  return (
    <View className="flex flex-row justify-center self-center align-middle">
      <CodeField
        testID="VerificationCodeInput"
        ref={ref}
        {...codeFieldProps}
        value={value}
        onChangeText={setValue}
        cellCount={VERIFICATION_CODE_LENGTH}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <Text
              key={`value-${index}`}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </Fragment>
        )}
      />
    </View>
  );
}

export default OTPInput;

const styles = StyleSheet.create({
  codeFieldRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  cell: {
    width: 36,
    height: 48,
    lineHeight: 24,
    fontSize: 20,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#00000030',
    textAlign: 'center',
    marginHorizontal: 8,
    paddingVertical: 10,
  },
  focusCell: { borderColor: '#6900bc', borderWidth: 2 },
});
