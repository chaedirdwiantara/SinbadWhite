import ReactMoE, { MoEProperties, MoEGeoLocation } from 'react-native-moengage';

/**
 * Send data to MoEngage
 * @param { string } eventName - Provide event name
 * @param { Object } data - Data must be Object
 * @param { Object } location - [Optional] Provide latitude and longitude
 * @param { number } location.latitude - [Optional] Provide latitude
 * @param { number } location.longitude - [Optional] Provide longitude
 */
function SnbRecord(eventName, data, location) {
  if (typeof eventName !== 'string' && eventName === null) {
    errorHandlingType('String');
  }
  if (typeof data !== 'object' && data === null) {
    errorHandlingType('Object');
  }

  try {
    let properties = new MoEProperties();
    for (var key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        properties.addAttribute(key, data[key]);
      }
    }
    if (typeof location === 'object' && location !== null) {
      properties.addLocationAttribute(
        'store_location',
        new MoEGeoLocation(location.latitude, location.longitude)
      );
    }
    ReactMoE.trackEvent(eventName, properties);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Create user attribute
 * @param { Object } Data - Data must be Object
 * @param { Object } location - [Optional] Provide latitude and longitude
 * @param { number } location.latitude - [Optional] Provide latitude
 * @param { number } location.longitude - [Optional] Provide longitude
 */
function SnbSetAttribute(data, location) {
  for (var key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      ReactMoE.setUserAttribute(key, data[key]);
    }
  }
  if (typeof location === 'object' && location !== null) {
    ReactMoE.setUserAttributeLocation(
      'Store Location',
      new MoEGeoLocation(location.latitude, location.longitude)
    );
  }
}

/**
 * Error Handling Type
 * @param {*} errorName - Throw type error name
 */
function errorHandlingType(errorName) {
  throw TypeError(`Wrong type given, expected ${errorName}`);
}

export { SnbRecord, SnbSetAttribute };
