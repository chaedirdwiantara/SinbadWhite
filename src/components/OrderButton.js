import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
// import { RFPercentage } from 'react-native-responsive-fontsize';
import { Fonts } from '../utils/Fonts';

class OrderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: this.props.item,
      multipleQty: this.props.item.multipleQty,
      minQty: this.props.item.minQty,
      packagedQty: this.props.item.packagedQty,
      stock: this.props.item.stock,
      qtyToCart: this.props.item.qtyToCart
        ? this.props.item.qtyToCart
        : this.props.item.minQty,
      qty: this.props.item.addToCart
        ? this.props.item.qtyToCart
        : this.props.item.minQty,
      unlimitedStock: this.props.item.unlimitedStock,
      plusButtonDisable: false
    };
    this.timerUp = null;
    this.timerDown = null;
  }

  componentDidUpdate() {
    /**
     * this code for error status
     * update qty to qtySuges from BE
     */
    if (this.state.qtyToCart !== this.props.item.qtyToCart) {
      if (this.props.item.qtyToCart !== undefined) {
        this.setState({
          qty: this.props.item.qtyToCart,
          qtyToCart: this.props.item.qtyToCart
        });
      }
    }
  }

  /**
   * =======================================
   * function plus button begin
   */
  onPressPlusIn(pressType) {
    if (pressType === 'defaultPress') {
      let qty = this.state.qty + this.state.multipleQty;
      if (!this.state.unlimitedStock) {
        if (qty > this.state.stock) {
          const modMaxQtyFromPackage =
            (this.state.stock - this.state.minQty) % this.state.packagedQty;
          qty =
            this.state.stock - (modMaxQtyFromPackage % this.state.multipleQty);
          this.setState({ plusButtonDisable: true });
        }
      }
      this.sendValueToParent(qty);
      this.setState({ qty });
    }
    this.timerUp = setTimeout(() => {
      if (pressType === 'defaultPress') {
        if (this.state.qty <= this.state.packagedQty) {
          const qty = this.state.packagedQty;
          this.sendValueToParent(qty);
          this.setState({ qty });
        } else {
          const qty =
            (Math.floor(this.state.qty / this.state.packagedQty) + 1) *
            this.state.packagedQty;
          this.sendValueToParent(qty);
          this.setState({ qty });
        }
      }
      let qty = this.state.qty + this.state.packagedQty;
      if (!this.state.unlimitedStock) {
        if (qty > this.state.stock) {
          const modMaxQtyFromPackage =
            (this.state.stock - this.state.minQty) % this.state.packagedQty;
          qty =
            this.state.stock - (modMaxQtyFromPackage % this.state.multipleQty);
          this.setState({ plusButtonDisable: true });
          this.onPressPlusOut();
        } else {
          this.onPressPlusIn('longPress');
        }
      }
      this.sendValueToParent(qty);
      this.setState({ qty });
    }, 200);
  }

  onPressPlusOut() {
    for (let x = 0; x < 5; x++) {
      clearTimeout(this.timerUp + x);
    }
  }

  /**
   * =======================================
   * function plus button end
   */

  /**
   * =======================================
   * function minus button begin
   */
  onPressMinusIn(pressType) {
    this.setState({ plusButtonDisable: false });
    if (pressType === 'defaultPress') {
      const qty = this.state.qty - this.state.multipleQty;
      this.sendValueToParent(qty);
      this.setState({ qty });
    }
    this.timerDown = setTimeout(() => {
      if (pressType === 'defaultPress') {
        const qty = this.state.qty + this.state.multipleQty;
        this.sendValueToParent(qty);
        this.setState({ qty });
      }
      let qty = this.state.qty - this.state.packagedQty;
      if (qty > this.state.minQty) {
        this.onPressMinusIn('longPress');
      } else {
        qty = this.state.minQty;
        this.onPressMinusOut();
      }
      this.sendValueToParent(qty);
      this.setState({ qty });
    }, 200);
  }

  onPressMinusOut() {
    for (let x = 0; x < 5; x++) {
      clearTimeout(this.timerDown + x);
    }
  }

  /**
   * =======================================
   * function minus button end
   */

  /**
   * this for calculator start
   */
  sendValueToParent(qty) {
    this.props.parentFunctionFromOrderButton({
      catalogueId: this.state.selectedProduct.id,
      qty
    });
  }

  minQtyMultipleQtyMoreThanStock() {
    return (
      Math.floor(
        (this.state.stock - this.state.minQty) / this.state.multipleQty
      ) *
        this.state.multipleQty +
      this.state.minQty
    );
  }

  minQtyMultipleQtyLessThanStock() {
    return (
      Math.floor(
        (this.state.qty - this.state.minQty) / this.state.multipleQty
      ) *
        this.state.multipleQty +
      this.state.minQty
    );
  }

  minQtyMultipleQtyPackageQtyMoreThanStock() {
    const modPackage =
      Math.floor(this.state.stock / this.state.packagedQty) *
      this.state.packagedQty;
    const modMultiple =
      Math.floor((this.state.stock - modPackage) / this.state.multipleQty) *
      this.state.multipleQty;
    const modMinimum = Math.floor(
      (this.state.stock - (modPackage + modMultiple)) / this.state.minQty
    );
    return modPackage + modMultiple + modMinimum;
  }

  minQtyMultipleQtyPackageQtyLessThanStock() {
    const modPackage =
      Math.floor(this.state.qty / this.state.packagedQty) *
      this.state.packagedQty;
    const modMultiple =
      Math.floor((this.state.qty - modPackage) / this.state.multipleQty) *
      this.state.multipleQty;
    const modMinimum = Math.floor(
      (this.state.qty - (modPackage + modMultiple)) / this.state.minQty
    );
    return modPackage + modMultiple + modMinimum;
  }

  checkQtyAfterEnter() {
    if (this.state.qty === '' || this.state.qty < this.state.minQty) {
      this.sendValueToParent(this.state.minQty);
      this.setState({ qty: this.state.minQty });
    }
    if (!this.state.unlimitedStock) {
      if (this.state.qty > this.state.stock) {
        if (this.state.qty < this.state.packagedQty) {
          this.sendValueToParent(this.minQtyMultipleQtyMoreThanStock());
          this.setState({
            qty: this.minQtyMultipleQtyMoreThanStock(),
            plusButtonDisable: true
          });
        } else {
          this.sendValueToParent(
            this.minQtyMultipleQtyPackageQtyMoreThanStock()
          );
          this.setState({
            qty: this.minQtyMultipleQtyPackageQtyMoreThanStock(),
            plusButtonDisable: true
          });
        }
      } else if (this.state.qty < this.state.packagedQty) {
        this.sendValueToParent(this.minQtyMultipleQtyLessThanStock());
        this.setState({ qty: this.minQtyMultipleQtyLessThanStock() });
      } else {
        this.sendValueToParent(this.minQtyMultipleQtyPackageQtyLessThanStock());
        this.setState({
          qty: this.minQtyMultipleQtyPackageQtyLessThanStock()
        });
      }
    } else if (this.state.qty < this.state.packagedQty) {
      this.sendValueToParent(this.minQtyMultipleQtyLessThanStock());
      this.setState({ qty: this.minQtyMultipleQtyLessThanStock() });
    } else {
      this.sendValueToParent(this.minQtyMultipleQtyPackageQtyLessThanStock());
      this.setState({ qty: this.minQtyMultipleQtyPackageQtyLessThanStock() });
    }
  }

  /**
   * this for calculator end
   */

  render() {
    return (
      <View style={styles.containerInputQty}>
        {this.state.qty <= this.state.minQty ? (
          <View style={styles.minusButtonDisabled}>
            <Text style={styles.minusText}>-</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.minusButton}
            onPressIn={() => this.onPressMinusIn('defaultPress')}
            onPressOut={() => this.onPressMinusOut()}
          >
            <Text style={styles.minusText}>-</Text>
          </TouchableOpacity>
        )}

        <View style={{ width: '30%', backgroundColor: '#f0444c' }} />
        <View style={styles.inputList}>
          <TextInput
            selectionColor={'#f0444c'}
            returnKeyType="done"
            value={this.state.qty.toString()}
            keyboardType="number-pad"
            maxLength={6}
            enablesReturnKeyAutomatically
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            onEndEditing={() => this.checkQtyAfterEnter()}
            onChangeText={qty =>
              this.setState({ qty, plusButtonDisable: false })
            }
            style={styles.input}
          />
        </View>
        {this.state.plusButtonDisable ? (
          <View style={styles.plusButtonDisabled}>
            <Text style={styles.plusText}>+</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.plusButton}
            onPressIn={() => this.onPressPlusIn('defaultPress')}
            onPressOut={() => this.onPressPlusOut()}
          >
            <Text style={styles.plusText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerInputQty: {
    flex: 1,
    height: 27,
    width: 128,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  minusButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0444c',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15
  },
  minusButtonDisabled: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bdbdbd',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15
  },
  plusButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0444c',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  plusButtonDisabled: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bdbdbd',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  minusText: {
    // fontFamily: Fonts.MontserratExtraBold,
    color: '#fff',
    // fontSize: RFPercentage(2.5),
    marginBottom: 3,
    marginRight: '10%'
  },
  plusText: {
    // fontFamily: Fonts.MontserratExtraBold,
    color: '#fff',
    // fontSize: RFPercentage(2.5),
    marginBottom: 2,
    marginLeft: '10%'
  },
  inputList: {
    zIndex: 1000,
    height: '100%',
    backgroundColor: '#fff',
    width: '30%',
    borderRadius: 7,
    marginLeft: '29%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    // fontSize: RFPercentage(1.5),
    color: '#f0444c',
    padding: 0,
    alignItems: 'center',
    height: '100%',
    width: '100%',
    textAlign: 'center'
    // fontFamily: Fonts.MontserratBlack
  }
});

const mapStateToProps = ({ navigation }) => {
  return { navigation };
};

export default connect(mapStateToProps, {})(OrderButton);

/**
 * ========================================
 * catatan untuk order button
 * ========================================
 * packageQty hanya untuk long press
 * jika order > dari minQty, maka minQty di hilangkan, yang dihitung multipleQty nya
 * jika multipleQty < minQty maka multipleQty x 2
 */
