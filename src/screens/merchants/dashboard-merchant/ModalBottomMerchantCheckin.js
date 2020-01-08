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

class ModalBottomMerchantCheckin extends Component {
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

  checkin() {
    let storeLogCheckin = {
      joerneyPlanSaleId: this.props.merchant.selectedMerchant
        .journeyPlanSalePortfolios[0].journeyPlanSaleId,
      activity: 'check_in'
    };
    this.props.merchantCheckinProcess(storeLogCheckin);
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
        <View>
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
        </View>
      </GestureRecognizer>
    );
  }
  /** RENDER CONTENT LIST */
  renderContentList() {
    return this.state.showList ? (
      <View
        style={{
          flex: 1,
          height: 0.35 * height
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
        <View style={{ position: 'absolute', width: '100%', bottom: 0 }}>
          {this.props.merchant.selectedMerchant.journeyPlanSalePortfolios
            .length > 0 ? (
            <ButtonSingle
              disabled={false}
              title={'Check In'}
              borderRadius={4}
              onPress={() => this.checkin()}
            />
          ) : (
            <ButtonSingle
              disabled={true}
              title={'Sorry cannot check-in'}
              borderRadius={4}
              onPress={() => this.checkin()}
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
      <View style={[styles.contentContainer, GlobalStyle.shadow]}>
        {this.renderContentTitle()}
        {this.renderContentBody()}
      </View>
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
)(ModalBottomMerchantCheckin);