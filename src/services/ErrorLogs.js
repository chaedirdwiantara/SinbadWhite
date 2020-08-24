import { DeviceInfo, firebase } from '../library/thirdPartyPackage';
import { GlobalMethod } from '../services/methods';

export default async function logger(error, info) {
  let userId = GlobalMethod.userId();
  let deviceData = {
    uniqueId: DeviceInfo.getUniqueId(),
    systemVersion: DeviceInfo.getSystemVersion(),
    appVersion: DeviceInfo.getVersion(),
    brand: DeviceInfo.getBrand(),
    deviceId: DeviceInfo.getDeviceId()
  };
  firebase
    .firestore()
    .collection('error-mobile')
    .add({
      platform: 'White',
      error: error.toString(),
      info: error.stack,
      deviceData,
      userId: userId,
      time: new Date()
    });
}
