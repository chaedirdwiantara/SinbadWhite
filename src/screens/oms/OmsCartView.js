import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor.json';
import ButtonSingleSmall from '../../components/button/ButtonSingleSmall';

const { width, height } = Dimensions.get('window');

class OmsCartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonCheckoutDisabled: false,
      modalDeleteConfirmation: false,
      modalToCheckoutConfirmation: false,
      modalStockConfirmation: false,
      productWantToDelete: null,
      modalErrorGlobal: false,
      productCartArray: [],
      loading: false
    };
  }
  /**
   * =============================
   * FUNCTIONAL
   * =============================
   */
  /** === DID MOUNT === */
  componentDidMount() {
    this.props.omsGetCartItemProcess({
      storeId: this.props.merchant.selectedMerchant.storeId,
      catalogues: this.props.oms.dataCart
    });
  }
  wantToGoCheckout() {
    NavigationService.navigate('OmsCheckoutView');
  }
  /**
   * =============================
   * RENDER VIEW
   * ============================
   */
  /**
   * ==========================
   * MAIN CONTENT
   * ==========================
   */
  /** === RENDER ADDRESS === */
  renderAddress() {
    return (
      <View>
        <Text>this for address</Text>
      </View>
    );
  }
  /** === RENDER MAIN CONTENT === */
  renderMainContent() {
    return (
      <View>
        <Text>this for address</Text>
      </View>
    );
  }
  /** === RENDER DATA === */
  renderData() {
    return (
      <View style={styles.contentContainer}>
        {this.renderAddress()}
        {this.renderMainContent()}
      </View>
    );
  }
  /**
   * ====================
   * TOTAL BOTTOM
   * ====================
   */
  /** === RENDER TOTAL BOTTOM VALUE === */
  renderBottomValue() {
    return (
      <View style={{ flex: 1 }}>
        <Text>lala</Text>
      </View>
    );
  }
  /** === RENDER TOTAL BOTTOM CHECK LIST === */
  renderBottomCheckList() {
    return (
      <View style={{ flex: 1 }}>
        <Text>lala</Text>
      </View>
    );
  }
  /** === RENDER BUTTON CHECKOUT === */
  renderCheckoutButton() {
    return (
      <ButtonSingleSmall
        disabled={false}
        onPress={() => this.wantToGoCheckout()}
        title={'Checkout'}
        borderRadius={4}
      />
    );
  }
  /** === RENDER TOTAL BOTTOM === */
  renderTotalBottom() {
    return (
      <View style={styles.totalContainer}>
        {this.renderBottomCheckList()}
        {this.renderBottomValue()}
        {this.renderCheckoutButton()}
      </View>
    );
  }
  /**
   * ====================
   * MAIN
   * ====================
   */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderData()}
        {this.renderTotalBottom()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  contentContainer: {
    flex: 1
  },
  totalContainer: {
    height: 0.09 * height,
    paddingVertical: 10,
    paddingHorizontal: 11,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: masterColor.fontBlack10
  }
});

const mapStateToProps = ({ merchant, oms }) => {
  return { merchant, oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(OmsCartView);
