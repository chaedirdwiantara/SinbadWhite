import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';
import Fonts from '../../helpers/GlobalFont';
import ButtonFloatType1 from '../../components/button/ButtonFloatType1';
import EmptyData from '../../components/empty_state/EmptyData';
import { StatusBarWhite } from '../../components/StatusBarGlobal';
import ModalBottomSwipeCloseNotScroll from '../../components/modal_bottom/ModalBottomSwipeCloseNotScroll';
import ModalContentMenuAddMerchant from './ModalContentMenuAddMerchant';
import ModalBottomMerchantList from '../merchants/ModalBottomMerchantList';
import JourneyListDataView from './JourneyListDataView';

class JourneyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalAddMerchant: false,
      openModalMerchantList: false
    };
  }
  /**
   * ================
   * FUNCTIONAL
   * =================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.props.journeyPlanGetReset();
    this.props.journeyPlanGetProcess({ page: 0, loading: true });
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
    return (
      <View style={styles.headerContainer}>
        <View style={styles.boxHeader}>
          <Text style={[Fonts.type27, { marginBottom: 5 }]}>0</Text>
          <Text style={Fonts.type26}>Toko Visit</Text>
        </View>
        <View style={styles.boxHeader}>
          <Text style={[Fonts.type27, { marginBottom: 5 }]}>Rp 0</Text>
          <Text style={Fonts.type26}>Toko Order</Text>
        </View>
      </View>
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
        <StatusBarWhite />
        {this.renderHeader()}
        {this.renderButtonAddJourney()}
        {this.renderJourneyListData()}
        {/* modal */}
        {this.renderModalAddMerchant()}
        {this.renderModalMerchantList()}
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

const mapStateToProps = ({ journey }) => {
  return { journey };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(JourneyView);
