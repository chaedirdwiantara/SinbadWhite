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
  NavigationEvents,
  Button
} from '../../../library/thirdPartyPackage';
import {
  StatusBarRed,
  ProductListType1,
  LoadingPage,
  ToastType1,
  ModalConfirmation,
  ModalBottomErrorRespons
} from '../../../library/component';
import { GlobalStyle, Fonts, MoneyFormat } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import ModalBottomMerchantCheckout from './ModalBottomMerchantCheckout';
import ModalBottomSuccessOrder from './ModalBottomSuccessOrder';
import MerchantVerifyUser from './MerchantVerifyUser';
import ModalBottomProgressChecking from '../../global/ModalBottomProgressChecking';
import {
  ACTIVITY_JOURNEY_PLAN_CHECK_IN,
  ACTIVITY_JOURNEY_PLAN_CHECK_OUT,
  ACTIVITY_JOURNEY_PLAN_ORDER,
  ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY,
  ACTIVITY_JOURNEY_PLAN_COLLECTION
} from '../../../constants';
import _ from 'lodash';

const { width, height } = Dimensions.get('window');

class MerchantHomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCheckout: false,
      openModalConfirmNoOrder: false,
      openModalErrorGlobal: false,
      openModalCheckUser: false,
      openModalProgressChecking: false,
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
          menuName: 'Toko Survey',
          icon: require('../../../assets/icons/merchant/pesanan.png'),
          goTo: 'survey'
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
          name: 'Check-in Toko',
          title: 'Check-in',
          goTo: 'checkIn',
          activity: ACTIVITY_JOURNEY_PLAN_CHECK_IN
        },
        {
          name: 'Order',
          title: 'Order',
          goTo: 'pdp',
          activity: ACTIVITY_JOURNEY_PLAN_ORDER
        },
        // {
        //   name: 'Penagihan',
        //   title: 'Tagih',
        //   goTo: 'collection',
        //   activity: ACTIVITY_JOURNEY_PLAN_COLLECTION
        // },
        {
          name: 'Check-out Toko',
          title: 'Check-out',
          goTo: 'checkOut',
          activity: ACTIVITY_JOURNEY_PLAN_CHECK_OUT
        }
      ],
      successSurveyList: false
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

  /** FOR GET LOG ALL ACTIVITY */
  refreshMerchantGetLogAllActivityProcess() {
    this.props.merchantGetLogAllActivityProcess(
      this.props.merchant.selectedMerchant.journeyPlanSaleId
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
    /** FOR GET LAST ORDER */
    this.props.merchantGetLastOrderProcess(
      this.props.merchant.selectedMerchant.storeId
    );
    /** FOR GET LOG ALL ACTIVITY */
    this.props.merchantGetLogAllActivityProcess(
      this.props.merchant.selectedMerchant.journeyPlanSaleId
    );
    /** FOR GET SURVEY LIST */
    this.getSurvey();
    /** FOR GET SFA STATUS ORDER */
    this.props.sfaGetStatusOrderProcess()
  }

  componentDidUpdate(prevProps) {
    const { surveyList } = this.props.merchant;
    console.log('SURVEY LIST', surveyList, this.state.successSurveyList);
    const sfaStatus =  this.props.sfa.dataSfaGetStatusOrder
    console.log("woii:", this.props.merchant.dataGetLogAllActivity);
    /** IF NO SURVEY */
    if (
      _.isEmpty(surveyList.payload.data) &&
      surveyList.success &&
      !this.state.successSurveyList &&
      sfaStatus
    ) {
      this.setState({ successSurveyList: true }, () => this.SurveyDone());
      if (this.state.task.length === 3) {
        if (sfaStatus.data.totalInvoice > 0 ) {
          this.setState({
            task: [
              {
                name: 'Check-in Toko',
                title: 'Check-in',
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
                name: 'Penagihan',
                title: 'Tagih',
                goTo: 'collection',
                activity: ACTIVITY_JOURNEY_PLAN_COLLECTION
              },
              {
                name: 'Check-out Toko',
                title: 'Check-out',
                goTo: 'checkOut',
                activity: ACTIVITY_JOURNEY_PLAN_CHECK_OUT
              }
            ]
          });
        } 
      }
    }
    /** IF SURVEY LIST EXIST */
    if (!_.isEmpty(surveyList.payload.data) && surveyList.success && sfaStatus) {
      if (this.state.task.length === 3) {
        if (sfaStatus.data.totalInvoice > 0) {
          this.setState({
            task: [
              {
                name: 'Check-in Toko',
                title: 'Check-in',
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
                name: 'Penagihan',
                title: 'Tagih',
                goTo: 'collection',
                activity: ACTIVITY_JOURNEY_PLAN_COLLECTION
              },
              {
                name: 'Toko Survey',
                title: 'Isi',
                goTo: 'survey',
                activity: ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY
              },
              {
                name: 'Check-out Toko',
                title: 'Check-out',
                goTo: 'checkOut',
                activity: ACTIVITY_JOURNEY_PLAN_CHECK_OUT
              }
            ]
          });
        } else {
          this.setState({
            task: [
              {
                name: 'Check-in Toko',
                title: 'Check-in',
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
                name: 'Toko Survey',
                title: 'Isi',
                goTo: 'survey',
                activity: ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY
              },
              {
                name: 'Check-out Toko',
                title: 'Check-out',
                goTo: 'checkOut',
                activity: ACTIVITY_JOURNEY_PLAN_CHECK_OUT
              }
            ]
          });
        }
      }
    }
    /** IF ALL SURVEYS ARE COMPLETE AND ACTIVITY NOT COMPLETE YET */
    if (
      !_.isEmpty(surveyList.payload.data) &&
      surveyList.success &&
      !this.state.successSurveyList
    ) {
      if (
        surveyList.payload.data.length ===
        surveyList.payload.data.filter(
          item => item.responseStatus === 'completed'
        ).length
      ) {
        if (this.props.merchant.dataGetLogAllActivity) {
          if (
            !this.props.merchant.dataGetLogAllActivity.find(
              item => item.activity === 'toko_survey'
            )
          ) {
            this.setState({ successSurveyList: true }, () => this.SurveyDone());
          }
        }
      }
    }
    if (
      prevProps.merchant.dataPostActivity !==
      this.props.merchant.dataPostActivity
    ) {
      if (this.props.merchant.dataPostActivity !== null) {
        /** IF SURVEY DONE SUCCESS */
        if (
          this.props.merchant.dataPostActivity.activity ===
          ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY
        ) {
          /** FOR GET LOG ALL ACTIVITY */
          this.refreshMerchantGetLogAllActivityProcess();
        }
      }
      if (this.props.merchant.dataPostActivity !== null) {
        /** IF CHECK OUT SUCCESS */
        if (this.props.merchant.dataPostActivity.activity === 'check_out') {
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
          this.props.merchantGetLogAllActivityProcess(
            this.props.merchant.selectedMerchant.journeyPlanSaleId
          );
        } else if (
          /** IF CHECK OUT SUCCESS */
          this.props.merchant.dataPostActivity.activity === 'check_in'
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
          this.props.merchantGetLogAllActivityProcess(
            this.props.merchant.selectedMerchant.journeyPlanSaleId
          );
        }
      }
    }
    if (
      prevProps.merchant.dataGetLogPerActivity !==
      this.props.merchant.dataGetLogPerActivity
    ) {
      if (this.props.merchant.dataGetLogPerActivity !== null) {
        if (this.props.merchant.dataGetLogPerActivity.length > 0) {
          if (
            this.props.merchant.dataGetLogPerActivity[0].activity === 'order'
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
    /** FOR ERROR */
    /** error post */
    if (
      prevProps.merchant.errorPostActivity !==
      this.props.merchant.errorPostActivity
    ) {
      if (this.props.merchant.errorPostActivity !== null) {
        this.doError();
      }
    }
    /** error get per activity */
    if (
      prevProps.merchant.errorGetLogPerActivity !==
      this.props.merchant.errorGetLogPerActivity
    ) {
      if (this.props.merchant.errorGetLogPerActivity !== null) {
        this.doError();
      }
    }
    /** error get per activity */
    if (
      prevProps.merchant.errorGetLogAllActivity !==
      this.props.merchant.errorGetLogAllActivity
    ) {
      if (this.props.merchant.errorGetLogAllActivity !== null) {
        this.doError();
      }
    }
  }

  componentWillUnmount() {
    this.props.journeyPlanGetReset();
    this.props.journeyPlanGetProcess({ page: 0, loading: true });
    this.props.getJourneyPlanReportProcess(
      this.props.user.userSuppliers.map(item => item.supplierId)
    );
  }
  /** CHECKOUT PROCESS */
  checkoutProcess() {
    this.props.merchantPostActivityProcess({
      journeyPlanSaleId: this.props.merchant.selectedMerchant.journeyPlanSaleId,
      activity: 'check_out'
    });
  }

  /*
   * Set sales activity survey_toko done
   */
  SurveyDone() {
    this.props.merchantPostActivityProcess({
      journeyPlanSaleId: this.props.merchant.selectedMerchant.journeyPlanSaleId,
      activity: ACTIVITY_JOURNEY_PLAN_TOKO_SURVEY
    });
  }

  /** FOR ERROR FUNCTION (FROM DID UPDATE) */
  doError() {
    /** Close all modal and open modal error respons */
    this.setState({
      openModalErrorGlobal: true,
      openModalCheckout: false,
      openModalConfirmNoOrder: false,
      loadingPostForCheckoutNoOrder: false
    });
  }
  /** === GO TO (MENU PRESS) */
  goTo(page) {
    switch (page) {
      case 'pdp':
        this.setState({ openModalCheckUser: true });
        break;
      case 'history':
        NavigationService.navigate('HistoryView', {
          storeId: this.props.merchant.selectedMerchant.storeId
        });
        break;
      case 'checkIn':
        NavigationService.navigate('MerchantCheckinView');
        break;
      case 'checkOut':
        this.props.merchantGetLogPerActivityProcess({
          journeyPlanSaleId: this.props.merchant.selectedMerchant
            .journeyPlanSaleId,
          activity: 'check_in'
        });
        if (
          _.isEmpty(this.props.merchant.surveyList.payload.data) ||
          this.props.merchant.dataGetLogAllActivity.find(
            item => item.activity === 'toko_survey'
          )
        ) {
          this.setState({ openModalCheckout: true });
        }
        break;
      case 'survey':
        if (
          this.props.merchant.dataGetLogAllActivity.find(
            item => item.activity === 'check_in'
          )
        ) {
          NavigationService.navigate('MerchantSurveyView', { readOnly: false });
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

  /** CUSTOM NAVIGATE VIEW NO ORDER REASON PAGE */
  navigateViewNoOrderReasonPage = data => {
    NavigationService.navigate('MerchantNoOrderReason', {
      noOrderReason: data
    });
  };

  navigateSurveyReadOnly = data => {
    NavigationService.navigate('MerchantSurveyView', {
      readOnly: true,
      data
    });
  };

  /** CHECK CHECK LIST TASK */
  checkCheckListTask(activity) {
    if (this.props.merchant.dataGetLogAllActivity !== null) {
      let checkActivity = this.props.merchant.dataGetLogAllActivity.filter(
        function(rows) {
          return rows.activity === activity;
        }
      );
      if (activity === ACTIVITY_JOURNEY_PLAN_ORDER) {
        let getOrderStatus = this.props.merchant.dataGetLogAllActivity.filter(
          function(rows) {
            return rows.activity === ACTIVITY_JOURNEY_PLAN_ORDER;
          }
        );
        if (getOrderStatus.length < 1) {
          let getNoOrder = this.props.merchant.dataGetLogAllActivity.filter(
            function(rows) {
              return rows.activity === ACTIVITY_JOURNEY_PLAN_CHECK_OUT;
            }
          );
          if (getNoOrder.length > 0) {
            let newOrderStatus = { ...getNoOrder[0] };
            newOrderStatus.activity = ACTIVITY_JOURNEY_PLAN_ORDER;
            return newOrderStatus;
          } else {
            return false;
          }
        } else {
          return getOrderStatus[0];
        }
      }

      // if (activity === ACTIVITY_JOURNEY_PLAN_COLLECTION) {
        
      //       return true;
          
      // }

      if (checkActivity.length > 0) {
        return checkActivity[0];
      }
      return false;
    }
    return false;
  }
  /** CHECK TOTAL COMPLETE TASK */
  checkTotalCompleteTask() {
    let total = 0;
    if (this.props.merchant.dataGetLogAllActivity !== null) {
      this.state.task.map((item, index) => {
        const checkActivity = this.props.merchant.dataGetLogAllActivity.findIndex(
          itemAllActivity => itemAllActivity.activity === item.activity
        );
        if (checkActivity > -1) {
          total = total + 1;
        }
      });
    }
    return total;
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */

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
    return order !== undefined ? (
      <View style={styles.lastOrderContainer}>
        <View style={[styles.cardLastOrder, GlobalStyle.shadowForBox5]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 8
            }}
          >
            <Text style={Fonts.type42}>Last Order</Text>
            <TouchableOpacity
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
              <Text style={Fonts.type100}>See Order History</Text>
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
              Total: {MoneyFormat(order.orderParcels[0].parcelFinalPrice)}
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
            <Text style={Fonts.type64}>Task List</Text>
            <Text style={Fonts.type31}>
              {this.checkTotalCompleteTask()}/{this.state.task.length} Complete
            </Text>
          </View>
          {this.state.task.map((item, index) => {
            const taskList = this.checkCheckListTask(item.activity);
            const sfaStatus = this.props.sfa.dataSfaGetStatusOrder.data
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
                      taskList.activity === ACTIVITY_JOURNEY_PLAN_ORDER &&
                      taskList.noOrderNotes ? (
                        <MaterialIcon
                          // name="check-circle"
                          // name="timelapse"
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
                      sfaStatus.totalOverdueInvoice === 0 ? (
                        <MaterialIcon
                          name="check-circle"
                          color={Color.fontGreen50}
                          size={24}
                        />
                      // ) : sfaStatus.totalOverdueInvoice > 1 ? (
                      //   <MaterialIcon
                      //     name="cancel"
                      //     color={Color.fontRed50}
                      //     size={24}
                      //   />
                      ) : sfaStatus.totalOverdueInvoice >= 1 ? (
                        <MaterialIcon
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
                      <MaterialIcon
                        name="radio-button-unchecked"
                        color={Color.fontBlack40}
                        size={24}
                      />
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
                    taskList.activity === ACTIVITY_JOURNEY_PLAN_CHECK_IN ||
                    taskList.activity === ACTIVITY_JOURNEY_PLAN_CHECK_OUT ? (
                      <Text style={Fonts.type107}>
                        {taskList.activity === ACTIVITY_JOURNEY_PLAN_CHECK_IN
                          ? `Check In ${moment(taskList.createdAt).format(
                              'HH:mm'
                            )}`
                          : `Check Out ${moment(taskList.createdAt).format(
                              'HH:mm'
                            )}`}
                      </Text>
                    ) : taskList.activity === ACTIVITY_JOURNEY_PLAN_ORDER ? (
                      taskList.noOrderNotes ? (
                        <TouchableOpacity
                          onPress={() => {
                            this.navigateViewNoOrderReasonPage(taskList);
                          }}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: -5
                          }}
                        >
                          <Text style={Fonts.type100}>See Reason</Text>
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
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: -5
                          }}
                        >
                          <Text style={Fonts.type51}>Completed</Text>
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
                    ) : taskList.activity ===
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
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: -5
                        }}
                      >
                        <Text style={Fonts.type51}>Completed</Text>
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
            parseInt(this.props.merchant.selectedMerchant.storeId, 10)
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
    return (
      <View>
        {/* {this.renderData()} */}
        {this.renderLastOrder()}
        {this.renderTastList()}
        {/* {this.renderMerchantMenu()} */}
      </View>
    );
  }
  /** RENDER MODAL PROGRESS CHECKING */
  renderModalProgressChecking() {
    return this.state.openModalProgressChecking ? (
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
            this.setState({ checkNoOrder: true });
            this.props.merchantGetLogPerActivityProcess({
              journeyPlanSaleId: this.props.merchant.selectedMerchant
                .journeyPlanSaleId,
              activity: 'order'
            });
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
  /** MODAL ERROR RESPONS */
  renderModalErrorRespons() {
    return this.state.openModalErrorGlobal ? (
      <ModalBottomErrorRespons
        open={this.state.openModalErrorGlobal}
        onPress={() => {
          this.setState({ openModalErrorGlobal: false });
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
  /** BACKGROUND */
  renderBackground() {
    return <View style={styles.backgroundRed} />;
  }
  /** === RENDER MAIN === */
  render() {
    return (
      <SafeAreaView>
        <NavigationEvents onDidFocus={() => this.getSurvey()} />
        <StatusBarRed />
        {!this.props.merchant.loadingGetMerchantLastOrder &&
        this.props.merchant.dataGetMerchantLastOrder !== null &&
        !this.props.merchant.loadingGetLogAllActivity &&
        this.props.merchant.dataGetLogAllActivity !== null &&
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
  }
});

const mapStateToProps = ({ auth, merchant, user, permanent, sfa }) => {
  return { auth, merchant, user, permanent, sfa };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MerchantHomeView);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: tatas
 * updatedDate: 01072020
 * updatedFunction:
 * -> Add checking user status
 * updatedDate: 02072020
 * updatedFunction:
 * -> Remove unused state
 * -> Add function to change modal check status False after navigate
 * updatedDate: 03072020
 * updatedFunction:
 * -> Change key
 * updatedBy: dyah
 * updatedDate: 02122020
 * updatedFunction:
 * -> Add validation for checkout.
 */
