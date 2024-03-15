jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js', () => {
  const { EventEmitter } = require('events');
  return EventEmitter;
});

jest.mock('react-native-fs', () => {
  return {
    mkdir: jest.fn(),
    moveFile: jest.fn(),
    copyFile: jest.fn(),
    pathForBundle: jest.fn(),
    pathForGroup: jest.fn(),
    getFSInfo: jest.fn(),
    getAllExternalFilesDirs: jest.fn(),
    unlink: jest.fn(),
    exists: jest.fn(),
    stopDownload: jest.fn(),
    resumeDownload: jest.fn(),
    isResumable: jest.fn(),
    stopUpload: jest.fn(),
    completeHandlerIOS: jest.fn(),
    readDir: jest.fn(),
    readDirAssets: jest.fn(),
    existsAssets: jest.fn(),
    readdir: jest.fn(),
    setReadable: jest.fn(),
    stat: jest.fn(),
    readFile: jest.fn(),
    read: jest.fn(),
    readFileAssets: jest.fn(),
    hash: jest.fn(),
    copyFileAssets: jest.fn(),
    copyFileAssetsIOS: jest.fn(),
    copyAssetsVideoIOS: jest.fn(),
    writeFile: jest.fn(),
    appendFile: jest.fn(),
    write: jest.fn(),
    downloadFile: jest.fn(),
    uploadFiles: jest.fn(),
    touch: jest.fn(),
    MainBundlePath: jest.fn(),
    CachesDirectoryPath: jest.fn(),
    DocumentDirectoryPath: jest.fn(),
    ExternalDirectoryPath: jest.fn(),
    ExternalStorageDirectoryPath: jest.fn(),
    TemporaryDirectoryPath: jest.fn(),
    LibraryDirectoryPath: jest.fn(),
    PicturesDirectoryPath: jest.fn()
  };
});

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
    getUniqueID: jest.fn(),
    isTablet: jest.fn()
  };
});
