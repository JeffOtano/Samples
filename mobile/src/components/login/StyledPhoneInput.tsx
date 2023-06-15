/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import PhoneInput, { PhoneInputProps } from 'react-native-phone-number-input';
import { StyleSheet } from 'react-native';

const PHONE_PLACEHOLDER = '(201) 555-0123';

function StyledPhoneInput({
  value,
  defaultValue,
  disabled,
  disableArrowIcon,
  onChangeCountry,
  onChangeText,
  onChangeFormattedText,
  renderDropdownImage,
  filterProps,
}: PhoneInputProps) {
  const [inputBorderColor, setInputBorderColor] = React.useState('#dedede');

  return (
    <PhoneInput
      autoFocus
      defaultCode="US"
      layout="first"
      defaultValue={defaultValue}
      disabled={disabled}
      disableArrowIcon={disableArrowIcon}
      placeholder={PHONE_PLACEHOLDER}
      onChangeCountry={onChangeCountry}
      onChangeText={onChangeText}
      onChangeFormattedText={onChangeFormattedText}
      renderDropdownImage={renderDropdownImage}
      containerStyle={{ ...styles.container, borderColor: inputBorderColor }}
      textContainerStyle={styles.textContainer}
      textInputProps={{
        testID: 'PhoneInput',
        value,
        autoComplete: 'tel',
        keyboardType: 'numeric',
        textContentType: 'telephoneNumber',
        onFocus: () => setInputBorderColor('#6900bc'),
        onBlur: () => setInputBorderColor('#dedede'),
      }}
      textInputStyle={styles.textInput}
      codeTextStyle={styles.codeText}
      flagButtonStyle={styles.flagButton}
      countryPickerProps={{ countryCodes: ['US', 'GB', 'CA'], withEmoji: false, renderFlagButton: null }}
      filterProps={filterProps}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: 14,
    backgroundColor: 'transparent',
    height: 40,
    fontFamily: 'Lato-Regular',
  },
  container: {
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
    height: 48,
    width: '100%',
  },
  textContainer: { borderRadius: 12, backgroundColor: 'transparent' },
  codeText: { display: 'none' },
  flagButton: { backgroundColor: 'transparent', paddingBottom: 4 },
});

export default StyledPhoneInput;
