jest.mock('react-native-device-info', () => {
  return {
    getVersion: jest.fn(),
    getBundleId: jest.fn(),
    getCarrier: jest.fn(),
    getDeviceLocale: jest.fn(),
    getDeviceCountry: jest.fn(),
    getDeviceName: jest.fn(),
    getDeviceId: jest.fn(),
    getManufacturer: jest.fn(),
    getBrand: jest.fn(),
    getModel: jest.fn(),
    getBuildNumber: jest.fn(),
    getSystemName: jest.fn(),
    getSystemVersion: jest.fn(),
    getBuildId: jest.fn(),
    hasNotch: jest.fn(),
    getFirstInstallTime: jest.fn(),
    getLastUpdateTime: jest.fn(),
    getAPILevel: jest.fn(),
    getUniqueID: jest.fn()
  };
});