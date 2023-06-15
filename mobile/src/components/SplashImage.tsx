import React from 'react';
import { View, Image } from 'react-native';
import Splash from '../../assets/images/Splash.png';

const SPLASH_IMAGE = Image.resolveAssetSource(Splash).uri;

type SplashImageProps = {
  imageClassName?: string;
  containerClassName?: string;
};

function SplashImage({ imageClassName, containerClassName }: SplashImageProps) {
  return (
    <View className={containerClassName}>
      <Image testID="SplashImage" source={{ uri: SPLASH_IMAGE }} className={imageClassName} />
    </View>
  );
}

export default SplashImage;
