import CartGlobal from '../components/CartGlobal';
/** SEARCH BAR */
import SearchBarType1 from '../components/search_bar/SearchBarType1';
import SearchBarType2 from '../components/search_bar/SearchBarType2'
import SearchBarType3 from '../components/search_bar/SearchBarType3';
/** BACK HANDLER */
import BackHandlerCloseApp from '../components/BackHandlerCloseApp';
import BackHandlerBackSpecific from '../components/BackHandlerBackSpecific';
/** STATUS BAR */
import {
  StatusBarRed,
  StatusBarWhite,
  StatusBarRedOP50,
  StatusBarBlackOP40,
  StatusBarTransparent,
  StatusBarTransparentBlack,
  StatusBarBlackOP40Translucent,
  StatusBarBlack
} from '../components/StatusBarGlobal';
/** INPUT */
import InputType1 from '../components/input/InputType1'
import InputType2 from '../components/input/InputType2';
import InputType3 from '../components/input/InputType3'
import InputType4 from '../components/input/inputType4';
/** INPUT MAPS (PIN POINT) */
import InputMapsType1 from '../components/input/InputMapsType1';
import InputMapsType2 from '../components/input/InputMapsType2'
/** DROPDOWN */
import DropdownType1 from '../components/input/DropdownType1';
import DropdownType2 from '../components/input/DropdownType2';
/** BUTTON */
import OrderButton from '../components/OrderButton'
import ButtonFloatType1 from '../components/button/ButtonFloatType1'
import ButtonSingle from '../components/button/ButtonSingle';
import ButtonMenuType1 from '../components/button/ButtonMenuType1';
import ButtonSingleSmall from '../components/button/ButtonSingleSmall'
/** MODAL */
import ModalBottomWithClose from '../components/modal_bottom/ModalBottomSwipeCloseNotScroll'
import ModalBottomSkuNotAvailable from '../components/error/ModalBottomSkuNotAvailable'
import ModalWarning from '../components/modal/ModalWarning'
import ModalConfirmation from '../components/modal/ModalConfirmation';
import ModalConfirmationType2 from '../components/modal/ModalConfirmationType2'
import ModalBottomErrorPinMap from '../components/error/ModalBottomErrorPinMap';
import ModalBottomSwipeCloseNotScroll from '../components/modal_bottom/ModalBottomSwipeCloseNotScroll';
import ModalBottomType1 from '../components/modal_bottom/ModalBottomType1';
import ModalBottomType2 from '../components/modal_bottom/ModalBottomType2'
import ModalBottomType3 from '../components/modal_bottom/ModalBottomType3';
import ModalBottomType4 from '../components/modal_bottom/ModalBottomType4'
/** ERROR MODAL */
import ModalBottomErrorRespons from '../components/error/ModalBottomErrorRespons';
/** OTP */
import OtpInput from '../components/otp/OtpInput';
import OtpResend from '../components/otp/OtpResend';
/** PROGRESS BAR */
import ProgressBarType1 from '../components/progress_bar/ProgressBarType1';
import ProgressBarType2 from '../components/progress_bar/ProgressBarType2';
/** LOADING */
import { LoadingPage, LoadingLoadMore, LoadingHorizontal } from '../components/Loading';
/** ERROR PAGE */
import ErrorPageNoGPS from '../components/error/ErrorPageNoGPS';
import ErrorPage from '../components/error/ErrorPage'
/** TOAST */
import ToastType1 from '../components/toast/ToastType1';
/** LIST */
import ProductListType1 from '../components/list/ProductListType1'
import ProductListType2 from '../components/list/ProductListType2'
/** EMPTY DATA */
import ComingSoon from '../components/empty_state/ComingSoon'
import EmptyData from '../components/empty_state/EmptyData';
/** SKELETON */
import SkeletonType1 from '../components/skeleton/SkeletonType1'
import SkeletonType2 from '../components/skeleton/SkeletonType2'
import SkeletonType3 from '../components/skeleton/SkeletonType3'
import SkeletonType4 from '../components/skeleton/SkeletonType4'
import SkeletonType5 from '../components/skeleton/SkeletonType5'
import SkeletonType6 from '../components/skeleton/SkeletonType6'
import SkeletonType7 from '../components/skeleton/SkeletonType7'
import SkeletonType8 from '../components/skeleton/SkeletonType8'
import SkeletonType18 from '../components/skeleton/SkeletonType18'
/** ADDRESS */
import Address from '../components/Address'
/** TAG */
import TagListType1 from '../components/tag/TagListType1'
import TagListType2 from '../components/tag/TagListType2'
/** DATE PICKER SPINNER */
import DatePickerSpinner from '../components/DatePickerSpinner'
/** SELECTED MERCHANT */
import SelectedMerchantName from '../components/SelectedMerchantName'
/** ERROR BOUNDARY */
import ErrorBoundary from '../components/error/ErrorBoundary'
/** CARD */
import Shadow from '../components/card/shadow';
/** TABS */
import TabsCustom, { typeCustomTabs } from '../components/tabs/tabsCustom';
import Charts from '../components/charts';

