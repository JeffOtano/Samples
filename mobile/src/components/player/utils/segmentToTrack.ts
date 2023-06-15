import { PlaylistSegment } from '@jam/api-models';
import { Segment, Stream } from '@jam/prisma-shim';
import { JamTrack, TrackType } from '../../../types/player';

export function playlistSegmentToTrack(segment: PlaylistSegment): JamTrack {
  return {
    id: segment.id,
    url: segment.playbackUrl,
    title: segment.title,
    duration: segment.duration,
    artwork: segment.watermarkedImageUrl,
    segment,
    trackType: TrackType.Segment,
  };
}

export function segmentToTrack(segment: Segment, stream: Stream): JamTrack {
  return {
    id: segment.id,
    url: segment.publish_cdn,
    title: segment.title,
    duration: parseInt(segment.duration, 10),
    artwork: stream.image_url,
    segment: {
      id: segment.id,
      title: segment.title,
      duration: parseInt(segment.duration, 10),
      publishedAt: segment.published_at,
      playbackUrl: segment.publish_cdn,
      publishUri: segment.publish_uri,
      playbackCompleted: false,
      watermarkedImageUrl: stream.image_url,
      stream,
      restricted: segment.restricted,
    },
    trackType: TrackType.Segment,
  };
}

export function segmentIntroToTrack(segment: PlaylistSegment): JamTrack {
  return {
    url: segment.intro.playbackUrl,
    title: segment.title,
    artwork: segment.watermarkedImageUrl,
    segment,
    trackType: TrackType.Intro,
  };
}

export function convertToTrackPlayerPlaylist(playlist: PlaylistSegment[]): JamTrack[] {
  const tracks: JamTrack[] = [];

  playlist.forEach((segment) => {
    if (segment.intro) {
      tracks.push(segmentIntroToTrack(segment));
    }

    tracks.push(playlistSegmentToTrack(segment));
  });

  return tracks;
}
