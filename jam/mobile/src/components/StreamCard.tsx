import React, { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Stream } from '@jam/prisma-shim';
import { fractionMinute, kebabToCamel } from '@jam/utils';

import { Icons } from '@jam/web-icons';
import styled from 'styled-components/native';
import { RootStackParamList } from '../types';
import StreamTag from './StreamTag';
import Button from './Button';
import { TextH4, TextLink2, TextP2, TextP3 } from './text';

import StreamCoverImage from './StreamCoverImage';
import showSubsMessage from '../lib/utils/subs-message';
import removeFromPlaylist from './player/utils/removeFromPlaylist';
import { addStreamToPlaylist } from './player/utils/addToPlaylist';

const TextP3Capitalized = styled(TextP3)`
  text-transform: capitalize;
`;

interface StreamCardProps {
  myAggregationStreams: string[];
  onFollowChange?: () => void;
  stream: Stream;
}
function StreamCard({ myAggregationStreams, onFollowChange, stream }: StreamCardProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isFollowingStream, setIsFollowingStream] = useState(myAggregationStreams?.includes(stream?.id));
  const [isChangingFollowStatus, setIsChangingFollowStatus] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(2);

  const isPaidStream = stream.StripePrice?.length;

  const changeFollowStatus = useCallback(async () => {
    setIsChangingFollowStatus(true);
    if (isFollowingStream && !isPaidStream) {
      await removeFromPlaylist(stream.id);
      setIsFollowingStream(false);
    } else if (isFollowingStream && isPaidStream) {
      await showSubsMessage({ variant: 'unfollow', streamId: stream?.id });
    } else if (isPaidStream) {
      await showSubsMessage({ variant: 'follow', streamId: stream?.id });
    } else {
      await addStreamToPlaylist(stream.id);
      setIsFollowingStream(true);
    }
    setIsChangingFollowStatus(false);
    onFollowChange?.();
  }, [isFollowingStream, isPaidStream, onFollowChange, stream.id]);

  const showPaid = stream && (stream.restriction_mode === 'DefaultFalse' || stream.restriction_mode === 'DefaultTrue');
  return (
    <Pressable
      onPress={() => navigation.navigate('Stream', { streamId: stream.id })}
      className="flex flex-col rounded-3xl bg-white p-5 shadow-1 dark:bg-black-2 my-3 "
    >
      <View className="flex-row mb-2">
        <StreamCoverImage stream={stream} mobileSize="sm" />
        <View className="ml-3 w-2/3">
          <TextH4>{stream.name}</TextH4>
          <View className="flex-row">
            <TextP3>{stream?.avg_duration && `${fractionMinute(parseInt(stream.avg_duration, 10))}`} &middot; </TextP3>
            <TextP3Capitalized>{stream?.frequency}</TextP3Capitalized>
          </View>
        </View>
        {/* Check */}
        <View className="h-10 flex-col justify-center">
          <Button
            buttonClassName="rounded-full justify-center ml-4 p-2 w-8 h-8"
            buttonStyle={isFollowingStream ? 'Secondary' : 'Primary'}
            icon={isFollowingStream ? Icons.Checkmark : Icons.Plus}
            svgHeight="16px"
            svgWidth="16px"
            isLoading={isChangingFollowStatus}
            isOnlyIcon
            onPress={changeFollowStatus}
            title={isFollowingStream ? 'Added' : 'Add'}
            titleClassName="ml-1.5 hidden text-sm font-sans-bold leading-compact"
          />
        </View>
      </View>

      {/* Tags */}
      <View className="flex-row flex-wrap">
        {stream &&
          stream.tags &&
          stream.tags.map((tag) => <StreamTag text={kebabToCamel(tag)} tag={tag} key={`${tag}_${stream.id}`} />)}
        {stream && stream.contains_ads && <StreamTag text="Ads" />}
        {showPaid && <StreamTag text="Paid" />}
      </View>

      <Pressable
        onPress={() => {
          setNumberOfLines((prevState) => {
            if (prevState === 2) return 0;
            return 2;
          });
        }}
      >
        <View className="mt-2">
          {/* TODO@leira must add Read More... only if it's too long */}
          <TextP2 numberOfLines={numberOfLines}>{stream?.description}</TextP2>
          {numberOfLines === 2 && <TextLink2>read more</TextLink2>}
        </View>
      </Pressable>
    </Pressable>
  );
}

export default StreamCard;
