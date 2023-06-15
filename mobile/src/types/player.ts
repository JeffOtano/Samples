import { PlaylistSegment } from '@jam/api-models';
import { Track } from 'react-native-track-player';

export interface PlaylistSegmentMetadata {
  readonly playlistSegment: PlaylistSegment;
  readonly timeRemaining: number;
  readonly percentPlayed: number;
}

export enum TrackType {
  Intro = 'intro',
  Segment = 'segment',
}
export interface JamTrack extends Track {
  segment: PlaylistSegment;
  trackType: TrackType;
}
