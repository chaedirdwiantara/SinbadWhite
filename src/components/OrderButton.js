import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput
} from '../library/reactPackage'
import { GlobalStyle, Fonts } from '../helpers'
import { Color } from '../config'

class OrderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: this.props.item,
      multipleQty: this.props.item.multipleQty,
      minQty: this.props.item.minQty,
      packagedQty: this.props.item.packagedQty,
      stock: this.props.item.warehouseCatalogues[0].stock,
      qtyToCart: this.props.item.qtyToCart
        ? this.props.item.qtyToCart
        : this.props.item.minQty,
      qty: this.props.item.addToCart
        ? this.props.item.qtyToCart
        : this.props.item.minQty,
      unlimitedStock: this.props.item.warehouseCatalogues[0].unlimitedStock,
      plusButtonDisable: false
    };
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
   * =======================
   * PLUS BUTTON CAL
   * =======================
   */
  onPressPlus() {
    let qty = this.state.qty + this.state.multipleQty;
    if (!this.state.unlimitedStock) {
      if (this.state.stock - qty < this.state.multipleQty) {
        this.sendValueToParent(qty);
        this.setState({
          qty,
          plusButtonDisable: true
        });
      } else {
        this.sendValueToParent(qty);
        this.setState({ qty });
      }
    } else {
      this.sendValueToParent(qty);
      this.setState({ qty });
    }
  }
  /**
   * =======================
   * MINUS BUTTON CAL
   * =======================
   */
  onPressMinus() {
    this.setState({ plusButtonDisable: false });
    const qty = this.state.qty - this.state.multipleQty;
    if (qty < this.state.minQty) {
      this.sendValueToParent(this.state.minQty);
      this.setState({ qty: this.state.minQty });
    } else {
      this.sendValueToParent(qty);
      this.setState({ qty });
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

  modifyQty() {
    const valueAfterMinimum = this.state.qty - this.state.minQty;
    return (
      Math.floor(valueAfterMinimum / this.state.multipleQty) *
        this.state.multipleQty +
      this.state.minQty
    );
  }

  modifyStockQty() {
    if (this.state.stock <= this.state.qty) {
      const valueAfterMinimum = this.state.stock - this.state.minQty;
      return (
        Math.floor(valueAfterMinimum / this.state.multipleQty) *
          this.state.multipleQty +
        this.state.minQty
      );
    }
  }

  checkQtyAfterEnter() {
    if (this.state.qty === '' || this.state.qty < this.state.minQty) {
      this.sendValueToParent(this.state.minQty);
      this.setState({ qty: this.state.minQty });
      return true;
    }
    if (!this.state.unlimitedStock) {
      if (this.modifyQty() < this.state.stock) {
        if (this.state.stock - this.modifyQty() <= this.state.multipleQty) {
          this.setState({ plusButtonDisable: true, qty: this.modifyQty() });
        } else {
          this.sendValueToParent(this.modifyQty());
          this.setState({ qty: this.modifyQty() });
        }
      } else {
        this.sendValueToParent(this.modifyStockQty());
        this.setState({ qty: this.modifyStockQty() });
        this.setState({ plusButtonDisable: true });
      }
    } else {
      this.sendValueToParent(this.modifyQty());
      this.setState({ qty: this.modifyQty() });
    }
  }

  /** FOR DISABLE PLUS BUTTON */
  checkDisablePlusButton() {
    if (!this.state.unlimitedStock) {
      if (this.state.stock <= this.state.minQty) {
        return true;
      } else if (this.state.stock <= this.state.qty) {
        return true;
      }
    }
  }

  /**
   * this for calculator end
   */

  render() {
    return (
      <View style={[styles.containerInputQty, GlobalStyle.shadowForBox]}>
        {this.state.qty <= this.state.minQty || this.props.disabledAllButton ? (
          <View style={styles.minusButtonDisabled}>
            <Text style={styles.minusTextDisabled}>-</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.minusButton}
            onPress={() => this.onPressMinus()}
          >
            <Text style={styles.minusText}>-</Text>
          </TouchableOpacity>
        )}

        <View style={{ width: '30%', backgroundColor: '#f0444c' }} />
        <View style={styles.inputList}>
          <TextInput
            selectionColor={Color.mainColor}
            returnKeyType="done"
            value={this.state.qty.toString()}
            keyboardType="numeric"
            maxLength={6}
            enablesReturnKeyAutomatically
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            onEndEditing={() => this.checkQtyAfterEnter()}
            onChangeText={qty => {
              const cleanNumber = qty.replace(/[^0-9]/g, '');
              this.setState({ qty: cleanNumber, plusButtonDisable: false });
            }}
            style={[styles.input, Fonts.type8]}
          />
        </View>
        {this.state.plusButtonDisable ||
        this.checkDisablePlusButton() ||
        this.props.disabledAllButton ? (
          <View style={styles.plusButtonDisabled}>
            <Text style={styles.plusTextDisabled}>+</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => this.onPressPlus()}
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
  /** FOR MINUS BUTTON */
  minusButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.backgroundColorWhite
  },
  minusButtonDisabled: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.backgroundColorWhite
  },
  minusText: {
    color: Color.mainColor,
    fontSize: 18,
    marginBottom: 3,
    marginRight: '10%'
  },
  minusTextDisabled: {
    color: Color.fontBlack40,
    fontSize: 18,
    marginBottom: 3,
    marginRight: '10%'
  },
  /** FOR PLUS BUTTON */
  plusButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.backgroundColorWhite
  },
  plusButtonDisabled: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.backgroundColorWhite
  },
  plusText: {
    color: Color.mainColor,
    fontSize: 18,
    marginBottom: 3,
    marginLeft: '10%'
  },
  plusTextDisabled: {
    color: Color.fontBlack40,
    fontSize: 18,
    marginBottom: 3,
    marginLeft: '10%'
  },
  /** FOR INPUT  */
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
    padding: 0,
    alignItems: 'center',
    height: '100%',
    width: '100%',
    textAlign: 'center'
  }
});

export default OrderButton;

/**
 * ========================================
 * catatan untuk order button
 * ========================================
 * packageQty hanya untuk long press
 * jika order > dari minQty, maka minQty di hilangkan, yang dihitung multipleQty nya
 * jika multipleQty < minQty maka multipleQty x 2
 */

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
 
