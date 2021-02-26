export default {
  requestPermissions: jest
    .fn()
    .mockImplementationOnce((success) => Promise.resolve(success({}))),
  cancelAllLocalNotifications: jest.fn(),
  removeAllDeliveredNotifications: jest.fn(),
};
