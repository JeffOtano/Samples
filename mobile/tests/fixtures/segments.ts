import { Segment } from '@jam/prisma-shim';

const SEGMENT: Segment = {
  row_id: 1,
  id: '1',
  uploaded_at: '2020-01-01T00:00:00.000Z',
  publish_uri: 'https://example.com',
  publish_cdn: 'https://example.com',
  title: 'title',
  stream_id: '1',
  stream: {
    row_id: 1,
    id: '1',
    message_creator_enabled: true,
  },
  duration: '1',
  number_in_series: 1,
  notes: 'notes',
  UserSegmentRating: [],
  restricted: false,
};

export default SEGMENT;
