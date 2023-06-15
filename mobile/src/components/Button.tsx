import React from 'react';
import classNames from 'classnames';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Icons } from '@jam/web-icons';
import ParameterizedIcon from './icons/ParameterizedIcon';

interface ButtonProps {
  buttonClassName?: string;
  buttonStyle: 'Primary' | 'Secondary';
  disabled?: boolean;
  icon?: Icons;
  svgHeight?: string;
  svgWidth?: string;
  isLoading?: boolean;
  isOnlyIcon?: boolean;
  onPress: () => void;
  testID?: string;
  title: string;
  titleClassName?: string;
}

function Button({
  buttonClassName,
  buttonStyle,
  disabled,
  icon,
  svgHeight,
  svgWidth,
  isLoading,
  isOnlyIcon,
  onPress,
  testID,
  title,
  titleClassName,
}: ButtonProps) {
  return (
    <Pressable
      testID={testID}
      disabled={disabled}
      onPress={onPress}
      className={classNames([
        `inline-flex max-w-[200] max-h-14 rounded-xl p-2`,
        { 'bg-plum-2 dark:bg-dragonfruit-1/50': disabled },
        { 'bg-plum-1 dark:bg-dragonfruit-1': buttonStyle === 'Primary' && !disabled },
        { 'bg-plum-2 dark:bg-dragonfruit-1/30 ': buttonStyle === 'Secondary' && !disabled },
        buttonClassName,
      ])}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={buttonStyle === 'Primary' ? 'white' : 'black'} />
      ) : (
        <View className={`flex items-center ${!isOnlyIcon && 'flex-row'}`}>
          {icon && (
            <ParameterizedIcon
              icon={icon}
              height={svgHeight}
              width={svgWidth}
              buttonStyle={buttonStyle}
              disabled={disabled}
            />
          )}
          {!isOnlyIcon && (
            <Text
              className={classNames([
                titleClassName,
                { 'text-white dark:text-black-1 text-center font-sans-bold': buttonStyle === 'Primary' && !disabled },
                { 'text-plum-1 dark:text-dragonfruit-1 font-sans-bold': buttonStyle === 'Secondary' && !disabled },
                { 'text-plum-3 dark:text-black-1 font-sans-bold': disabled },
              ])}
            >
              {title}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

export default Button;
