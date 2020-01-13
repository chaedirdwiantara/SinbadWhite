import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Fonts from '../helpers/GlobalFont';
import * as ActionCreators from '../state/actions';
import NavigationServices from '../navigation/NavigationService';
import masterColor from '../config/masterColor.json';

class CartGlobal extends Component {
  /**
   * ====================
   * FUNCTIONAL
   * ====================
   */
  goToOmsCartView() {
    NavigationServices.navigate('OmsCartView');
  }
  /**
   * ====================
   * RENDER VIEW
   * ====================
   */
  /** === IF THERE IS DATA IN CART === */
  renderCartNotEmpty() {
    return (
      <TouchableOpacity onPress={() => this.goToOmsCartView()}>
        <Badge
          value={this.props.oms.dataCart.length}
          containerStyle={styles.badgeContainer}
          badgeStyle={styles.badge}
          textStyle={Fonts.type19}
        />
        <Image
          style={styles.cartIcon}
          source={require('../assets/icons/oms/cart.png')}
        />
      </TouchableOpacity>
    );
  }
  /** === IF THERE IS NO DATA IN CART === */
  renderCartEmpty() {
    return (
      <TouchableOpacity onPress={() => this.goToOmsCartView()}>
        <Image
          style={styles.cartIcon}
          source={require('../assets/icons/oms/cart.png')}
        />
      </TouchableOpacity>
    );
  }
  render() {
    return this.props.oms.dataCart.length > 0
      ? this.renderCartNotEmpty()
      : this.renderCartEmpty();
  }
}

const styles = StyleSheet.create({
  badgeContainer: {
    width: 30,
    position: 'absolute',
    top: -10,
    right: -8,
    flex: 1,
    zIndex: 10
  },
  badge: {
    borderWidth: 0,
    backgroundColor: masterColor.fontYellow50
  },
  cartIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0,
    width: 24
  }
});

const mapStateToProps = ({ oms }) => {
  return { oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(CartGlobal);
