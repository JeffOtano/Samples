import { mockDeep } from 'jest-mock-extended';

const ApiClient = mockDeep();

const checkHandleAvailability = jest.fn();
const loginWithOtp = jest.fn();
const postMessageToCreator = jest.fn();
const requestLoginOtp = jest.fn();
const sendInvitation = jest.fn();
const sendSupportMessage = jest.fn();
const updateHandle = jest.fn();
const useAggregationStreamsInclude = jest.fn();
const useUser = jest.fn();
const useUserAggregation = jest.fn();
const useUserSettings = jest.fn();

export {
  checkHandleAvailability,
  loginWithOtp,
  postMessageToCreator,
  requestLoginOtp,
  sendInvitation,
  sendSupportMessage,
  updateHandle,
  useAggregationStreamsInclude,
  useUser,
  useUserAggregation,
  useUserSettings,
};

export default ApiClient;