export {
  CartGlobal,
  /** SEARCH BAR */
  SearchBarType1,
  SearchBarType2,
  SearchBarType3,
  /** BACK HANDLER */
  BackHandlerCloseApp,
  BackHandlerBackSpecific,
  /** STATUS BAR */
  StatusBarRed,
  StatusBarWhite,
  StatusBarRedOP50,
  StatusBarBlackOP40,
  StatusBarTransparent,
  StatusBarTransparentBlack,
  StatusBarBlackOP40Translucent,
  StatusBarBlack,
  /** INPUT */
  InputType1,
  InputType2,
  InputType3,
  InputType4,
  /** INPUT MAPS (PIN POINT) */
  InputMapsType1,
  InputMapsType2,
  /** DROPDOWN */
  DropdownType1,
  DropdownType2,
  /** BUTTON */
  OrderButton,
  ButtonFloatType1,
  ButtonSingle,
  ButtonMenuType1,
  ButtonSingleSmall,
  /** MODAL */
  ModalBottomWithClose,
  ModalBottomSkuNotAvailable,
  ModalWarning,
  ModalConfirmation,
  ModalConfirmationType2,
  ModalBottomErrorPinMap,
  ModalBottomSwipeCloseNotScroll,
  ModalBottomType1,
  ModalBottomType2,
  ModalBottomType3,
  ModalBottomType4,
  /** ERROR MODAL */
  ModalBottomErrorRespons,
  /** OTP */
  OtpInput,
  OtpResend,
  /** PROGRESS BAR */
  ProgressBarType1,
  ProgressBarType2,
  /** LOADING */
  LoadingPage,
  LoadingLoadMore,
  LoadingHorizontal,
  /** ERROR PAGE */
  ErrorPageNoGPS,
  ErrorPage,
  /** TOAST */
  ToastType1,
  /** LIST */
  ProductListType1,
  ProductListType2,
  /** EMPTY DATA */
  ComingSoon,
  EmptyData,
  /** SKELETON */
  SkeletonType1,
  SkeletonType2,
  SkeletonType3,
  SkeletonType4,
  SkeletonType5,
  SkeletonType6,
  SkeletonType7,
  SkeletonType8,
  SkeletonType18,
  /** ADDRESS */
  Address,
  /** TAG */
  TagListType1,
  TagListType2,
  /** DATE PICKER SPINNER */
  DatePickerSpinner,
  /** SELECTED MERCHANT NAME */
  SelectedMerchantName,
  /** Error Boundary */
  ErrorBoundary,
  /** CARD */
  Shadow,
  /** TABS */
  TabsCustom,
  typeCustomTabs,
  Charts
};

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Dyah
 * updatedDate: 04082020
 * updatedFunction:
 * -> Add new component (Shadow, ProgressBarType2)
 *
 */
