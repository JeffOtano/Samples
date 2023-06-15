import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { useUserSegmentEventPages } from '@jam/api-client';
import { calendarDate, dayjs } from '@jam/utils';
import styled from 'styled-components/native';
import ListenSegmentCoverImage from '../listen/ListenSegmentCoverImage';
import ListenSegmentTitleArea from '../listen/ListenSegmentTitleArea';
import ThreeDotsMenuButton from '../ThreeDotsMenuButton';
import InteractiveBar from '../segment/InteractiveBar';
import PlaylistHistoryButton from './PlaylistHistoryButton';
import BottomBorder from '../styledComponents/BottomBorder';
import { TextH3 } from '../text';
import ListenSegmentNotes from '../listen/ListenSegmentNotes';

const DEFAULT_PAGE_LIMIT = 5;

const HistorySegmentListOuter = styled.View`
  flex-direction: column;
  display: flex;
`;

const HistoryGroupTitle = styled.View`
  flex-direction: column;
  display: flex;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 12px;
`;

const HistoryGroupOuter = styled.View`
  flex-direction: column;
  display: flex;
  margin-left: 24px;
  padding-top: 20px;
  padding-bottom: 12px;
`;

const HistoryGroupInner = styled.View`
  flex-direction: row;
  display: flex;
`;

type HistorySegmentListProps = {
  onSegmentClick: (segmentId: string) => void;
  visibleNotes: Set<string>;
  onToggleNote: (segmentId: string) => void;
};

function HistorySegmentList({ onSegmentClick, visibleNotes, onToggleNote }: HistorySegmentListProps) {
  const { pages, pageNumber, setPageNumber, currentCount } = useUserSegmentEventPages(DEFAULT_PAGE_LIMIT);
  const [showingHistory, setShowingHistory] = useState<boolean>(false);
  const totalCount = (pages && pages[0].totalCount) ?? 0;
  const shouldShowHistoryButton = totalCount > currentCount || !showingHistory;

  useEffect(() => {
    setPageNumber(1);
  }, [setPageNumber]);

  const onShowHistoryClick = useCallback(() => {
    if (showingHistory) {
      setPageNumber(pageNumber + 1);
    } else {
      setShowingHistory(true);
    }
  }, [pageNumber, setPageNumber, showingHistory]);

  let currentDateHeading: string | undefined;

  return (
    <HistorySegmentListOuter>
      {shouldShowHistoryButton && <PlaylistHistoryButton onShowHistory={onShowHistoryClick} />}
      {showingHistory &&
        pages?.reduceRight((nodes, currentPage) => {
          currentPage.data.reduceRight((_, userSegmentEvent) => {
            const { segment, segment_id: segmentId, event, updated_at: updatedAt } = userSegmentEvent;
            const segmentDate = dayjs(updatedAt).format('MMMM D, YYYY');
            const showDate = segmentDate !== currentDateHeading;
            currentDateHeading = segmentDate;

            const rating =
              userSegmentEvent.segment.UserSegmentRating.length > 0
                ? userSegmentEvent.segment.UserSegmentRating[0].rating
                : 'false';

            nodes.push(
              <View key={updatedAt}>
                {showDate && (
                  <HistoryGroupTitle>
                    <TextH3>{calendarDate(currentDateHeading)}</TextH3>
                    <BottomBorder />
                  </HistoryGroupTitle>
                )}

                <HistoryGroupOuter>
                  <HistoryGroupInner>
                    <ListenSegmentCoverImage
                      segment={{ id: segmentId, stream: segment.stream }}
                      onSegmentClick={() => Alert.alert('Coming soon!')}
                      completed={event === 'completedInPlaylist'}
                    />
                    <ListenSegmentTitleArea
                      onSegmentClick={onSegmentClick}
                      segment={{ id: segmentId, title: segment.title, stream: segment.stream, notes: segment.notes }}
                      onToggleNote={onToggleNote}
                    />
                    <ThreeDotsMenuButton
                      segment={{
                        stream: segment.stream,
                        publishUri: segment.publish_uri,
                        title: segment.title,
                        id: segment.id,
                      }}
                    />
                  </HistoryGroupInner>
                </HistoryGroupOuter>
                <ListenSegmentNotes
                  segmentId={segmentId}
                  segmentNotes={segment.notes}
                  visibleNotes={visibleNotes}
                  onToggleNote={onToggleNote}
                />
                <InteractiveBar
                  segment={{
                    id: segmentId,
                    publishUri: segment.publish_uri,
                    rating,
                    stream: segment.stream,
                    title: segment.title,
                  }}
                />
              </View>,
            );
            return nodes;
          }, nodes);

          return nodes;
        }, new Array<ReactNode>())}
    </HistorySegmentListOuter>
  );
}

export default HistorySegmentList;
