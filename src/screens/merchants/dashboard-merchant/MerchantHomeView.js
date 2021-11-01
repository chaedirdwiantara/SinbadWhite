/* eslint-disable react/no-did-update-set-state */
import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
  Image,
  Text
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  moment,
  MaterialIcon,
  RFPercentage,
  Button,
  MaterialCommunityIcons
} from '../../../library/thirdPartyPackage';
import {
  StatusBarRed,
  ProductListType1,
  LoadingPage,
  ToastType1,
  ModalConfirmation,
  ModalBottomErrorRespons,
  ModalConfirmationType6
} from '../../../library/component';
import { GlobalStyle, Fonts, MoneyFormat } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import ModalBottomMerchantCheckout from './ModalBottomMerchantCheckout';
import ModalBottomSuccessOrder from './ModalBottomSuccessOrder';
import MerchantVerifyUser from './MerchantVerifyUser';
import ModalBeforeCheckIn from './ModalBeforeCheckIn';
import ModalBottomProgressChecking from '../../global/ModalBottomProgressChecking';
import {
  ACTIVITY_JOURNEY_PLAN_CHECK_IN,
  ACTIVITY_JOURNEY_PLAN_CHECK_OUT,
  ACTIVITY_JOURNEY_PLAN_ORDER,
  ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY,
  ACTIVITY_JOURNEY_PLAN_RETUR,
  ACTIVITY_JOURNEY_PLAN_STOCK,
  ACTIVITY_JOURNEY_PLAN_COLLECTION,
  ACTIVITY_JOURNEY_PLAN_COLLECTION_ONGOING,
  ACTIVITY_JOURNEY_PLAN_COLLECTION_NOT_SUCCESS,
  ACTIVITY_JOURNEY_PLAN_COLLECTION_SUCCESS
} from '../../../constants';
import _ from 'lodash';

const { width, height } = Dimensions.get('window');

const PENAGIHAN_TASK = {
  name: 'Penagihan',
  title: 'Tagih',
  goTo: 'collection',
  activity: ACTIVITY_JOURNEY_PLAN_COLLECTION
};

class MerchantHomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCheckout: false,
      openModalConfirmNoOrder: false,
      openModalErrorGlobal: false,
      openModalCheckUser: false,
      openModalProgressChecking: false,
      openModalBeforeCheckIn: false,
      openModalOverdue: false,
      openModalConfirmNoCollection: false,
      checkNoOrder: false,
      showToast: false,
      loadingPostForCheckoutNoOrder: false,
      notifToast: '',
      menu: [
        {
          menuName: 'Order',
          icon: require('../../../assets/icons/merchant/order.png'),
          goTo: 'pdp'
        },
        {
          menuName: 'Pesanan',
          icon: require('../../../assets/icons/merchant/pesanan.png'),
          goTo: 'history'
        },
        {
          menuName: 'Masuk Toko',
          icon: require('../../../assets/icons/merchant/check-in.png'),
          goTo: 'checkIn'
        },
        {
          menuName: 'Survei',
          icon: require('../../../assets/icons/merchant/pesanan.png'),
          goTo: 'survey'
        },
        {
          menuName: 'Catatan Stok',
          goTo: 'stock'
        },
        {
          menuName: 'Keluar Toko',
          icon: require('../../../assets/icons/merchant/check-out.png'),
          goTo: 'checkOut'
        }
      ],
      /**
       * Tasks[index].activity is used to compare journey plan activity logs
       */
      task: [
        {
          name: 'Masuk Toko',
          title: 'Masuk',
          goTo: 'checkIn',
          activity: ACTIVITY_JOURNEY_PLAN_CHECK_IN
        },
        {
          name: 'Order',
          title: 'Order',
          goTo: 'pdp',
          activity: ACTIVITY_JOURNEY_PLAN_ORDER
        },
        {
          name: 'Catatan Stok',
          title: 'Isi',
          goTo: 'stock',
          activity: ACTIVITY_JOURNEY_PLAN_STOCK
        },
        {
          name: 'Keluar Toko',
          title: 'Keluar',
          goTo: 'checkOut',
          activity: ACTIVITY_JOURNEY_PLAN_CHECK_OUT
        }
      ],
      privileges: this.props.privileges.data
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

  /** FOR GET LOG ALL ACTIVITY */
  refreshMerchantGetLogAllActivityProcess() {
    this.props.merchantGetLogAllActivityProcessV2(
      this.props.merchant.selectedMerchant.journeyBookStores.id
    );
  }

  /** === DID MOUNT === */
  getSurvey = () => {
    const params = {
      storeId: this.props.merchant.selectedMerchant.storeId,
      page: 1,
      length: 10
    };
    this.props.merchantGetSurveyListProcess(params);
  };

  componentDidMount() {
    /** FOR GET LATEST CHECK IN AND CHECK OUT */
    this.props.merchantGetLatestCheckInOutProcess();
    /** FOR GET MERCHANT LIST */
    this.getSurvey();
    /** FOR GET LAST ORDER */
    this.props.merchantGetLastOrderProcess(
      this.props.merchant.selectedMerchant.storeId
    );
    /** FOR GET LOG ALL ACTIVITY */
    this.props.merchantGetLogAllActivityProcessV2(
      this.props.merchant.selectedMerchant.journeyBookStores.id
    );
    this.props.getReturnActiveInfoProcess();
    // HIDE TASK BASE ON PRIVILEGE
    const { checkIn, checkOut, order, retur , collection} = this.state.privileges || {};
    let newTask = this.state.task;
    if (!checkIn?.status) {
      // same as (checkIn && !checkIn.status)
      newTask = newTask.filter(el => el.title !== 'Masuk');
    }
    if (!checkOut?.status) {
      newTask = newTask.filter(el => el.title !== 'Keluar');
    }
    if (!order?.status) {
      newTask = newTask.filter(el => el.title !== 'Order');
    }
    // if (!retur?.status) {
    //   newTask = newTask.filter(el => el.title !== 'Retur');
    // }
    if (!collection?.status) {
      newTask = newTask.filter(el => el.title !== 'Tagih');
    }
    this.setState({ task: newTask });
    /** FOR GET PORTFOLIO (FOR PAYLOAD CHECKOUT ORDER) */
    this.props.portfolioGetProcessV2();
    /** FOR GET SFA STATUS ORDER */
    this.props.sfaGetStatusOrderProcess({
      storeId: this.props.merchant.selectedMerchant.storeId,
      supplierId: this.props.user.userSuppliers[0].supplier.id
    });
    if (this.props.profile.errorGetSalesTeam) {
      this.props.getSalesTeamProcess();
    }
    /** FOR GET TOTAL SURVEY */
    this.props.merchantGetTotalSurveyProcess(
      this.props.merchant.selectedMerchant?.storeId
    );
  }

  componentDidUpdate(prevProps) {
    const {
      loadingGetLogAllActivity,
      dataGetLogAllActivityV2,
      dataReturnActiveInfo,
      dataGetTotalSurvey
    } = this.props.merchant;

    // Check is retur active
    if (prevProps.merchant.dataReturnActiveInfo !== dataReturnActiveInfo) {
      if (dataReturnActiveInfo !== null && dataReturnActiveInfo.isActive) {
        const retur = {
          name: 'Retur Barang',
          title: 'Retur',
          goTo: 'retur',
          activity: ACTIVITY_JOURNEY_PLAN_RETUR
        };
        let newTask = this.state.task;
        newTask.splice(2, 0, retur);
        this.setState({ task: newTask });
      }
    }

    if (prevProps.merchant.dataGetTotalSurvey !== dataGetTotalSurvey) {
      /** IF SURVEY LIST EXIST */
      if (dataGetTotalSurvey !== null) {
        this.taskListFilter();
      }
    }

    if (!loadingGetLogAllActivity && dataGetLogAllActivityV2) {
      if (dataGetTotalSurvey) {
        /** IF NO SURVEY */
        if (dataGetTotalSurvey.total === 0) {
          this.SurveyDone();
          if (this.state.task.length === 6) {
            this.taskListFilter('noSurvey');
          }
        }
        /** IF SURVEY LIST EXIST */
        if (dataGetTotalSurvey.total !== 0) {
          if (this.state.task.length === 7) {
            this.taskListFilter('surveyExist');
          }
        }
        /** IF ALL SURVEYS ARE COMPLETE AND ACTIVITY NOT COMPLETE YET */
        if (dataGetTotalSurvey.total !== 0) {
          if (
            this.props.merchant.dataGetTotalSurvey.total ===
            this.props.merchant.dataGetTotalSurvey.completed
          ) {
            this.SurveyDone();
          }
        }
      }
    }
    if (
      prevProps.merchant.dataPostActivityV2 !==
      this.props.merchant.dataPostActivityV2
    ) {
      if (this.props.merchant.dataPostActivityV2 !== null) {
        /** IF SURVEY DONE SUCCESS */
        if (
          this.props.merchant.dataPostActivityV2.activity ===
            ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY &&
          dataGetTotalSurvey.total !== 0
        ) {
          /** FOR GET LOG ALL ACTIVITY */
          this.refreshMerchantGetLogAllActivityProcess();
        }
        /** IF COLLECTION DONE SUCCESS */
        if (
          this.props.merchant.dataPostActivityV2.activity ===
            ACTIVITY_JOURNEY_PLAN_COLLECTION_SUCCESS ||
          this.props.merchant.dataPostActivityV2.activity ===
            ACTIVITY_JOURNEY_PLAN_COLLECTION_NOT_SUCCESS
        ) {
          /** FOR GET LOG ALL ACTIVITY */
          this.refreshMerchantGetLogAllActivityProcess();
          this.checkOrder();
          // this.checkoutProcess();
        }
      }
      if (this.props.merchant.dataPostActivityV2 !== null) {
        /** IF CHECK OUT SUCCESS */
        if (this.props.merchant.dataPostActivityV2.activity === 'check_out') {
          this.setState({
            openModalCheckout: false,
            loadingPostForCheckoutNoOrder: false,
            checkNoOrder: false,
            showToast: true,
            notifToast: 'Keluar Toko Berhasil'
          });
          setTimeout(() => {
            this.setState({ showToast: false });
          }, 3000);
          /** FOR GET LOG ALL ACTIVITY */
          this.props.merchantGetLogAllActivityProcessV2(
            this.props.merchant.selectedMerchant.journeyBookStores.id
          );
        } else if (
          /** IF CHECK OUT SUCCESS */
          this.props.merchant.dataPostActivityV2.activity === 'check_in'
        ) {
          this.setState({
            openModalCheckout: false,
            showToast: true,
            notifToast: 'Masuk Toko Berhasil'
          });
          setTimeout(() => {
            this.setState({ showToast: false });
          }, 3000);
          /** FOR GET LOG ALL ACTIVITY */
          this.props.merchantGetLogAllActivityProcessV2(
            this.props.merchant.selectedMerchant.journeyBookStores.id
          );
        }
      }
    }
    /** CHECK COLLECTION */
    if (
      prevProps.sfa.dataSfaCheckCollectionStatus !==
      this.props.sfa.dataSfaCheckCollectionStatus
    ) {
      if (this.props.sfa.dataSfaCheckCollectionStatus) {
        /** if collection total === 0 post transaction checkout, if not then open modal confirm no collection */
        if (this.props.sfa.dataSfaCheckCollectionStatus?.meta.total === 0) {
          this.postTransactionCheckout();
        } else {
          const isCollectionSuccess = this.props.merchant.dataGetLogAllActivityV2.find(
            item =>
              item.activityName === ACTIVITY_JOURNEY_PLAN_COLLECTION_SUCCESS
          );
          const isCollectionNotSuccess = this.props.merchant.dataGetLogAllActivityV2.find(
            item =>
              item.activityName === ACTIVITY_JOURNEY_PLAN_COLLECTION_NOT_SUCCESS
          );
          if (!isCollectionSuccess && !isCollectionNotSuccess) {
            this.setState({
              openModalCheckout: false,
              openModalConfirmNoCollection: true
            });
          } else {
            this.checkOrder();
          }
        }
      }
    }
    if (
      prevProps.sfa.dataSfaPostTransactionCheckout !==
      this.props.sfa.dataSfaPostTransactionCheckout
    ) {
      if (this.props.sfa.dataSfaPostTransactionCheckout) {
        if (this.props.sfa.dataSfaCheckCollectionStatus?.meta?.total === 0) {
          if (
            !dataGetLogAllActivityV2.find(
              item =>
                item.activityName === ACTIVITY_JOURNEY_PLAN_COLLECTION_SUCCESS
            )
          ) {
            this.props.merchantPostActivityProcessV2({
              journeyBookStoreId: this.props.merchant.selectedMerchant
                .journeyBookStores.id,
              activityName: ACTIVITY_JOURNEY_PLAN_COLLECTION_SUCCESS
            });
          } else {
            this.checkOrder();
          }
        } else {
          this.props.merchantPostActivityProcessV2({
            journeyBookStoreId: this.props.merchant.selectedMerchant
              .journeyBookStores.id,
            activityName: ACTIVITY_JOURNEY_PLAN_COLLECTION_NOT_SUCCESS
          });
        }
      }
    }
    if (
      prevProps.merchant.dataGetLogPerActivityV2 !==
      this.props.merchant.dataGetLogPerActivityV2
    ) {
      if (this.props.merchant.dataGetLogPerActivityV2 !== null) {
        if (this.props.merchant.dataGetLogPerActivityV2.length > 0) {
          if (
            this.props.merchant.dataGetLogPerActivityV2[0].activityName ===
            'order'
          ) {
            this.checkoutProcess();
          }
        } else {
          if (this.state.checkNoOrder) {
            this.setState({
              openModalCheckout: false,
              checkNoOrder: false,
              openModalConfirmNoOrder: true
            });
          }
        }
      }
    }
    // CHECK RENDER PENAGIHAN
    if (this.checkBilling()) {
      const { collection } = this.state.privileges || {};
      // CHECK THIS STATE TO PREVENT MAXIMUM EXCEED ERROR
      if (
        !this.checkExistTask(ACTIVITY_JOURNEY_PLAN_COLLECTION) &&
        (collection && collection.status)
      ) {
        let task = [...this.state.task];
        // CHECK TO RENDER PENAGIHAN ROW
        if (!this.checkExistTask(ACTIVITY_JOURNEY_PLAN_ORDER)) {
          task.splice(1, 0, PENAGIHAN_TASK);
        } else {
          task.splice(2, 0, PENAGIHAN_TASK);
        }
        this.setState({
          task
        });
      }
    }
    /** FOR ERROR */
    /** error post */
    if (
      prevProps.merchant.errorPostActivityV2 !==
      this.props.merchant.errorPostActivityV2
    ) {
      if (this.props.merchant.errorPostActivityV2 !== null) {
        this.doError();
      }
    }
    /** error get per activity */
    if (
      prevProps.merchant.errorGetLogPerActivityV2 !==
      this.props.merchant.errorGetLogPerActivityV2
    ) {
      if (this.props.merchant.errorGetLogPerActivityV2 !== null) {
        this.doError();
      }
    }
    /** error get all activity */
    if (
      prevProps.merchant.errorGetLogAllActivityV2 !==
      this.props.merchant.errorGetLogAllActivityV2
    ) {
      if (this.props.merchant.errorGetLogAllActivityV2 !== null) {
        this.doError();
      }
    }
    /** error get last order */
    if (
      prevProps.merchant.errorGetMerchantLastOrder !==
      this.props.merchant.errorGetMerchantLastOrder
    ) {
      if (this.props.merchant.errorGetMerchantLastOrder !== null) {
        this.doError();
      }
    }

    /**
     * CHECK OVERDUE ORDER STATUS
     */
    // IF SUCCESS
    if (
      prevProps.oms.dataOMSCheckOverdue !== this.props.oms.dataOMSCheckOverdue
    ) {
      if (this.props.oms.dataOMSCheckOverdue !== null) {
        this.verifyUser();
      }
    }
    // IF FAILED
    if (
      prevProps.oms.errorOMSCheckOverdue !== this.props.oms.errorOMSCheckOverdue
    ) {
      if (this.props.oms.errorOMSCheckOverdue !== null) {
        this.doError();
      }
    }
    /** error get total survey */
    if (this.props.merchant.errorGetTotalSurvey) {
      if (
        prevProps.merchant.errorGetTotalSurvey !==
        this.props.merchant.errorGetTotalSurvey
      ) {
        this.doError();
      }
    }
    /** error check collection status */
    if (this.props.sfa.errorSfaCheckCollectionStatus) {
      if (
        prevProps.sfa.errorSfaCheckCollectionStatus !==
        this.props.sfa.errorSfaCheckCollectionStatus
      ) {
        this.doError();
      }
    }
    /** error post transaction checkout */
    if (this.props.sfa.errorSfaPostTransactionCheckout) {
      if (
        prevProps.sfa.errorSfaPostTransactionCheckout !==
        this.props.sfa.errorSfaPostTransactionCheckout
      ) {
        this.doError();
      }
    }
  }

  componentWillUnmount() {
    const today = moment().format('YYYY-MM-DD') + 'T00:00:00%2B00:00';
    this.props.journeyPlanGetResetV2();
    this.props.journeyPlanGetProcessV2({
      page: 1,
      date: today,
      search: '',
      storetype: 'all',
      loading: true
    });
    this.props.getJourneyPlanReportProcessV2();
    this.props.journeyPlanGetMapDataReset();
    this.props.journeyPlanGetMapDataProcess({
      page: 1,
      length: 1000,
      date: today,
      search: '',
      storetype: 'all',
      loading: true
    });
  }
  /** CHECKOUT PROCESS */
  checkoutProcess() {
    this.props.merchantPostActivityProcessV2({
      journeyBookStoreId: this.props.merchant.selectedMerchant.journeyBookStores
        .id,
      activityName: 'check_out',
      latitude: this.props.merchant.selectedMerchant.journeyBookStores
        .latitudeCheckIn,
      longitude: this.props.merchant.selectedMerchant.journeyBookStores
        .longitudeCheckIn
    });
  }

  /** POST TRANSACTION CHECKOUT FOR COLLECTION */
  postTransactionCheckout() {
    const data = {};
    const { selectedMerchant } = this.props.merchant;
    const storeId = parseInt(selectedMerchant.storeId, 10);
    const collectionTransactionDetailIds = selectedMerchant.collectionIds;

    data.storeId = storeId;
    data.collectionTransactionDetailIds = collectionTransactionDetailIds;
    data.collectionTransactionDetails = [];
    this.props.sfaPostTransactionCheckoutProcess(data);
  }
  /*
   * Set sales activity survey_toko done
   */
  SurveyDone() {
    const {
      loadingPostActivity,
      dataGetLogAllActivityV2,
      dataPostActivityV2
    } = this.props.merchant;
    if (!loadingPostActivity) {
      if (
        !dataPostActivityV2 ||
        dataPostActivityV2?.activity !== ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY
      ) {
        if (
          !dataGetLogAllActivityV2.find(
            item => item.activityName === 'toko_survey'
          )
        ) {
          this.props.merchantPostActivityProcessV2({
            journeyBookStoreId: this.props.merchant.selectedMerchant
              .journeyBookStores.id,
            activityName: ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY
          });
        }
      }
    }
  }
  /** CHECK LIST COLLECTION */
  checkCollectionStatus() {
    const { selectedMerchant } = this.props.merchant;
    const { userSuppliers, id } = this.props.user;
    const data = {
      storeId: parseInt(selectedMerchant.storeId, 10),
      userId: parseInt(id, 10),
      supplierId: parseInt(userSuppliers[0].supplier.id, 10),
      loading: true,
      limit: 20,
      skip: 0,
      collectionTransactionDetailStatus: 'pending',
      collectionTransactionDetailIds: selectedMerchant.collectionIds
    };
    this.props.sfaCheckCollectionStatusProcess(data);
  }
  /** FOR ERROR FUNCTION (FROM DID UPDATE) */
  doError() {
    /** Close all modal and open modal error respons */
    if (!this.state.openModalErrorGlobal) {
      this.setState({
        openModalErrorGlobal: true,
        openModalCheckout: false,
        openModalConfirmNoOrder: false,
        loadingPostForCheckoutNoOrder: false
      });
    }
  }

  /** FOR VERIFY USER STATUS AND ORDER OVERDUE */
  verifyUser() {
    if (
      this.props.oms.dataOMSCheckOverdue.overdue &&
      this.props.oms.dataOMSCheckOverdue !== null
    ) {
      this.setState({
        openModalOverdue: true,
        openModalProgressChecking: false
      });
    } else {
      this.setState({ openModalCheckUser: true });
    }
  }
  /** === GO TO (MENU PRESS) */
  goTo(page) {
    switch (page) {
      case 'pdp':
        this.setState({ openModalProgressChecking: true });
        this.props.OMSCheckOverdueProcess();
        break;
      case 'history':
        NavigationService.navigate('HistoryView', {
          storeId: this.props.merchant.selectedMerchant.storeId
        });
        break;
      case 'checkIn':
        if (this.props.merchant.dataGetLatestCheckInOut) {
          return this.setState({ openModalBeforeCheckIn: true });
        }
        NavigationService.navigate('MerchantCheckinView');
        break;
      case 'checkOut':
        this.props.merchantGetLogPerActivityProcessV2({
          journeyBookStoresId: this.props.merchant.selectedMerchant
            .journeyBookStores.id,
          activity: 'check_in'
        });
        if (this.props.merchant.dataGetLogAllActivityV2) {
          const haveSurvey = this.props.merchant.dataGetTotalSurvey.total === 0;
          const surveyHasDone = this.props.merchant.dataGetLogAllActivityV2.find(
            item => item.activityName === 'toko_survey'
          );
          const { checkOut } = this.state.privileges;
          if ((haveSurvey || surveyHasDone) && checkOut?.status) {
            this.setState({ openModalCheckout: true });
          }
        }
        break;
      case 'survey':
        if (this.props.merchant.dataGetLogAllActivityV2) {
          if (
            this.props.merchant.dataGetLogAllActivityV2.find(
              item => item.activityName === 'check_in'
            )
          ) {
            NavigationService.navigate('MerchantSurveyView', {
              readOnly: false,
              totalSurvey: this.props.merchant.dataGetTotalSurvey.total,
              totalCompletedSurvey: this.props.merchant.dataGetTotalSurvey
                .completed
            });
          }
        }
        break;
      case 'retur':
        NavigationService.navigate('ReturnOrderView');
        break;
      case 'stock':
        if (
          this.props.merchant.dataGetLogAllActivityV2.find(
            task => task.activityName === ACTIVITY_JOURNEY_PLAN_CHECK_IN
          )
        ) {
          NavigationService.navigate('MerchantStockView');
        }
        break;
      case 'collection':
        NavigationService.navigate('SfaView');
        break;
      default:
        break;
    }
  }
  /** CALLED FROM CHILD */
  parentFunction(data) {
    switch (data.type) {
      case 'pdp':
        this.setState({ openModalCheckUser: false });
        NavigationService.navigate('PdpView');
        break;
      case 'close':
        this.setState({ openModalCheckUser: false });
        break;
      case 'progress-on':
        this.setState({ openModalProgressChecking: true });
        break;
      case 'progress-off':
        this.setState({ openModalProgressChecking: false });
        break;

      default:
        break;
    }
  }

  taskListFilter(filter) {
    const { dataReturnActiveInfo, dataGetTotalSurvey } = this.props.merchant;
    const retur = {
      name: 'Retur Barang',
      title: 'Retur',
      goTo: 'retur',
      activity: ACTIVITY_JOURNEY_PLAN_RETUR
    };

    const surveyTask = {
      name: 'Toko Survey',
      title: 'Isi',
      goTo: 'survey',
      activity: ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY
    };

    const data = {};
    switch (filter) {
      case 'noSurvey':
        data.task = [
          {
            name: 'Masuk Toko',
            title: 'Masuk',
            goTo: 'checkIn',
            activity: ACTIVITY_JOURNEY_PLAN_CHECK_IN
          },
          {
            name: 'Order',
            title: 'Order',
            goTo: 'pdp',
            activity: ACTIVITY_JOURNEY_PLAN_ORDER
          },
          {
            name: 'Catatan Stok',
            title: 'Isi',
            goTo: 'stock',
            activity: ACTIVITY_JOURNEY_PLAN_STOCK
          },
          {
            name: 'Keluar Toko',
            title: 'Keluar',
            goTo: 'checkOut',
            activity: ACTIVITY_JOURNEY_PLAN_CHECK_OUT
          }
        ];
        break;
      case 'surveyExist':
        data.task = [
          {
            name: 'Masuk Toko',
            title: 'Masuk',
            goTo: 'checkIn',
            activity: ACTIVITY_JOURNEY_PLAN_CHECK_IN
          },
          {
            name: 'Order',
            title: 'Order',
            goTo: 'pdp',
            activity: ACTIVITY_JOURNEY_PLAN_ORDER
          },
          {
            name: 'Catatan Stok',
            title: 'Isi',
            goTo: 'stock',
            activity: ACTIVITY_JOURNEY_PLAN_STOCK
          },
          {
            name: 'Toko Survey',
            title: 'Isi',
            goTo: 'survey',
            activity: ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY
          },
          {
            name: 'Keluar Toko',
            title: 'Keluar',
            goTo: 'checkOut',
            activity: ACTIVITY_JOURNEY_PLAN_CHECK_OUT
          }
        ];
        break;

      default:
        data.task = [
          {
            name: 'Masuk Toko',
            title: 'Masuk',
            goTo: 'checkIn',
            activity: ACTIVITY_JOURNEY_PLAN_CHECK_IN
          },
          {
            name: 'Order',
            title: 'Order',
            goTo: 'pdp',
            activity: ACTIVITY_JOURNEY_PLAN_ORDER
          },
          {
            name: 'Catatan Stok',
            title: 'Isi',
            goTo: 'stock',
            activity: ACTIVITY_JOURNEY_PLAN_STOCK
          },
          {
            name: 'Keluar Toko',
            title: 'Keluar',
            goTo: 'checkOut',
            activity: ACTIVITY_JOURNEY_PLAN_CHECK_OUT
          }
        ];
        break;
    }

    /** ADD RETURN TASK */
    if (dataReturnActiveInfo.isActive) {
      data.task.splice(2, 0, retur);
    }

    /** ADD SURVEY TASK */
    if (dataGetTotalSurvey.total !== 0) {
      /** FIND CHECKOUT INDEX */
      const taskCheckoutIndex = data.task.findIndex(
        task => task.title === 'Keluar'
      );
      data.task.splice(taskCheckoutIndex, 0, surveyTask);
    }

    this.setState({ task: data.task });
  }

  /** CUSTOM NAVIGATE VIEW NO ORDER REASON PAGE */
  navigateViewNoOrderReasonPage = data => {
    NavigationService.navigate('MerchantNoOrderReasonDetail', {
      noOrderReason: data
    });
  };

  navigateSurveyReadOnly = data => {
    NavigationService.navigate('MerchantSurveyView', {
      totalSurvey: this.props.merchant.dataGetTotalSurvey.total,
      totalCompletedSurvey: this.props.merchant.dataGetTotalSurvey.completed,
      readOnly: true,
      data
    });
  };

  /** CHECK CHECK LIST TASK */
  checkCheckListTask(activity) {
    if (this.props.merchant.dataGetLogAllActivityV2 !== null) {
      let checkActivity = this.props.merchant.dataGetLogAllActivityV2.filter(
        function(rows) {
          return rows.activityName === activity;
        }
      );
      if (activity === ACTIVITY_JOURNEY_PLAN_ORDER) {
        let getOrderStatus = this.props.merchant.dataGetLogAllActivityV2.filter(
          function(rows) {
            return rows.activityName === ACTIVITY_JOURNEY_PLAN_ORDER;
          }
        );
        if (getOrderStatus.length < 1) {
          let getNoOrder = this.props.merchant.dataGetLogAllActivityV2.filter(
            function(rows) {
              return rows.activityName === ACTIVITY_JOURNEY_PLAN_CHECK_OUT;
            }
          );
          if (getNoOrder.length > 0) {
            let newOrderStatus = { ...getNoOrder[0] };
            newOrderStatus.activityName = ACTIVITY_JOURNEY_PLAN_ORDER;
            return newOrderStatus;
          } else {
            return false;
          }
        } else {
          return getOrderStatus[0];
        }
      }
      if (checkActivity.length > 0) {
        return checkActivity[0];
      }
      return false;
    }
  }
  /** CHECK TOTAL COMPLETE TASK */
  checkTotalCompleteTask() {
    let total = 0;
    const journeyBookStores = this.props.merchant.selectedMerchant
      .journeyBookStores;
    if (this.props.merchant.dataGetLogAllActivityV2 !== null) {
      this.state.task.map((item, index) => {
        const checkActivity = this.props.merchant.dataGetLogAllActivityV2.findIndex(
          itemAllActivity => itemAllActivity.activityName === item.activity
        );
        if (checkActivity > -1) {
          total = total + 1;
        }
      });
    }
    if (
      !journeyBookStores.orderStatus &&
      journeyBookStores.noOrderReasonId > 0
    ) {
      total = total + 1;
    }
    return total;
  }
  /** CHECK CHECK-IN */
  checkCheckIn() {
    const { journeyBookStores } = this.props.merchant.selectedMerchant;
    if (
      journeyBookStores.latitudeCheckIn === 0 &&
      journeyBookStores.longitudeCheckIn === 0
    ) {
      return false;
    }
    return true;
  }
  /**
   * CHECK THE CONDITION WHEN
   * - HAVING REASON NOT VISIT
   * - STATUS SURVEY IN PROGRESS
   */
  checkNoVisitReasonAndSurveyStatus(journeyBookStores, item) {
    if (
      !this.checkCheckIn() &&
      journeyBookStores.noVisitReasonId &&
      item.activity === ACTIVITY_JOURNEY_PLAN_CHECK_IN
    ) {
      return <MaterialIcon name="cancel" color={Color.fontRed50} size={24} />;
    }
    if (item.activity === ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY) {
      const { dataGetTotalSurvey } = this.props.merchant;
      if (dataGetTotalSurvey?.inProgress >= 1) {
        return (
          <View
            style={{
              backgroundColor: Color.fontYellow50,
              borderRadius: 100,
              padding: 2
            }}
          >
            <MaterialIcon name="timelapse" color={Color.fontWhite} size={20} />
          </View>
        );
      }
    }
    return (
      <MaterialIcon
        name="radio-button-unchecked"
        color={Color.fontBlack40}
        size={24}
      />
    );
  }
  /**
   * CHECK THE CONDITION WHEN isCollectionAvailable true
   * - SELECTED MERCHANT HAVE isCollectionAvailable to render "Penagihan" text
   * return true | false
   */
  checkBilling() {
    const { selectedMerchant } = this.props.merchant;
    const { journeyBookStores } = selectedMerchant;

    if (journeyBookStores.isCollectionAvailable) {
      return true;
    }
    return false;
  }
  /**
   * CHECK EXISTING TASK INSIDE THIS.STATE.TASK
   * @params activityName (name that want to check)
   * return true | false
   */
  checkExistTask = activityName =>
    this.state.task.some(item => item.activity === activityName);
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER BUTTON BEFORE CHECK-IN === */
  rendercheckCheckIn(item) {
    const { journeyBookStores } = this.props.merchant.selectedMerchant;
    // checkIn false, have reason not visit
    if (!this.checkCheckIn()) {
      if (journeyBookStores.noVisitReasonId) {
        // tasklist checkIn
        if (item.title === 'Masuk') {
          return (
            <TouchableOpacity
              onPress={() =>
                NavigationService.navigate('MerchantNoVisitReasonDetailView')
              }
              style={styles.buttonDetailNoVisitReason}
            >
              <Text style={Fonts.type100}>Lihat Alasan</Text>
              <MaterialIcon
                style={styles.containerChevronRight}
                name="chevron-right"
                color={Color.fontRed50}
                size={20}
              />
            </TouchableOpacity>
          );
        }
        if (item.title === 'Keluar' || item.title === 'Isi') {
          return null;
        }
        return (
          <Button
            onPress={() => {
              this.goTo(item.goTo);
            }}
            title={item.title}
            titleStyle={[
              Fonts.type16,
              {
                color: Color.fontWhite
              }
            ]}
            buttonStyle={styles.buttonGoTo}
          />
        );
      }
    }
    // checkIn true or activity check_in => show button
    if (
      this.checkCheckIn() ||
      item.activity === ACTIVITY_JOURNEY_PLAN_CHECK_IN
    ) {
      // checkIn true & surveyList inProgress customize button
      if (item.activity === ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY) {
        const { dataGetTotalSurvey } = this.props.merchant;
        if (dataGetTotalSurvey?.inProgress >= 1) {
          return (
            <TouchableOpacity
              onPress={() =>
                NavigationService.navigate('MerchantSurveyView', {
                  readOnly: false,
                  totalSurvey: this.props.merchant.dataGetTotalSurvey.total,
                  totalCompletedSurvey: this.props.merchant.dataGetTotalSurvey
                    .completed
                })
              }
              style={styles.containerSurveyInProgress}
            >
              <Text style={Fonts.type69}>Berlangsung</Text>
              <MaterialIcon
                style={styles.containerChevronRight}
                name="chevron-right"
                color={Color.fontYellow50}
                size={20}
              />
            </TouchableOpacity>
          );
        }
      }
      if (item.activity === ACTIVITY_JOURNEY_PLAN_COLLECTION) {
        const activity = this.props.merchant.dataGetLogAllActivityV2;
        if (
          activity.find(
            items =>
              items.activityName === ACTIVITY_JOURNEY_PLAN_COLLECTION_SUCCESS
          )
        ) {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <Text
                accessible={true}
                accessibilityLabel={'txtMerchantHomeSelesaiOrder'}
                style={Fonts.type51}
              >
                Sudah Lunas
              </Text>
            </View>
          );
        } else if (
          activity.find(
            items =>
              items.activityName ===
              ACTIVITY_JOURNEY_PLAN_COLLECTION_NOT_SUCCESS
          )
        ) {
          return (
            <TouchableOpacity
              onPress={() =>
                NavigationService.navigate('MerchantNoCollectionDetailView')
              }
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginRight: -5,
                marginTop: -5
              }}
            >
              <Text style={Fonts.type100}>Lihat Alasan</Text>
              <MaterialIcon
                style={{
                  marginTop: 2,
                  padding: 0
                }}
                name="chevron-right"
                color={Color.fontRed50}
                size={20}
              />
            </TouchableOpacity>
          );
        } else if (
          activity.find(
            items =>
              items.activityName === ACTIVITY_JOURNEY_PLAN_COLLECTION_ONGOING
          )
        ) {
          return (
            <TouchableOpacity
              onPress={() => NavigationService.navigate('SfaView')}
              style={styles.containerSurveyInProgress}
            >
              <Text style={Fonts.type69}>Berlangsung</Text>
              <MaterialIcon
                style={styles.containerChevronRight}
                name="chevron-right"
                color={Color.fontYellow50}
                size={20}
              />
            </TouchableOpacity>
          );
        }
      }

      return (
        <Button
          accessible={true}
          accessibilityLabel={'btnMerchantHomeMenu'}
          onPress={() => {
            this.goTo(item.goTo);
          }}
          title={item.title}
          titleStyle={[
            Fonts.type16,
            {
              color: Color.fontWhite
            }
          ]}
          buttonStyle={styles.buttonGoTo}
        />
      );
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text
          accessible={true}
          accessibilityLabel={'txtMerchantHomeBelumMasuk'}
          style={Fonts.type34}
        >
          Belum Masuk
        </Text>
      </View>
    );
  }

  // RENDER BUTTON STOCK RECORD
  buttonStock(item) {
    return item.activity ? (
      <TouchableOpacity
        onPress={() => {
          this.goTo(item.goTo);
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: -5,
          marginRight: -5
        }}
      >
        <Text style={Fonts.type51}>Selesai</Text>
        <MaterialIcon
          style={{
            marginTop: 2,
            padding: 0
          }}
          name="chevron-right"
          color={Color.fontGreen50}
          size={20}
        />
      </TouchableOpacity>
    ) : (
      <Button
        onPress={() => {
          this.goTo(item.goTo);
        }}
        title={item.title}
        titleStyle={[
          Fonts.type16,
          {
            color: Color.fontWhite
          }
        ]}
        buttonStyle={{
          backgroundColor: Color.fontRed50,
          borderRadius: 7,
          paddingHorizontal: 20,
          paddingVertical: 5,
          width: '100%'
        }}
      />
    );
  }

  /** RENDER BUTTON RETURN */
  buttonReturn(item) {
    return item.activity ? (
      <TouchableOpacity
        onPress={() => {
          this.goTo(item.goTo);
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: -5,
          marginRight: -5
        }}
      >
        <Text style={Fonts.type51}>Selesai</Text>
        <MaterialIcon
          style={{
            marginTop: 2,
            padding: 0
          }}
          name="chevron-right"
          color={Color.fontGreen50}
          size={20}
        />
      </TouchableOpacity>
    ) : (
      <Button
        onPress={() => {
          this.goTo(item.goTo);
        }}
        title={item.title}
        titleStyle={[
          Fonts.type16,
          {
            color: Color.fontWhite
          }
        ]}
        buttonStyle={{
          backgroundColor: Color.fontRed50,
          borderRadius: 7,
          paddingHorizontal: 20,
          paddingVertical: 5,
          width: '100%'
        }}
      />
    );
  }

  renderListProductImage(item) {
    return item.orderBrands.map((itemBrand, indexBrand) => {
      return itemBrand.orderBrandCatalogues.map(
        (itemCatalogue, indexCatalogue) => {
          return indexCatalogue < 3 ? (
            <View key={indexCatalogue} style={{ paddingHorizontal: 5 }}>
              <Image
                defaultSource={require('../../../assets/images/sinbad_image/sinbadopacity.png')}
                source={{
                  uri: itemCatalogue.catalogue.catalogueImages[0].imageUrl
                }}
                style={styles.productImage}
              />
            </View>
          ) : (
            <View key={indexCatalogue} />
          );
        }
      );
    });
  }

  renderPlusProduct(item) {
    let count = 0;
    item.orderBrands.map((itemBrand, indexBrand) => {
      return itemBrand.orderBrandCatalogues.map(
        (itemCatalogue, indexCatalogue) => {
          count++;
        }
      );
    });
    let tempCount = count - 3 < 0 ? 0 : count - 3;
    return tempCount > 0 ? (
      <View>
        <Text style={styles.textPlusProduct}>(+{tempCount} Produk Lain)</Text>
      </View>
    ) : (
      <View />
    );
  }

  renderLastOrder() {
    const order = this.props.merchant.dataGetMerchantLastOrder;
    return order?.orderParcels && !_.isEmpty(order.orderParcels) ? (
      <View style={styles.lastOrderContainer}>
        <View style={[styles.cardLastOrder, GlobalStyle.shadowForBox5]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 8
            }}
          >
            <Text style={Fonts.type42}>Pesanan Terakhir</Text>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel={'btnMerchantHomeRiwayat'}
              onPress={() => {
                this.goTo('history');
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -5
              }}
            >
              <Text style={Fonts.type100}>Lihat Riwayat</Text>
              <MaterialIcon
                style={styles.containerChevronRight}
                name="chevron-right"
                color={Color.fontRed50}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View>
            <ProductListType1 data={order.orderParcels[0].orderBrands} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 8
            }}
          >
            <Text style={Fonts.type59}>{order.orderParcels[0].orderCode}</Text>
            <Text style={Fonts.type59}>
              {order.orderParcels[0].parcelQty} Qty
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text style={Fonts.type59}>
              {moment(new Date(order.orderParcels[0].createdAt)).format(
                'DD MMMM YYYY HH:mm:ss'
              )}
            </Text>
            <Text style={Fonts.type59}>
              Total: {MoneyFormat(order.orderParcels[0].billings.totalPayment)}
            </Text>
          </View>
        </View>
      </View>
    ) : (
      <View />
    );
  }

  /** === THIS FOR TARGET USING SLIDER */
  // renderData() {
  //   return this.props.merchant.dataGetMerchantLastOrder !== null &&
  //     this.props.merchant.dataGetMerchantLastOrder !== undefined ? (
  //     <View>
  //       {this.props.merchant.dataGetMerchantLastOrder.orderParcels.length >
  //       0 ? (
  //         <Carousel
  //           ref={ref => (this.carousel = ref)}
  //           data={this.props.merchant.dataGetMerchantLastOrder.orderParcels}
  //           sliderWidth={1 * width}
  //           itemWidth={1 * width}
  //           renderItem={this.renderItem.bind(this)}
  //           onSnapToItem={index => this.setState({ activeIndex: index })}
  //           slideStyle={{ padding: 10 }}
  //           inactiveSlideOpacity={1}
  //           inactiveSlideScale={1}
  //           loop
  //           autoplay
  //           activeSlideAlignment={'center'}
  //         />
  //       ) : (
  //         <View />
  //       )}
  //       {/* {this.pagination()} */}
  //     </View>
  //   ) : (
  //     <View />
  //   );
  // }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    let storeName = '';
    if (navigation.state.params) {
      if (navigation.state.params.storeName.length >= 21) {
        storeName = navigation.state.params.storeName.substring(0, 21) + '...';
      } else {
        storeName = navigation.state.params.storeName;
      }
    }
    return {
      headerTitle: () => (
        <View>
          <Text style={Fonts.type35}>{storeName}</Text>
        </View>
      )
    };
  };
  /**
   * ====================
   * FOR TASK LIST
   * ====================
   */
  renderTastList() {
    return (
      <View style={styles.taskListContainer}>
        <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 10
            }}
          >
            <Text style={Fonts.type64}>Daftar Tugas</Text>
            <Text style={Fonts.type31}>
              {this.checkTotalCompleteTask()}/{this.state.task.length} Selesai
            </Text>
          </View>
          {this.state.task.map((item, index) => {
            const taskList = this.checkCheckListTask(item.activity);
            const journeyBookStores = this.props.merchant.selectedMerchant
              .journeyBookStores;
            const activityLogs = this.props.merchant.dataGetLogAllActivityV2;
            const isCollectionOnGoing = activityLogs.find(
              cog =>
                cog.activityName === ACTIVITY_JOURNEY_PLAN_COLLECTION_ONGOING
            );
            const isCollectionNotSuccess = activityLogs.find(
              cns =>
                cns.activityName ===
                ACTIVITY_JOURNEY_PLAN_COLLECTION_NOT_SUCCESS
            );
            const isCollectionSuccess = activityLogs.find(
              cs => cs.activityName === ACTIVITY_JOURNEY_PLAN_COLLECTION_SUCCESS
            );
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 8
                }}
              >
                <View style={{ flexDirection: 'row', flex: 5 }}>
                  <View>
                    {taskList ? (
                      taskList.activityName === ACTIVITY_JOURNEY_PLAN_ORDER &&
                      !journeyBookStores.orderStatus &&
                      journeyBookStores.noOrderReasonNote.length !== 0 ? (
                        <MaterialIcon
                          name="cancel"
                          color={Color.fontRed50}
                          size={24}
                        />
                      ) : (
                        <MaterialIcon
                          name="check-circle"
                          color={Color.fontGreen50}
                          size={24}
                        />
                      )
                    ) : item.activity === ACTIVITY_JOURNEY_PLAN_COLLECTION ? (
                      isCollectionSuccess ? (
                        <MaterialIcon
                          name="check-circle"
                          color={Color.fontGreen50}
                          size={24}
                        />
                      ) : isCollectionNotSuccess ? (
                        <MaterialIcon
                          name="cancel"
                          color={Color.fontRed50}
                          size={24}
                        />
                      ) : isCollectionOnGoing ? (
                        <MaterialCommunityIcons
                          name="timelapse"
                          color={Color.fontYellow50}
                          size={24}
                        />
                      ) : (
                        <MaterialIcon
                          name="radio-button-unchecked"
                          color={Color.fontBlack40}
                          size={24}
                        />
                      )
                    ) : (
                      this.checkNoVisitReasonAndSurveyStatus(
                        journeyBookStores,
                        item
                      )
                    )}
                  </View>
                  <View style={{ justifyContent: 'center', paddingLeft: 8 }}>
                    <Text style={Fonts.type8}>{item.name}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 3
                  }}
                >
                  {taskList ? (
                    taskList.activityName === ACTIVITY_JOURNEY_PLAN_CHECK_IN ||
                    taskList.activityName ===
                      ACTIVITY_JOURNEY_PLAN_CHECK_OUT ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <Text style={Fonts.type107}>
                          {taskList.activityName ===
                          ACTIVITY_JOURNEY_PLAN_CHECK_IN
                            ? `Masuk ${moment(taskList.createdAt).format(
                                'HH:mm'
                              )}`
                            : `Keluar ${moment(taskList.createdAt).format(
                                'HH:mm'
                              )}`}
                        </Text>
                      </View>
                    ) : taskList.activityName ===
                      ACTIVITY_JOURNEY_PLAN_ORDER ? (
                      !journeyBookStores.orderStatus &&
                      journeyBookStores.noOrderReasonNote.length !== 0 ? (
                        <TouchableOpacity
                          onPress={() => {
                            this.navigateViewNoOrderReasonPage(
                              journeyBookStores
                            );
                          }}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            marginRight: -5,
                            marginTop: -5
                          }}
                        >
                          <Text style={Fonts.type100}>Lihat Alasan</Text>
                          <MaterialIcon
                            style={{
                              marginTop: 2,
                              padding: 0
                            }}
                            name="chevron-right"
                            color={Color.fontRed50}
                            size={20}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            this.goTo(item.goTo);
                          }}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            marginRight: -5,
                            marginTop: -5
                          }}
                        >
                          <Text
                            accessible={true}
                            accessibilityLabel={'txtMerchantHomeSelesaiOrder'}
                            style={Fonts.type51}
                          >
                            Selesai
                          </Text>
                          <MaterialIcon
                            style={{
                              marginTop: 2,
                              padding: 0
                            }}
                            name="chevron-right"
                            color={Color.fontGreen50}
                            size={20}
                          />
                        </TouchableOpacity>
                      )
                    ) : taskList.activityName === ACTIVITY_JOURNEY_PLAN_RETUR &&
                      this.props.merchant.dataReturnActiveInfo.isActive ? (
                      this.buttonReturn({
                        goTo: item.goTo,
                        activity: ACTIVITY_JOURNEY_PLAN_RETUR
                      })
                    ) : taskList.activityName ===
                      ACTIVITY_JOURNEY_PLAN_STOCK ? (
                      this.buttonStock({
                        goTo: item.goTo,
                        activity: ACTIVITY_JOURNEY_PLAN_STOCK
                      })
                    ) : taskList.activityName ===
                      ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY ? (
                      <TouchableOpacity
                        onPress={() => {
                          this.navigateSurveyReadOnly({
                            taskList,
                            item
                          });
                        }}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          marginRight: -5,
                          marginTop: -5
                        }}
                      >
                        <Text style={Fonts.type51}>Selesai</Text>
                        <MaterialIcon
                          style={{
                            marginTop: 2,
                            padding: 0
                          }}
                          name="chevron-right"
                          color={Color.fontGreen50}
                          size={20}
                        />
                      </TouchableOpacity>
                    ) : (
                      <Button
                        onPress={() => {
                          this.goTo(item.goTo);
                        }}
                        title={item.title}
                        titleStyle={[
                          Fonts.type16,
                          {
                            color: Color.fontWhite
                          }
                        ]}
                        buttonStyle={{
                          backgroundColor: Color.fontRed50,
                          borderRadius: 7,
                          paddingHorizontal: 20,
                          paddingVertical: 5,
                          width: '100%'
                        }}
                      />
                    )
                  ) : (
                    this.rendercheckCheckIn(item)
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
  /**
   * ====================
   * FOR MENU
   * ====================
   */
  /** === MENU ITEM === */
  renderItemMenu({ item, index }) {
    return (
      <TouchableOpacity
        style={styles.boxMenu}
        key={index}
        onPress={() => this.goTo(item.goTo)}
      >
        <View>
          {item.menuName === 'Pesanan' &&
          this.props.permanent.newOrderSuccessPerMerchant.indexOf(
            parseInt(this.props.selectedMerchant.storeId, 10)
          ) > -1 ? (
            <View style={styles.boxNotification}>
              <View style={GlobalStyle.circleRedNotification16} />
            </View>
          ) : (
            <View />
          )}
          <Image source={item.icon} style={styles.iconSize} />
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={Fonts.type8}>{item.menuName}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  /** === MAIN MENU === */
  renderMerchantMenu() {
    return (
      <View style={styles.containerMenu}>
        <View style={styles.boxMainMenu}>
          <View>
            <Text style={Fonts.type7}>Store Menu</Text>
          </View>
          <View style={[GlobalStyle.lines, { flex: 1, marginLeft: 10 }]} />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={this.state.menu}
          extraData={this.props}
          renderItem={this.renderItemMenu.bind(this)}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  /** === RENDER CONTENT ITEM === */
  renderContentItem() {
    const { order } = this.state.privileges;
    return (
      <View>
        {/* {this.renderData()} */}
        {order?.status && this.renderLastOrder()}
        {this.renderTastList()}
        {/* {this.renderMerchantMenu()} */}
      </View>
    );
  }
  /** RENDER MODAL PROGRESS CHECKING */
  renderModalProgressChecking() {
    return this.state.openModalProgressChecking ||
      this.props.oms.loadingOMSCheckOverdue ? (
      <ModalBottomProgressChecking
        open={this.state.openModalProgressChecking}
        progress={'Mohon tunggu'}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        <FlatList
          showsVerticalScrollIndicator
          data={[1]}
          renderItem={this.renderContentItem.bind(this)}
          keyExtractor={(data, index) => index.toString()}
        />
      </View>
    );
  }
  /**
   * ===================
   * TOAST
   * ====================
   */
  renderToast() {
    return this.state.showToast ? (
      <ToastType1 margin={30} content={this.state.notifToast} />
    ) : (
      <View />
    );
  }
  /** CHECK ORDER BEFORE CHECKOUT */
  checkOrder() {
    const { order } = this.state.privileges;
    if (order?.status) {
      this.setState({ checkNoOrder: true });
      this.props.merchantGetLogPerActivityProcessV2({
        journeyBookStoresId: this.props.merchant.selectedMerchant
          .journeyBookStores.id,
        activity: 'order'
      });
    } else {
      this.checkoutProcess();
    }
  }
  /**
   * ====================
   * MODAL
   * =====================
   */
  renderModalCheckout() {
    return this.state.openModalCheckout ? (
      <ModalBottomMerchantCheckout
        open={this.state.openModalCheckout}
        close={() => this.setState({ openModalCheckout: false })}
        onPress={
          () => {
            if (this.props.merchant.selectedMerchant.collectionIds.length > 0) {
              this.checkCollectionStatus();
            } else {
              this.checkOrder();
            }
          }
          // this.props.merchantPostActivityProcess({
          //   journeyPlanSaleId: this.props.merchant.selectedMerchant.journeyPlanSaleId,
          //   activity: 'check_out'
          // })
        }
      />
    ) : (
      <View />
    );
  }
  /** RENDER MODAL CONFIRM DELETE CART */
  renderModalNoOrderConfirmation() {
    return this.state.openModalConfirmNoOrder ? (
      <ModalConfirmation
        title={'Konfirmasi'}
        open={this.state.openModalConfirmNoOrder}
        content={'Apakah ada order di toko ini pada hari ini ?'}
        type={'okeRed'}
        okText={'Ya'}
        cancelText={'Tidak'}
        ok={() => {
          this.setState({
            openModalConfirmNoOrder: false
          });
          setTimeout(() => {
            NavigationService.navigate('PdpView');
          }, 10);
        }}
        cancel={() => {
          NavigationService.navigate('MerchantNoOrderReason');
          this.setState({ openModalConfirmNoOrder: false });
        }}
      />
    ) : (
      <View />
    );
  }
  /** RENDER MODAL CONFIRM NO COLLECTION */
  renderModalNoCollectionConfirmation() {
    return this.state.openModalConfirmNoCollection ? (
      <ModalConfirmation
        title={'Konfirmasi'}
        open={this.state.openModalConfirmNoCollection}
        content={
          'Masih ada Tagihan yang belum terbayar penuh. Tetap ingin keluar?'
        }
        type={'okeRed'}
        okText={'Ya'}
        cancelText={'Tidak'}
        ok={() => {
          this.setState({ openModalConfirmNoCollection: false });
          setTimeout(() => {
            NavigationService.navigate('MerchantNoCollectionReason');
          }, 10);
        }}
        cancel={() => {
          this.setState({
            openModalConfirmNoCollection: false
          });
          setTimeout(() => {
            NavigationService.navigate('SfaView');
          }, 10);
        }}
      />
    ) : (
      <View />
    );
  }
  /** MODAL ERROR RESPONS */
  renderModalErrorRespons() {
    return this.state.openModalErrorGlobal ? (
      <ModalBottomErrorRespons
        open={this.state.openModalErrorGlobal}
        onPress={() => {
          this.setState({ openModalErrorGlobal: false });
          if (this.props.merchant.errorGetLogAllActivityV2) {
            return NavigationService.navigate('JourneyView');
          }
        }}
      />
    ) : (
      <View />
    );
  }
  /** RENDER MODAL REJECTED */
  renderModalVerifyUser() {
    return this.state.openModalCheckUser ? (
      <MerchantVerifyUser
        pageFocus={this.props.navigation.isFocused()}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
      />
    ) : (
      <View />
    );
  }
  /** RENDER MODAL BEFORE CHECKIN */
  renderModalBeforeCheckIn() {
    return (
      <ModalBeforeCheckIn
        open={this.state.openModalBeforeCheckIn}
        ok={() => this.setState({ openModalBeforeCheckIn: false })}
      />
    );
  }
  /** RENDER MODAL OVERDUE */
  renderModalOverdue() {
    return this.state.openModalOverdue ? (
      <ModalConfirmationType6
        title={'Toko Ini Memiliki Transaksi Overdue'}
        content={
          'Silahkan konfirmasi kepada toko terkait transaksi tersebut. Anda juga dapat melakukan penagihan.'
        }
        open={this.state.openModalOverdue}
        onBackButtonPress={() => this.setState({ openModalOverdue: false })}
        onBackdropPress={() => this.setState({ openModalOverdue: false })}
        okText={'Baik, Mengerti'}
        ok={() =>
          this.setState({ openModalOverdue: false, openModalCheckUser: true })
        }
      />
    ) : (
      <View />
    );
  }
  /** BACKGROUND */
  renderBackground() {
    return <View style={styles.backgroundRed} />;
  }
  /** === RENDER MAIN === */
  render() {
    return (
      <SafeAreaView>
        <StatusBarRed />
        {!this.props.merchant.loadingGetMerchantLastOrder &&
        !this.props.merchant.loadingGetLogAllActivity &&
        this.props.merchant.dataGetLogAllActivityV2 !== null &&
        !this.state.loadingPostForCheckoutNoOrder &&
        this.props.sfa.dataSfaGetStatusOrder &&
        !this.props.sfa.loadingSfaGetStatusOrder ? (
          <View style={{ height: '100%' }}>
            {this.renderBackground()}
            {this.renderContent()}
          </View>
        ) : (
          <View style={{ height: '100%' }}>
            <LoadingPage />
          </View>
        )}
        {/* modal */}
        {this.renderModalCheckout()}
        {this.renderModalNoOrderConfirmation()}
        {this.renderToast()}
        {this.renderModalErrorRespons()}
        {this.renderModalVerifyUser()}
        {this.renderModalProgressChecking()}
        {this.renderModalBeforeCheckIn()}
        {this.renderModalOverdue()}
        {this.renderModalNoCollectionConfirmation()}
        <ModalBottomSuccessOrder />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    height: '100%',
    position: 'absolute',
    zIndex: 1000
  },
  backgroundRed: {
    backgroundColor: Color.mainColor,
    height: 85
  },
  containerSlider: {
    flex: 1,
    paddingBottom: 5
  },
  inactiveDot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: 'rgba(51,51,51, 0.2)'
  },
  activeDot: {
    width: 20,
    height: 6,
    borderRadius: 5,
    backgroundColor: 'red'
  },
  // CARD
  cardPromo: {
    borderRadius: 15,
    borderWidth: 0,
    height: 0.31 * height,
    width: 0.9 * width,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#777777',
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignItems: 'flex-start',
    marginLeft: 0.015 * width,
    marginTop: 2,
    marginRight: 0.03 * width
  },
  productImage: {
    resizeMode: 'contain',
    width: 57,
    height: undefined,
    aspectRatio: 1 / 1
  },
  textPlusProduct: {
    color: '#333333',
    fontSize: RFPercentage(1.3),
    fontFamily: Fonts.MontserratMedium
  },
  // SEMENTARA
  cardTask: {
    flex: 1,
    flexDirection: 'column',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#777777',
    shadowOpacity: 0.22,
    shadowRadius: 2.22
  },
  containerTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 0.1 * width
  },
  containerList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10
  },
  checkBox: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  taskBox: {
    flex: 2,
    justifyContent: 'center'
  },
  rightArrow: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  wrapMenu: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  /** for content */
  lastOrderContainer: {
    paddingHorizontal: 16,
    paddingTop: 11,
    paddingBottom: 5,
    width: width
  },
  cardLastOrder: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Color.backgroundWhite
  },
  boxFaktur: {
    marginBottom: 8
  },
  cardTaskList: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: Color.backgroundWhite
  },
  /** for menu */
  containerMenu: {
    paddingHorizontal: 16
  },
  taskListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: width
  },
  boxMenu: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 10
  },
  boxMainMenu: {
    paddingTop: 10,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  iconSize: {
    height: 50,
    width: 70
  },
  boxNotification: {
    position: 'absolute',
    top: -5,
    right: -5,
    zIndex: 1000
  },
  buttonGoTo: {
    backgroundColor: Color.fontRed50,
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: '100%'
  },
  buttonDetailNoVisitReason: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: -5,
    marginTop: -5
  },
  containerSurveyInProgress: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: -5,
    marginTop: -5
  },
  containerChevronRight: {
    marginTop: 2,
    padding: 0
  }
});

const mapStateToProps = ({
  auth,
  merchant,
  user,
  permanent,
  privileges,
  profile,
  privileges,
  oms
}) => {
  return { auth, merchant, user, permanent, profile, privileges, oms, sfa };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantHomeView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 05102021
 * updatedFunction:
 * -> fix the validation when checking out. (must completed the survey)
 */
