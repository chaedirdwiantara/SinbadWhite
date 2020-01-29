import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import * as ActionCreators from '../../../state/actions';
import GlobalStyle from '../../../helpers/GlobalStyle';
import masterColor from '../../../config/masterColor.json';
import Fonts from '../../../helpers/GlobalFont';
import { StatusBarWhite } from '../../../components/StatusBarGlobal';
import ButtonSingle from '../../../components/button/ButtonSingle';
import { LoadingPage } from '../../../components/Loading';
import InputType3 from '../../../components/input/InputType3';
import ToastType1 from '../../../components/toast/ToastType1';
import NavigationService from '../../../navigation/NavigationService';

class MerchantNoOrderReason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReason: '',
      reason: '',
      showToast: false,
      notifToast: ''
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    this.props.merchantGetNoOrderReasonProcess();
  }
  /** DID UPDATE */
  componentDidUpdate(prevProps) {
    if (
      prevProps.merchant.dataPostActivity !==
      this.props.merchant.dataPostActivity
    ) {
      if (this.props.merchant.dataPostActivity !== null) {
        /** IF CHECK OUT SUCCESS */
        if (this.props.merchant.dataPostActivity.activity === 'check_out') {
          NavigationService.goBack(this.props.navigation.state.key);
          this.props.merchantGetLogAllActivityProcess(
            this.props.merchant.selectedMerchant.id
          );
          this.setState({
            showToast: true,
            notifToast: 'Keluar Toko Berhasil'
          });
          /** FOR GET LOG ALL ACTIVITY */
          this.props.merchantGetLogAllActivityProcess(
            this.props.merchant.selectedMerchant.id
          );
        }
      }
    }
  }
  /** REASON SELECT */
  selectReason(id) {
    if (id === this.state.selectedReason) {
      this.setState({ selectedReason: '' });
    } else {
      this.setState({ selectedReason: id });
    }
  }
  /** CHECKOUT */
  checkOut() {
    Keyboard.dismiss();
    this.props.merchantPostActivityProcess({
      journeyPlanSaleId: this.props.merchant.selectedMerchant.id,
      activity: 'check_out',
      noOrderReasonId: this.state.selectedReason,
      noOrderNotes: this.state.reason
    });
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** RENDER CONTENT ITEM */
  renderContentItem(item, index) {
    return (
      <TouchableOpacity key={index} onPress={() => this.selectReason(item.id)}>
        <View style={styles.boxContentItem}>
          <View style={{ flex: 1 }}>
            <Text style={Fonts.type8}>{item.reason}</Text>
          </View>
          <View style={styles.boxIconRight}>
            {this.state.selectedReason === item.id ? (
              <MaterialIcons
                name="check-circle"
                color={masterColor.mainColor}
                size={24}
              />
            ) : (
              <View style={styles.circleEmptyCheck} />
            )}
          </View>
        </View>
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
      </TouchableOpacity>
    );
  }
  /** RENDER CONTENT */
  renderContent() {
    return this.props.merchant.dataGetNoOrderReason.map((item, index) => {
      return this.renderContentItem(item, index);
    });
  }
  /** RENDER CONTENT REASON */
  renderContentReason() {
    return (
      <View style={{ marginTop: 20 }}>
        <InputType3
          title={'*Alasan'}
          value={this.state.reason}
          placeholder={'Masukan alasan Anda'}
          keyboardType={'default'}
          text={text => this.setState({ reason: text })}
          error={false}
          errorText={''}
        />
      </View>
    );
  }
  /** RENDER DATA */
  renderData() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          {this.renderContent()}
          {this.renderContentReason()}
        </ScrollView>
        {this.renderButton()}
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={
          this.state.selectedReason === '' ||
          this.state.reason === '' ||
          this.props.merchant.loadingPostActivity
        }
        title={'Keluar Toko'}
        loading={this.props.merchant.loadingPostActivity}
        borderRadius={4}
        onPress={() => this.checkOut()}
      />
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
  /** MAIN */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        {!this.props.merchant.loadingGetNoOrderReason &&
        this.props.merchant.dataGetNoOrderReason !== null ? (
          this.renderData()
        ) : (
          <LoadingPage />
        )}
        {/* modal */}
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
  boxContentItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  boxIconRight: {
    position: 'absolute',
    right: 20
  },
  circleEmptyCheck: {
    width: 22,
    height: 22,
    borderRadius: 22,
    backgroundColor: masterColor.fontBlack40
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantNoOrderReason);
