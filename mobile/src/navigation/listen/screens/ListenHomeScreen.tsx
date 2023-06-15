import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import TrackPlayer, { State } from 'react-native-track-player';
import OneSignal from 'react-native-onesignal';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as RNLocalize from 'react-native-localize';
import { useUserAggregation, updateTimezone, usePlaylist, putPreferredContactPlatform, useUser } from '@jam/api-client';
import { useSWRNativeRevalidate } from '@nandorojo/swr-react-native';
import HistorySegmentList from '../../../components/history/HistorySegmentList';
import toast from '../../../lib/utils/toast';
import { FOCUS_INTERVAL_THROTTLE } from '../../../lib/swr';
import useIsPlaying from '../../../lib/hooks/useIsPlaying';
import ListenHeader from '../../../components/listen/ListenHeader';
import ListenSegmentList from '../../../components/listen/ListenSegmentList';
import { JamTrack, TrackType } from '../../../types/player';
import { start } from '../../../lib/utils/sonics';

const ListenHomeOuter = styled(SafeAreaView)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default function ListenHomeScreen() {
  const { mutate: mutatePlaylist } = usePlaylist();
  const { data: user } = useUser();
  const [visibleNotes, setVisibleNotes] = useState<Set<string>>(new Set());

  const isPlaying = useIsPlaying();
  const { data: userAggregation, mutate: mutateUseUserAggregation } = useUserAggregation();
  useSWRNativeRevalidate({ mutate: mutateUseUserAggregation, focusThrottleInterval: FOCUS_INTERVAL_THROTTLE });
  useSWRNativeRevalidate({ mutate: mutatePlaylist, focusThrottleInterval: FOCUS_INTERVAL_THROTTLE });

  const toggleNotes = useCallback(
    (id: string) => {
      const isVisible = visibleNotes.has(id);
      if (isVisible) {
        visibleNotes.delete(id);
      } else {
        visibleNotes.add(id);
      }

      setVisibleNotes(new Set(visibleNotes));
    },
    [visibleNotes],
  );

  const onPlayPauseClick = useCallback(async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      start.play(async () => {
        await TrackPlayer.play();
      });
    }
  }, [isPlaying]);

  const onSegmentClick = useCallback(async (segmentId: string) => {
    const playerState = await TrackPlayer.getState();

    const queue = (await TrackPlayer.getQueue()) as JamTrack[];
    const trackIndex = queue.findIndex(
      (track) => track.segment.id === segmentId && track.trackType === TrackType.Segment,
    );
    await TrackPlayer.skip(trackIndex);
    if (playerState !== State.Playing) {
      start.play(async () => {
        await TrackPlayer.play();
      });
    } else {
      await TrackPlayer.play();
    }
  }, []);

  useEffect(() => {
    const handleTimezoneChange = async () => {
      const deviceTimezone = RNLocalize.getTimeZone();
      if (userAggregation) {
        const didTimezoneChange = deviceTimezone !== userAggregation?.timezone;

        if (!didTimezoneChange) return;

        try {
          updateTimezone(deviceTimezone, userAggregation?.duration, String(userAggregation?.hour_local));
          toast.info({ message: `We've updated your timezone to match your device.` });
        } catch (error) {
          console.error('Failed to update timezone');
        }
      }
    };
    handleTimezoneChange();
  }, [userAggregation]);

  useEffect(() => {
    const handleOneSignal = async () => {
      const deviceState = await OneSignal.getDeviceState();
      if (deviceState?.isSubscribed === false) {
        OneSignal.addTrigger('prompt_notification', 'true');
        OneSignal.setExternalUserId(user.id);
      }
    };
    if (user?.id) {
      handleOneSignal();
    }
  }, [user?.id]);

  useEffect(() => {
    const setPreferredContactPlatformPush = async () => {
      await putPreferredContactPlatform('Push');
    };
    OneSignal.addPermissionObserver((event) => {
      // the push notification permission event object look differents between Android and iOS
      // event object from android: {"from": {"areNotificationsEnabled": false}, "to": {"areNotificationsEnabled": true}}
      // event object from iOS: {"from": {"hasPrompted": true, "provisional": false, "status": 0}, "to": {"hasPrompted": true, "provisional": false, "status": 2}}
      if (event?.to.areNotificationsEnabled || event?.to.status === 2) {
        setPreferredContactPlatformPush();
      }
    });
  }, []);

  return (
    <ScrollView className="bg-white dark:bg-black-0">
      <ListenHomeOuter>
        <HistorySegmentList onSegmentClick={onSegmentClick} visibleNotes={visibleNotes} onToggleNote={toggleNotes} />
        <ListenHeader isPlaying={isPlaying} onPlayPauseClick={onPlayPauseClick} />
        <ListenSegmentList onSegmentClick={onSegmentClick} onToggleNote={toggleNotes} visibleNotes={visibleNotes} />
      </ListenHomeOuter>
    </ScrollView>
  );
}
