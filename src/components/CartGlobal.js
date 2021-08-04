import {
  React,
  Component,
  StyleSheet,
  Image,
  TouchableOpacity
} from '../library/reactPackage'
import {
  Badge,
  bindActionCreators,
  connect
} from '../library/thirdPartyPackage'
import { Fonts } from '../helpers'
import { Color } from '../config'
import * as ActionCreators from '../state/actions';
import NavigationServices from '../navigation/NavigationService';

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
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={
          this.props.accessibilityLabel ? this.props.accessibilityLabel : null
        }
        onPress={() => this.goToOmsCartView()}
      >
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
    backgroundColor: Color.fontYellow50
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

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 08072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/

