/* eslint-disable react/no-unused-prop-types */
import React, { useMemo } from 'react';
import { View } from 'react-native';
import classNames from 'classnames';
import TrackPlayer, { useTrackPlayerEvents, Event } from 'react-native-track-player';
import ListenSegmentCoverImage from './ListenSegmentCoverImage';
import ListenSegmentTitleArea from './ListenSegmentTitleArea';
import ListenSegmentProgressBar from './ListenSegmentProgressBar';
import ThreeDotsMenuButton from '../ThreeDotsMenuButton';
import InteractiveBar from '../segment/InteractiveBar';
import useQueue from '../../lib/hooks/useQueue';
import ListenSegmentNotes from './ListenSegmentNotes';

type ListenSegmentListProps = {
  onSegmentClick: (segmentId: string) => void;
  onToggleNote: (segmentId: string) => void;
  visibleNotes?: Set<string>;
};

function ListenSegmentList({ onSegmentClick, onToggleNote, visibleNotes }: ListenSegmentListProps) {
  const interactiveSegments = useMemo(() => new Set<string>(), []);
  const { queue, currentSegment } = useQueue();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== undefined) {
      const nextTrack = await TrackPlayer.getTrack(event.nextTrack);
      interactiveSegments.add(nextTrack.segment.id);
    }
  });

  return (
    <View className="mt-4 pb-10 flex flex-col">
      {queue.map((track) => (
        <View
          key={track.id}
          className={classNames([
            'flex-col py-4',
            { 'bg-gray-9 dark:bg-black-1 ': track.segment.id === currentSegment.id },
          ])}
        >
          <>
            <View className="flex-row ml-6">
              <ListenSegmentCoverImage
                segment={track.segment}
                onSegmentClick={onSegmentClick}
                completed={track.segment.playbackCompleted}
              />
              <ListenSegmentTitleArea
                segment={track.segment}
                onSegmentClick={onSegmentClick}
                onToggleNote={onToggleNote}
              />
              <ThreeDotsMenuButton segment={track.segment} />
            </View>
            <ListenSegmentNotes
              segmentNotes={track.segment.notes}
              segmentId={track.segment.id}
              visibleNotes={visibleNotes}
              onToggleNote={onToggleNote}
            />
            {currentSegment && track.segment.id === currentSegment.id && (
              <ListenSegmentProgressBar playlistSegment={track.segment} />
            )}
            {interactiveSegments.has(track.segment.id) && <InteractiveBar segment={track.segment} />}
          </>
        </View>
      ))}
    </View>
  );
}

export default ListenSegmentList;
