import { PlaylistSegment } from '@jam/api-models';
import { Stream } from '@jam/prisma-shim';

export type CategoryHome = { label: string; myAggregationStreams: Array<string>; publishUri: string };
export type SearchHome = { myAggregationStreams: Array<string> };
export type SegmentHome = { segmentId: string; stream: Stream };
export type StreamHome = { streamId: string };
export type StreamTagHome = { tag: string };
export type ThreeDotsMenu = { segment: Pick<PlaylistSegment, 'stream' | 'publishUri' | 'id' | 'title'> };
export type SendMessageScreenModal = { title: string; segmentId: string };
export type Webview = { uri: string };

export type LoginStackParamList = {
  LoginHome: undefined;
  Verification: { phoneNumber: string };
  TabNavigator: undefined;
};

export type ListenStackParamList = {
  ListenHome: undefined;
  Segment: SegmentHome;
  Stream: StreamHome;
  ThreeDotsMenu: ThreeDotsMenu;
  Webview: Webview;
};

export type DiscoverStackParamList = {
  DiscoverHome: undefined;
  Category: CategoryHome;
  Search: SearchHome;
  Segment: SegmentHome;
  Stream: StreamHome;
  StreamTag: StreamTagHome;
  TabNavigator: undefined;
  Webview: Webview;
};

export type InviteStackParamList = {
  InviteHome: undefined;
};

export type SettingsStackParamList = {
  DeliveryTime: undefined;
  Developer: undefined;
  EditPlaylist: undefined;
  LoginStack: undefined;
  Segment: SegmentHome;
  SettingsHome: undefined;
  Stream: StreamHome;
  StreamTag: StreamTagHome;
  Webview: Webview;
  Invite: undefined;
  ContactSupportScreenModal: undefined;
  EditHandle: undefined;
};

export type RootStackParamList = {
  LoginStack: undefined;
  Splash: undefined;
  TabNavigator: undefined;
  ThreeDotsMenu: ThreeDotsMenu;
  Segment: SegmentHome;
  Stream: StreamHome;
  StreamTag: StreamTagHome;
  Webview: Webview;
  ListenHome: undefined;
  SettingsHome: undefined;
  SendMessageScreenModal: SendMessageScreenModal;
  ContactSupportScreenModal: undefined;
};
