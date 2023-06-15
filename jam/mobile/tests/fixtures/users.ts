import { User } from '@jam/prisma-shim';

const CREATOR: User = {
  id: 'creator-test-fixture',
  goes_by: 'Creator (Test Fixture)',
  phone: '+15551234578',
  email: 'creator@jam.ai',
  status: 'active',
  has_onboarded: true,
  created_at: '2022-10-18T20:49:46.485Z',
  updated_at: '2022-10-18T20:49:46.485Z',
  timezone: 'America/Los_Angeles',
  locale: 'en-US',
  is_admin: false,
  hidden: false,
  contact_platform: null,
  handle: 'creator_handle',
};
const LISTENER: User = {
  id: 'listener-test-fixture',
  goes_by: 'Listener (Test Fixture)',
  phone: '+14089876543',
  email: 'listener@jam.ai',
  status: 'active',
  has_onboarded: true,
  created_at: '2022-10-18T20:49:46.485Z',
  updated_at: '2022-10-18T20:49:46.485Z',
  timezone: 'America/Los_Angeles',
  locale: 'en-US',
  is_admin: false,
  hidden: false,
  contact_platform: null,
  handle: 'listener_handle',
};

export { CREATOR, LISTENER };
