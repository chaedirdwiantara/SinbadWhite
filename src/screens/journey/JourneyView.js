import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';
import Fonts from '../../helpers/GlobalFont';
import ButtonFloatType1 from '../../components/button/ButtonFloatType1';
import { StatusBarWhite } from '../../components/StatusBarGlobal';
import ToastType1 from '../../components/toast/ToastType1';
import ModalBottomSwipeCloseNotScroll from '../../components/modal_bottom/ModalBottomSwipeCloseNotScroll';
import ModalContentMenuAddMerchant from './ModalContentMenuAddMerchant';
import ModalBottomMerchantList from '../merchants/ModalBottomMerchantList';
import JourneyListDataView from './JourneyListDataView';
import { MoneyFormat } from '../../helpers/NumberFormater';
import BackHandlerBackSpecific from '../../components/BackHandlerBackSpecific';

class JourneyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalAddMerchant: false,
      openModalMerchantList: false,
      showToast: false,
      notifToast: ''
    };
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => NavigationService.navigate('HomeView')}
        >
          <MaterialIcon
            color={masterColor.fontBlack50}
            name={'arrow-back'}
            size={24}
          />
        </TouchableOpacity>
      )
    };
  };
  /**
   * ================
   * FUNCTIONAL
   * =================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.props.journeyPlanGetReset();
    this.props.journeyPlanGetProcess({ page: 0, loading: true });
    this.props.getJourneyPlanReportProcess(
      this.props.user.userSuppliers.map(item => item.supplierId)
    );
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (
      prevProps.journey.dataSaveMerchantToJourneyPlan !==
      this.props.journey.dataSaveMerchantToJourneyPlan
    ) {
      if (this.props.journey.dataSaveMerchantToJourneyPlan !== null) {
        this.props.journeyPlanGetReset();
        this.props.journeyPlanGetProcess({ page: 0, loading: true });
        this.props.getJourneyPlanReportProcess(
          this.props.user.userSuppliers.map(item => item.supplierId)
        );
        this.setState({ openModalMerchantList: false });
      }
    }
    /** IF ADD MERCHANT SUCCESS */
    if (
      prevProps.merchant.dataAddMerchant !== this.props.merchant.dataAddMerchant
    ) {
      if (this.props.merchant.dataAddMerchant !== null) {
        this.setState({
          openModalCheckout: false,
          showToast: true,
          notifToast: 'Tambah Toko Berhasil'
        });
        setTimeout(() => {
          this.setState({ showToast: false });
        }, 3000);
      }
    }
  }
  /** === ADD MERCHANT TO JOURNEY === */
  addMerchant() {
    this.setState({ openModalAddMerchant: true });
  }
  /** go to page */
  goTo(type) {
    switch (type) {
      case 'existing_merchant':
        this.setState({
          openModalAddMerchant: false,
          openModalMerchantList: true
        });
        break;
      case 'new_merchant':
        this.setState({ openModalAddMerchant: false });
        this.props.savePageAddMerchantFrom('JourneyView');
        setTimeout(() => {
          NavigationService.navigate('AddMerchantStep1');
        }, 100);
        break;
      default:
        break;
    }
  }
  /**
   * =================
   * RENDER VIEW
   * =================
   */
  /** === EMPTY JOURNEY === */
  renderJourneyListData() {
    return <JourneyListDataView />;
  }
  /** === RENDER HEADER === */
  renderHeader() {
    return !this.props.journey.loadingGetJourneyPlanReport &&
      this.props.journey.dataGetJourneyPlanReport !== null ? (
      <View style={styles.headerContainer}>
        <View style={styles.boxHeader}>
          <Text style={[Fonts.type27, { marginBottom: 5 }]}>
            {this.props.journey.dataGetJourneyPlanReport.total}/
            {this.props.journey.dataGetJourneyPlanReport.target}
          </Text>
          <Text style={Fonts.type26}>Toko Visit</Text>
        </View>
        <View style={styles.boxHeader}>
          <Text style={[Fonts.type27, { marginBottom: 5 }]}>
            {MoneyFormat(
              this.props.journey.dataGetJourneyPlanReport.totalOrder
            )}
          </Text>
          <Text style={Fonts.type26}>Toko Order</Text>
        </View>
      </View>
    ) : (
      <SkeletonPlaceholder>
        <View style={{ height: 70 }} />
      </SkeletonPlaceholder>
    );
  }
  /** === BUTTON ADD JOURNEY === */
  renderButtonAddJourney() {
    return !this.props.journey.loadingGetJourneyPlan ? (
      <View style={styles.containerFloatButton}>
        <ButtonFloatType1
          title={'Tambah Toko'}
          push={() => this.addMerchant()}
        />
      </View>
    ) : (
      <View />
    );
  }
  /**
   * ======================
   * MODAL
   * ======================
   */
  /** TOAST */
  renderToast() {
    return this.state.showToast ? (
      <ToastType1 margin={30} content={this.state.notifToast} />
    ) : (
      <View />
    );
  }
  /** MODAL MENU ADD MERCHANT */
  renderModalAddMerchant() {
    return this.state.openModalAddMerchant ? (
      <View>
        <ModalBottomSwipeCloseNotScroll
          open={this.state.openModalAddMerchant}
          closeButton
          title={'Tambah Toko'}
          close={() => this.setState({ openModalAddMerchant: false })}
          content={
            <ModalContentMenuAddMerchant
              onRef={ref => (this.parentFunction = ref)}
              parentFunction={this.goTo.bind(this)}
            />
          }
        />
      </View>
    ) : (
      <View />
    );
  }
  /** MODAL MERCHANT LIST */
  renderModalMerchantList() {
    return this.state.openModalMerchantList ? (
      <ModalBottomMerchantList
        open={this.state.openModalMerchantList}
        close={() => this.setState({ openModalMerchantList: false })}
      />
    ) : (
      <View />
    );
  }
  /** ===================== */
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <BackHandlerBackSpecific
          navigation={this.props.navigation}
          page={'HomeView'}
        />
        <StatusBarWhite />
        {this.renderHeader()}
        {this.renderButtonAddJourney()}
        {this.renderJourneyListData()}
        {/* modal */}
        {this.renderModalAddMerchant()}
        {this.renderModalMerchantList()}
        {this.renderToast()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  headerContainer: {
    backgroundColor: masterColor.mainColor,
    flexDirection: 'row',
    paddingVertical: 13
  },
  containerFloatButton: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 1000
  },
  boxHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ journey, user, merchant }) => {
  return { journey, user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(JourneyView);
