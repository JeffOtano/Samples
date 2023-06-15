import React from 'react';
import { Stream } from '@jam/prisma-shim';
import classNames from 'classnames';
import { View } from 'react-native';
import { resizeImage } from '@jam/utils';
import FastImage from 'react-native-fast-image';

const MOBILE_IMAGE_SIZES = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-[72px] h-[72px]',
  xl: 'w-20 h-20',
};
const MOBILE_IMAGE_ROUNDED = {
  sm: 'rounded-xl',
  md: 'rounded-2xl',
  lg: 'rounded-[20px]',
  xl: 'rounded-3xl',
};

function StreamCoverImage({
  mobileSize,
  stream,
}: {
  stream: Pick<Stream, 'image_url' | 'name'>;
  mobileSize: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const classes = classNames(
    `relative overflow-hidden border-0.5 border-black-0/10 `,
    MOBILE_IMAGE_SIZES[mobileSize],
    MOBILE_IMAGE_ROUNDED[mobileSize],
  );

  return (
    <View className={classes}>
      <FastImage source={{ uri: (stream?.image_url && resizeImage(stream?.image_url)) || '' }} className={classes} />
    </View>
  );
}

export default StreamCoverImage;
