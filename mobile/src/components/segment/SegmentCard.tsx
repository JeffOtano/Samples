import React from 'react';
import { View } from 'react-native';
import { Segment, Stream } from '@jam/prisma-shim';
import SegmentDateDurationDetails from './SegmentDateDurationDetails';
import StreamCoverImage from '../StreamCoverImage';
import { TextH4 } from '../text';

type SegmentCardProps = {
  segment: Segment;
  stream: Stream;
};

function SegmentCard({ segment, stream }: SegmentCardProps) {
  return (
    <View className="flex flex-1 flex-row space-x-6 justify-start">
      <StreamCoverImage stream={stream} mobileSize="sm" />
      <View className="flex flex-1 flex-col">
        <TextH4 numberOfLines={3} className="flex flex-wrap font-sans-bold text-base text-black-1 mb-1 dark:text-white">
          {segment.title}
        </TextH4>
        <SegmentDateDurationDetails
          streamType={stream?.stream_type}
          duration={Number(segment?.duration)}
          publishedAt={segment?.published_at}
          episodeNumber={segment?.number_in_series}
          textClassname="text-sm text-gray-2 dark:text-gray-4"
        />
      </View>
    </View>
  );
}

export default SegmentCard;
