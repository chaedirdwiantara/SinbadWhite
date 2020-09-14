// import { DeviceInfo} from '../library/thirdPartyPackage';
import { GlobalMethod } from '../services/methods';
import firebase from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';
import { Store } from '../state/Store';
export default async function logger(error, info) { 
  const stateData = Store.getState();
  
  let deviceData = {
    uniqueId: DeviceInfo.getUniqueId(),
    systemVersion: DeviceInfo.getSystemVersion(),
    appVersion: DeviceInfo.getVersion(),
    brand: DeviceInfo.getBrand(),
    deviceId: DeviceInfo.getDeviceId()
  };
  const ref = firebase.firestore().collection('error-mobile');
  await ref.add({
    platform: 'White',
      error: error.toString(),
      info: error.stack,
      deviceData,
      userId: stateData.user !== null ? stateData.user.id : 'not login',
      time: new Date()
  });
}
