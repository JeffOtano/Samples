import React from 'react';
import { dayjs, fractionMinute } from '@jam/utils';
import classNames from 'classnames';
import { Text, View } from 'react-native';

type SegmentDateDurationDetailsProps = {
  episodeNumber?: number | null;
  publishedAt?: string | null;
  streamType?: string | null;
  duration?: number | null;
  textClassname?: string;
};

function SegmentDateDurationDetails({
  textClassname,
  streamType,
  duration,
  episodeNumber,
  publishedAt,
}: SegmentDateDurationDetailsProps) {
  return (
    <View className={classNames('flex gap-1 flex-row')}>
      <Text className={classNames('font-sans-normal text-sm', textClassname)}>
        {streamType === 'series' ? `Episode ${episodeNumber}` : dayjs(publishedAt).fromNow()}
      </Text>
      <Text className={classNames('font-sans-normal text-sm', textClassname)}>&middot;</Text>
      <Text className={classNames('font-sans-normal text-sm whitespace-nowrap', textClassname)}>
        {duration && fractionMinute(duration)}
      </Text>
    </View>
  );
}

export default SegmentDateDurationDetails;
