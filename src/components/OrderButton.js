import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text
} from '../library/reactPackage';
import { Fonts, NumberFormat, GlobalStyle } from '../helpers';
import masterColor from '../config/masterColor.json';

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
      plusButtonDisable: false,
      maxQty: this.props.item.maxQty,
      isMax: this.props.item.isMaximum,
      totalClickPlus: 0,
      unit: this.props.item.minQtyType,
      largeUnit: this.props.item.catalogueLargeUnit?.unit ?? 'Box',
      enableLargeUom: this.props.item.enableLargeUom,
      largeUomQty: 0
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
    if (this.state.qtyToCart !== this.props.item.qtyToCart) {
      if (this.props.item.qtyToCart !== undefined) {
        this.setState({
          qty: this.props.item.qtyToCart,
          qtyToCart: this.props.item.qtyToCart
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
    let qtyMinusQtyOrder = 0;
    let totalClickPlus = 0;
    /** === check if stock unlimited or not === */
    if (!this.state.unlimitedStock) {
      if (this.state.isMax) {
        qtyMinusQtyOrder = this.state.maxQty - qty;
        totalClickPlus = Math.floor(qtyMinusQtyOrder / this.state.multipleQty);
        this.setState({
          totalClickPlus: totalClickPlus >= 0 ? totalClickPlus : 0
        });
      } else {
        qtyMinusQtyOrder = this.state.stock - qty;
        totalClickPlus = Math.floor(qtyMinusQtyOrder / this.state.multipleQty);
        this.setState({
          totalClickPlus: totalClickPlus >= 0 ? totalClickPlus : 0
        });
      }
    } else {
      if (this.state.isMax) {
        qtyMinusQtyOrder = this.state.maxQty - qty;
        totalClickPlus = Math.floor(qtyMinusQtyOrder / this.state.multipleQty);
        this.setState({
          totalClickPlus: totalClickPlus >= 0 ? totalClickPlus : 0
        });
      } else {
        this.setState({ totalClickPlus: 1000000000000 });
      }
    }
  }

  /**
   * =======================
   * PLUS BUTTON CAL
   * =======================
   */
  onPressPlus(isLarge) {
    /** === COUNTER PLUS BUTTON === */
    let totalClickPlus = this.state.totalClickPlus;
    this.setState({ totalClickPlus: totalClickPlus - 1 });
    let qty = this.state.qty + this.state.multipleQty;
    /** === SET QTY === */
    if (isLarge) {
      this.setState({
        largeUomQty: this.state.largeUomQty + 1
      });
    } else {
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
  }

  onPressPlusLarge() {
    /** === SET LARGE UOM QTY === */
    const qty = this.state.largeUomQty + 1;
    this.setState({
      largeUomQty: qty
    });
    this.sendValueToParentLarge(qty);
  }
  /**
   * =======================
   * MINUS BUTTON CAL
   * =======================
   */
  onPressMinus() {
    /** === COUNTER PLUS BUTTON === */
    let totalClickPlus = this.state.totalClickPlus;
    this.setState({ totalClickPlus: totalClickPlus + 1 });
    this.setState({ plusButtonDisable: false });
    /** === SET QTY === */
    const qty = this.state.qty - this.state.multipleQty;
    if (qty < this.state.minQty) {
      this.sendValueToParent(this.state.minQty);
      this.setState({ qty: this.state.minQty });
    } else {
      if (this.state.isMax) {
        if (this.state.qty > this.state.maxQty) {
          this.checkTotalClickPlusButton(this.state.minQty);
          this.sendValueToParent(this.state.minQty);
          this.setState({ qty: this.state.minQty });
        } else {
          this.sendValueToParent(qty);
          this.setState({ qty });
        }
      } else {
        this.sendValueToParent(qty);
        this.setState({ qty });
      }
    }
  }

  onPressMinusLarge() {
    /** === SET LARGE UOM QTY === */
    const qty = this.state.largeUomQty - 1;
    this.setState({
      largeUomQty: qty
    });
    this.sendValueToParentLarge(qty);
  }
  /**
   * =======================================
   * function minus button end
   */

  /**
   * this for calculator start
   */
  sendValueToParent(qty) {
    if (this.state.enableLargeUom) {
      this.props.parentFunctionFromOrderButton({
        catalogueId: this.state.selectedProduct.id,
        qty: this.state.largeUomQty * this.state.packagedQty + qty,
        detail: {
          smallUom: this.state.unit,
          smallUomQty: qty,
          largeUom: this.state.largeUnit,
          largeUomQty: this.state.largeUomQty,
          packagedQty: this.state.packagedQty
        }
      });
    } else {
      this.props.parentFunctionFromOrderButton({
        catalogueId: this.state.selectedProduct.id,
        qty
      });
    }
  }

  sendValueToParentLarge(qty) {
    this.props.parentFunctionFromOrderButton({
      catalogueId: this.state.selectedProduct.id,
      qty: qty * this.state.packagedQty + this.state.qty,
      detail: {
        smallUom: this.state.unit,
        smallUomQty: this.state.qty,
        largeUom: this.state.largeUnit,
        largeUomQty: qty,
        packagedQty: this.state.packagedQty
      }
    });
  }

  modifyQty() {
    const valueAfterMinimum = this.state.qty - this.state.minQty;
    if (this.state.maxQty) {
      if (valueAfterMinimum < this.state.maxQty) {
        return (
          Math.floor(valueAfterMinimum / this.state.multipleQty) *
            this.state.multipleQty +
          this.state.minQty
        );
      } else {
        const maxQtyAfterMinimum = this.state.maxQty - this.state.minQty;
        return (
          Math.floor(maxQtyAfterMinimum / this.state.multipleQty) *
            this.state.multipleQty +
          this.state.minQty
        );
      }
    }
    return (
      Math.floor(valueAfterMinimum / this.state.multipleQty) *
        this.state.multipleQty +
      this.state.minQty
    );
  }

  modifyStockQty() {
    if (this.state.stock <= this.state.qty) {
      const valueAfterMinimum = this.state.stock - this.state.minQty;
      if (this.state.maxQty) {
        if (valueAfterMinimum < this.state.maxQty) {
          return (
            Math.floor(valueAfterMinimum / this.state.multipleQty) *
              this.state.multipleQty +
            this.state.minQty
          );
        } else {
          const maxQtyAfterMinimum = this.state.maxQty - this.state.minQty;
          return (
            Math.floor(maxQtyAfterMinimum / this.state.multipleQty) *
              this.state.multipleQty +
            this.state.minQty
          );
        }
      }
      return (
        Math.floor(valueAfterMinimum / this.state.multipleQty) *
          this.state.multipleQty +
        this.state.minQty
      );
    }
  }

  checkQtyAfterEnter() {
    this.checkTotalClickPlusButton(this.state.qty);
    /** if value that entered below min qty, qty = min qty */
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
    if (this.state.totalClickPlus === 0) {
      return true;
    }
    return false;
  }
  /** === CHECK TERSISA TEXT === */
  checkTersisa() {
    if (!this.state.unlimitedStock && this.state.stock > this.state.minQty) {
      return `Tersisa ${NumberFormat(this.state.stock)} ${this.state.unit}`;
    }
    return '';
  }
  /** === MAX QUANTITY ORDER === */
  checkMaxQtyOrder() {
    if (this.state.isMax) {
      return `Maksimum pembelian ${this.state.maxQty} ${this.state.unit}`;
    }
    return '';
  }

  /**
   * this for calculator end
   */
  /** === VIEW === */
  /** => render max qty */
  renderMaxQtyOrder() {
    return (
      <View style={{ paddingTop: 8 }}>
        {this.state.totalClickPlus === 0 ? (
          <Text style={Fonts.type67}>{this.checkMaxQtyOrder()}</Text>
        ) : (
          <Text style={Fonts.type67}>{''}</Text>
        )}
      </View>
    );
  }
  /** => render minus button */
  renderMinusButton() {
    return this.state.qty <= this.state.minQty || this.props.showKeyboard ? (
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

  /** => render minus button large */
  renderMinusButtonLarge() {
    return this.state.largeUomQty <= 0 || this.props.showKeyboard ? (
      <View style={styles.minusButtonDisabled}>
        <Text style={styles.minusText}>-</Text>
      </View>
    ) : (
      <TouchableOpacity
        style={styles.minusButton}
        onPress={() => this.onPressMinusLarge()}
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

  /** => render plus button large */
  renderPlusButtonLarge() {
    return this.checkDisablePlusButton() || this.props.showKeyboard ? (
      <View style={styles.plusButtonDisabled}>
        <Text style={styles.plusText}>+</Text>
      </View>
    ) : (
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => this.onPressPlusLarge()}
      >
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    );
  }

  /** => render input calculator */
  renderInput(parentQty) {
    return (
      <View style={styles.inputList}>
        <TextInput
          selectionColor={masterColor.mainColor}
          returnKeyType="done"
          value={parentQty.toString()}
          keyboardType="numeric"
          maxLength={6}
          enablesReturnKeyAutomatically
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onEndEditing={() => this.checkQtyAfterEnter()}
          onChangeText={qty => {
            const cleanNumber = qty.replace(/[^0-9]/g, '');
            this.checkTotalClickPlusButton(cleanNumber);
            this.setState({ qty: cleanNumber });
          }}
          style={[Fonts.type24, styles.input]}
        />
      </View>
    );
  }
  /** => render calculator */
  renderCalculator(qty, isLarge) {
    return (
      <View style={styles.containerInputQty}>
        {isLarge ? this.renderMinusButtonLarge() : this.renderMinusButton()}
        {this.renderInput(qty)}
        {isLarge ? this.renderPlusButtonLarge() : this.renderPlusButton()}
      </View>
    );
  }
  /** => render stock */
  renderRemainingStock() {
    return (
      <View
        style={{
          paddingRight: 8,
          justifyContent: 'center'
        }}
      >
        <Text style={Fonts.type22}>{this.checkTersisa()}</Text>
      </View>
    );
  }

  /** => render single uom */
  renderSingleUOM() {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1
        }}
      >
        <View style={{ alignContent: 'flex-start' }}>
          <Text style={Fonts.type96}>Dalam Pcs</Text>
        </View>
        <View style={styles.subMainContainer}>
          {this.renderRemainingStock()}
          {this.renderCalculator(this.state.qty, false)}
        </View>
      </View>
    );
  }

  /** => render double uom */
  renderDoubleUOM() {
    return (
      <>
        <View style={{ alignSelf: 'flex-start' }}>
          {this.renderRemainingStock()}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1
          }}
        >
          <View style={{ alignContent: 'flex-start' }}>
            <Text style={Fonts.fontH12Medium}>Dalam Pcs</Text>
          </View>
          <View style={styles.subMainContainerDouble}>
            {this.renderCalculator(this.state.qty, false)}
          </View>
        </View>
        <View style={[GlobalStyle.lines, { marginVertical: 8 }]} />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginTop: 10,
            justifyContent: 'space-between'
          }}
        >
          <View style={{ alignContent: 'flex-start' }}>
            <Text style={Fonts.type38}>Order dengan satuan besar</Text>
            <Text style={Fonts.fontH12Medium}>Dalam Box</Text>
          </View>
          <View style={styles.subMainContainerDouble}>
            {this.renderCalculator(this.state.largeUomQty, true)}
            <Text style={[Fonts.type38, { marginTop: 5 }]}>{`Sejumlah ${this
              .state.largeUomQty * this.state.packagedQty} pcs`}</Text>
          </View>
        </View>
      </>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.state.enableLargeUom
          ? this.renderDoubleUOM()
          : this.renderSingleUOM()}
        {this.renderMaxQtyOrder()}
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
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  subMainContainerDouble: {
    flex: 1,
    alignItems: 'flex-end'
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
    marginHorizontal: 5,
    height: '100%',
    backgroundColor: masterColor.backgroundWhite,
    width: '30%',
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
 * updatedBy: tatas
 * updatedDate: 24062020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
