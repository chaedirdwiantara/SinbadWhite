import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from '../../../library/reactPackage';
import { Fonts } from '../../../helpers';
import masterColor from '../../../config/masterColor.json';
import { Color } from '../../../config';

class OrderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: this.props.item,
      qty: this.props.item.qty,
      plusButtonDisable: false,
      maxQty: this.props.item.maxQty,
      totalClickPlus: 0
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT */
  componentDidMount() {
    this.checkTotalClickPlusButton(this.state.qty);
  }
  componentDidUpdate(prevProps) {
    /**
     * this code for error status
     * update qty to qtySuges from BE
     */
    if (this.state.qty !== this.props.item.qty) {
      if (this.props.item.qty !== undefined) {
        this.setState({
          qty: this.props.item.qty
        });
      }
    }
    /** => this for check keyboard */
    if (prevProps.showKeyboard !== this.props.showKeyboard) {
      if (!this.props.showKeyboard) {
        /** => after keyboard close, call calculate function */
        this.checkQtyAfterEnter();
      }
    }
  }

  /** === CHECK HOW MANY BUTTON PLUS CAN PUSH === */
  checkTotalClickPlusButton(qty) {
    if (qty > this.props.item.maxQty) {
      this.setState({ qty: this.props.maxQty });
    } else {
      this.setState({ qty });
    }
  }

  /**
   * =======================
   * PLUS BUTTON CAL
   * =======================
   */
  onPressPlus() {
    /** === COUNTER PLUS BUTTON === */
    let totalClickPlus = this.state.totalClickPlus;
    this.setState({ totalClickPlus: totalClickPlus + 1 });
    let qty = this.state.qty + 1;
    /** === SET QTY === */
    this.sendValueToParent({
      type: 'ChangeQty',
      data: { qty, catalogueId: this.props.item.catalogueId }
    });
    this.setState({ qty });
  }
  /**
   * =======================
   * MINUS BUTTON CAL
   * =======================
   */
  onPressMinus() {
    /** === COUNTER MINUS BUTTON === */
    let totalClickPlus = this.state.totalClickPlus;
    this.setState({ totalClickPlus: totalClickPlus - 1 });
    this.setState({ plusButtonDisable: false });
    /** === SET QTY === */
    const qty = this.state.qty - 1;
    this.sendValueToParent({
      type: 'ChangeQty',
      data: { qty, catalogueId: this.props.item.catalogueId }
    });
    this.setState({ qty });
  }
  /**
   * =======================================
   * function minus button end
   */

  /**
   * this for calculator start
   */
  sendValueToParent(data) {
    this.props.parentFunctionFromOrderButton(data);
  }

  modifyQty() {
    if (this.state.qty > this.props.item.maxQty) {
      return this.props.item.maxQty;
    } else {
      return this.state.qty;
    }
  }

  checkQtyAfterEnter() {
    this.checkTotalClickPlusButton(this.state.qty);
    /** if value that entered below min qty, qty = min qty */
    if (this.state.qty === '' || this.state.qty < this.props.item.maxQty) {
      this.sendValueToParent({
        type: 'ChangeQty',
        data: { qty: this.state.qty }
      });
      this.setState({ qty: this.state.qty });
      return true;
    }
    this.sendValueToParent({
      type: 'ChangeQty',
      data: { qty: this.modifyQty(), catalogueId: this.props.item.catalogueId }
    });
    this.setState({ qty: this.modifyQty() });
  }

  /** FOR DISABLE PLUS BUTTON */
  checkDisablePlusButton() {
    if (this.state.qty === this.props.item.maxQty) {
      return true;
    }
    return false;
  }

  /** => render minus button */
  renderMinusButton() {
    return this.state.qty <= 0 || this.props.showKeyboard ? (
      <View style={styles.minusButtonDisabled}>
        <Text style={styles.minusText}>-</Text>
      </View>
    ) : (
      <TouchableOpacity
        style={styles.minusButton}
        onPress={() => this.onPressMinus()}
      >
        <Text style={styles.minusText}>-</Text>
      </TouchableOpacity>
    );
  }
  /** => render plus button */
  renderPlusButton() {
    return this.checkDisablePlusButton() || this.props.showKeyboard ? (
      <View style={styles.plusButtonDisabled}>
        <Text style={styles.plusText}>+</Text>
      </View>
    ) : (
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => this.onPressPlus()}
      >
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    );
  }
  /** => render input calculator */
  renderInput() {
    return (
      <View style={styles.inputList}>
        <TouchableOpacity
          onPress={() =>
            this.sendValueToParent({
              type: 'ManualInput',
              data: this.props.item
            })
          }
          style={{ flexDirection: 'row' }}
        >
          <Text
            style={[
              Fonts.type24,
              styles.input,
              {
                color:
                  this.state.qty === 0 ? Color.fontBlack60 : Color.fontBlack80
              }
            ]}
          >
            {this.state.qty}
          </Text>
          <Text style={[Fonts.type24, styles.input]}>
            /{this.props.item.maxQty}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  /** => render calculator */
  renderCalculator() {
    return (
      <View style={styles.containerInputQty}>
        {this.renderMinusButton()}
        {this.renderInput()}
        {this.renderPlusButton()}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.subMainContainer}>{this.renderCalculator()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'flex-end',
    flex: 1
  },
  subMainContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  containerInputQty: {
    height: 27,
    width: 128,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  /** FOR MINUS BUTTON */
  minusButton: {
    width: 28,
    height: 28,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: masterColor.mainColor
  },
  minusButtonDisabled: {
    width: 28,
    height: 28,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: masterColor.fontBlack40
  },
  minusText: {
    color: masterColor.fontWhite,
    fontSize: 18
  },
  /** FOR PLUS BUTTON */
  plusButton: {
    width: 28,
    height: 28,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: masterColor.mainColor
  },
  plusButtonDisabled: {
    width: 28,
    height: 28,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: masterColor.fontBlack40
  },
  plusText: {
    color: masterColor.fontWhite,
    fontSize: 18
  },
  /** FOR INPUT  */
  inputList: {
    borderBottomWidth: 1,
    borderBottomColor: masterColor.fontBlack40,
    marginHorizontal: 12,
    height: '100%',
    backgroundColor: masterColor.backgroundWhite,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    padding: 0,
    alignItems: 'center',
    // height: '100%',
    // width: '100%',
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
 * updatedBy: tatas
 * updatedDate: 24062020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
