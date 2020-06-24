/**
 * THIS LIBRARY FOR THIRD PARTY PACKAGE
 */
/** REDUX */
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
/** REDUX PERSIST */
import { PersistGate } from 'redux-persist/integration/react';
/** ICON */
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
/** MAPS */
import MapView, { Marker } from 'react-native-maps';
/** GEOLOCATION */
import Geolocation from 'react-native-geolocation-service';
/** NAVIGATION */
import { NavigationEvents } from 'react-navigation';
/** OPEN SETTING */
import OpenAppSettings from 'react-native-app-settings';
/** CAROUSEL */
import Carousel, { Pagination } from 'react-native-snap-carousel';
/** SKELETON */
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
/** TEXT */
import { RFPercentage } from 'react-native-responsive-fontsize';
/** SETTING */
import DeviceInfo from 'react-native-device-info';

export {
  /** REDUX */
  bindActionCreators,
  connect,
  Provider,
  /** REDUX PERSIST */
  PersistGate,
  /** ICON */
  MaterialIcon,
  MaterialCommunityIcons,
  OcticonsIcon,
  Ionicons,
  AntDesignIcon,
  /** MAPS */
  MapView,
  Marker,
  /** GEOLOCATION */
  Geolocation,
  /** NAVIGATION */
  NavigationEvents,
  /** OPEN SETTING */
  OpenAppSettings,
  /** CAROUSEL */
  Carousel,
  Pagination,
  /** SKELETON */
  SkeletonPlaceholder,
  /** TEXT */
  RFPercentage,
  /** SETTING */
  DeviceInfo
};
