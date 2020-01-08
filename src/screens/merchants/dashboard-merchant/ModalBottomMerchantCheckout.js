import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import GestureRecognizer, {
  swipeDirections
} from 'react-native-swipe-gestures';
import masterColor from '../../../config/masterColor.json';
import { StatusBarBlackOP40 } from '../../../components/StatusBarGlobal';
import Fonts from '../../../helpers/GlobalFont';
import SearchBarType1 from '../../../components/search_bar/SearchBarType1';
import * as ActionCreators from '../../../state/actions';
import TagList from '../../../components/TagList';
import SkeletonType2 from '../../../components/skeleton/SkeletonType2';
import ButtonSingle from '../../../components/button/ButtonSingle';
import GlobalStyle from '../../../helpers/GlobalStyle';

const { height } = Dimensions.get('window');

class ModalBottomMerchantCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: true
    };
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    );
  }

  keyboardDidShow = () => {
    this.setState({ showList: false });
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }

  checkout() {
    let storeLogCheckout = {
      joerneyPlanSaleId: this.props.merchant.selectedMerchant
        .journeyPlanSalePortfolios[0].journeyPlanSaleId,
      activity: 'check_out'
    };
    this.props.merchantCheckoutProcess(storeLogCheckout);
  }
  /**
   * ==================
   * RENDER VIEW
   * ==================
   */
  /** === RENDER TITLE === */
  renderContentTitle() {
    return (
      <GestureRecognizer
        onSwipeDown={() => this.setState({ showList: false })}
        onSwipeUp={() => this.setState({ showList: true })}
      >
        <View style={{ alignItems: 'center' }}>
          <View style={GlobalStyle.linesSwipeModal} />
        </View>
        <View style={styles.boxContentTitle}>
          <TouchableOpacity style={styles.boxClose} onPress={this.props.close}>
            <MaterialIcon
              name="close"
              color={masterColor.fontBlack50}
              size={24}
            />
          </TouchableOpacity>

          <View>
            <Text style={Fonts.type7}>Toko Existing</Text>
          </View>
        </View>
        <View style={GlobalStyle.lines} />
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 10
          }}
        >
          <Text style={Fonts.type8}>
            ID {this.props.merchant.selectedMerchant.store.storeCode} -{' '}
            {this.props.merchant.selectedMerchant.store.name}
          </Text>
        </View>
        <View style={GlobalStyle.lines} />
      </GestureRecognizer>
    );
  }
  /** RENDER CONTENT LIST */
  renderContentList() {
    return this.state.showList ? (
      <View
        style={{
          flex: 1,
          height: 0.4 * height
        }}
      >
        <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 14, lineHeight: 16 }}>
            {this.props.merchant.selectedMerchant.store.address}
          </Text>
          <Text
            style={{
              fontSize: 13,
              lineHeight: 16,
              color: '#52575c',
              marginTop: 15
            }}
          >
            {this.props.merchant.selectedMerchant.store.urban.urban},
            {this.props.merchant.selectedMerchant.store.urban.district},
            {this.props.merchant.selectedMerchant.store.urban.city},
            {this.props.merchant.selectedMerchant.store.urban.zipCode}
          </Text>
        </View>
        <View>
          {this.props.merchant.selectedMerchant.journeyPlanSalePortfolios
            .length > 0 ? (
            <ButtonSingle
              disabled={false}
              title={'Check Out'}
              borderRadius={4}
              onPress={() => this.checkout()}
            />
          ) : (
            <ButtonSingle
              disabled={true}
              title={'Sorry cannot check-out'}
              borderRadius={4}
            />
          )}
        </View>
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER BODY === */
  renderContentBody() {
    return (
      <View style={styles.boxContentBody}>{this.renderContentList()}</View>
    );
  }
  /** === RENDER STATUS BAR === */
  renderContent() {
    return (
      <Modal
        isVisible={this.props.open}
        useNativeDriver={true}
        hasBackdrop={true}
        coverScreen={true}
        backdropColor={masterColor.fontBlack100}
        backdropOpacity={0.4}
        deviceHeight={height}
        style={styles.mainContainer}
      >
        <View style={[styles.contentContainer, GlobalStyle.shadow]}>
          {this.renderContentTitle()}
          {this.renderContentBody()}
        </View>
      </Modal>
    );
  }
  /** === MAIN === */
  render() {
    return <View>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  contentContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomWidth: 0,
    maxHeight: 0.45 * height,
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 2000
  },
  boxContentBody: {
    flex: 1
    // paddingVertical: 10
  },
  boxContentTitle: {
    marginTop: 18,
    marginBottom: 15,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boxClose: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    left: 16
  }
});

const mapStateToProps = ({ user, merchant }) => {
  return { user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBottomMerchantCheckout);
