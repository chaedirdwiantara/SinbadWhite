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

class MultipleOrderButton extends Component {
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
      plusButtonLargeDisable: false,
      maxQty: this.props.item.maxQty,
      isMax: this.props.item.isMaximum,
      totalClickPlus: 0,
      unit: this.props.item.catalogueUnit?.unit ?? 'Pcs',
      largeUnit: this.props.item.catalogueLargeUnit?.unit ?? 'Box',
      smallUnit: this.props.item.catalogueUnit?.unit ?? 'Pcs',
      enableLargeUom: this.props.item.enableLargeUom,
      largeUomQty: this.props.uomDetail?.largeUomQty ?? 0,
      smallUomQty: this.props.uomDetail?.smallUomQty ?? 0,
      uomDetail: this.props.uomDetail ?? null,
      showMaxQtyWarning: false
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT */
  componentDidMount() {
    this.checkUomDetail();
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

    if (this.state.uomDetail !== this.props.uomDetail) {
      if (this.props.uomDetail !== null) {
        this.updateUomDetail();
      }
    }
  }

  updateUomDetail() {
    const qty =
      this.props.uomDetail.largeUomQty * this.props.uomDetail.packagedQty +
      this.props.uomDetail.smallUomQty;

    this.setState({
      uomDetail: this.props.uomDetail,
      largeUomQty: this.props.uomDetail.largeUomQty,
      largeUnit: this.props.uomDetail.largeUom,
      smallUomQty: this.props.uomDetail.smallUomQty,
      smallUnit: this.props.uomDetail.smallUom,
      qty,
      isMax:
        this.state.maxQty !== null && qty > this.state.maxQty ? true : false
    });

    if (this.props.item.isMaximum && qty >= this.props.item.maxQty) {
      this.setState({
        plusButtonDisable: true,
        plusButtonLargeDisable: true,
        showMaxQtyWarning: true
      });
    } else {
      this.setState({
        plusButtonDisable: false,
        plusButtonLargeDisable: false,
        showMaxQtyWarning: false
      });
    }
  }

  checkUomDetail() {
    if (this.state.uomDetail !== null) {
      this.setState({
        largeUomQty: this.state.uomDetail.largeUomQty,
        largeUnit: this.state.uomDetail.largeUom,
        smallUomQty: this.state.uomDetail.smallUomQty,
        smallUnit: this.state.uomDetail.smallUom,
        qty:
          this.state.uomDetail.largeUomQty * this.state.uomDetail.packagedQty +
          this.state.uomDetail.smallUomQty
      });
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
    let qty = this.state.smallUomQty + this.state.multipleQty;
    const totalQty =
      this.props.uomDetail.largeUomQty * this.props.uomDetail.packagedQty + qty;
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
            smallUomQty: qty,
            plusButtonDisable: true
          });
        } else {
          if (totalQty >= this.state.stock) {
            this.sendValueToParent(qty);
            this.setState({
              smallUomQty: qty,
              plusButtonDisable: true,
              plusButtonLargeDisable: true
            });
          } else {
            this.sendValueToParent(qty);
            this.setState({ smallUomQty: qty });
          }
        }
      } else {
        this.sendValueToParent(qty);
        this.setState({ smallUomQty: qty });
      }
    }
  }

  onPressPlusLarge() {
    /** === SET LARGE UOM QTY === */
    const totalQtyLarge =
      (this.props.uomDetail.largeUomQty + 1) * this.props.uomDetail.packagedQty;

    const totalQty =
      (this.props.uomDetail.largeUomQty + 1) *
        this.props.uomDetail.packagedQty +
      this.props.uomDetail.smallUomQty;

    /** Check available stock */
    /** Total Qty less than stock */
    if (totalQtyLarge <= this.state.stock) {
      /** Modify Qty if sum of Large Qty * Packaged Qty is more than stock */
      if (totalQty >= this.state.stock) {
        const modifyLargeUomQty = this.state.largeUomQty + 1;
        const modifySmallUomQty =
          this.state.stock -
          modifyLargeUomQty * this.props.uomDetail.packagedQty;
        this.sendQtyToParent(modifySmallUomQty, modifyLargeUomQty);
        this.setState({
          largeUomQty: modifyLargeUomQty,
          smallUomQty: modifySmallUomQty,
          plusButtonLargeDisable: true,
          plusButtonDisable: true
        });
      } else {
        /** Set Large Qty if Total Qty less than Stock */
        this.setState({
          largeUomQty: this.state.largeUomQty + 1
        });
        this.sendValueToParentLarge(this.state.largeUomQty + 1);
      }
    } else {
      if (this.state.unlimitedStock) {
        this.setState({
          largeUomQty: this.state.largeUomQty + 1
        });
        this.sendValueToParentLarge(this.state.largeUomQty + 1);
      } else {
        this.setState({
          largeUomQty: this.state.largeUomQty + 1,
          plusButtonLargeDisable: true
        });
        this.sendValueToParentLarge(this.state.largeUomQty + 1);
      }
    }
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
    const qty = this.props.uomDetail.smallUomQty - this.state.multipleQty;

    if (this.state.largeUomQty === 0) {
      if (qty < this.state.minQty) {
        this.sendValueToParent(this.state.minQty);
        this.setState({ smallUomQty: this.state.minQty });
      } else {
        if (this.state.isMax) {
          if (this.state.smallUomQty > this.state.maxQty) {
            this.checkTotalClickPlusButton(this.state.minQty);
            this.sendValueToParent(this.state.minQty);
            this.setState({ smallUomQty: this.state.minQty });
          } else {
            this.sendValueToParent(qty);
            this.setState({ smallUomQty: qty });
          }
        } else {
          this.sendValueToParent(qty);
          this.setState({ smallUomQty: qty });
        }
      }
    } else {
      if (qty <= 0) {
        this.sendValueToParent(0);
        this.setState({ smallUomQty: 0 });
      } else {
        this.sendValueToParent(qty);
        this.setState({ smallUomQty: qty });
      }
    }
  }

  onPressMinusLarge() {
    /** === SET LARGE UOM QTY === */
    const qty = this.state.largeUomQty - 1;
    this.setState({
      totalClickPlus: this.state.isMax
        ? this.state.maxQty - qty * this.state.packagedQty
        : this.state.totalClickPlus + qty * this.state.packagedQty
    });

    if (qty <= 0 && this.state.smallUomQty === 0) {
      this.sendQtyToParent(this.state.minQty, 0);

      this.setState({
        largeUomQty: 0,
        smallUomQty: this.state.minQty
      });
    } else if (qty * this.state.packagedQty <= this.state.minQty) {
      const largeQty = qty;
      const smallQty = this.state.minQty - qty * this.state.packagedQty;
      this.sendQtyToParent(smallQty, largeQty);
      this.setState({ smallUomQty: smallQty, largeUomQty: largeQty });
    } else {
      this.setState({
        largeUomQty: qty,
        plusButtonLargeDisable: false,
        plusButtonDisable: false,
        isMax: false
      });
      this.sendValueToParentLarge(qty);
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
    if (this.state.enableLargeUom) {
      this.props.parentFunctionFromOrderButton({
        catalogueId: this.props.item.id,
        qty:
          parseInt(this.state.largeUomQty, 10) *
            this.props.uomDetail.packagedQty +
          parseInt(qty, 10),
        detail: {
          smallUom: this.state.smallUnit,
          smallUomQty: parseInt(qty, 10),
          largeUom: this.state.largeUnit,
          largeUomQty: parseInt(this.state.largeUomQty, 10),
          packagedQty: this.props.uomDetail.packagedQty
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
      catalogueId: this.props.item.id,
      qty:
        parseInt(qty, 10) * this.props.uomDetail.packagedQty +
        parseInt(this.state.smallUomQty, 10),
      detail: {
        smallUom: this.state.smallUnit,
        smallUomQty: parseInt(this.state.smallUomQty, 10),
        largeUom: this.state.largeUnit,
        largeUomQty: parseInt(qty, 10),
        packagedQty: this.props.uomDetail.packagedQty
      }
    });
  }

  sendQtyToParent(smallQty, largeQty) {
    this.props.parentFunctionFromOrderButton({
      catalogueId: this.props.item.id,
      qty:
        parseInt(largeQty, 10) * this.props.uomDetail.packagedQty +
        parseInt(smallQty, 10),
      detail: {
        smallUom: this.state.smallUnit,
        smallUomQty: parseInt(smallQty, 10),
        largeUom: this.state.largeUnit,
        largeUomQty: parseInt(largeQty, 10),
        packagedQty: this.props.uomDetail.packagedQty
      }
    });
  }

  calculateTotalQty() {
    const totalQty =
      this.props.uomDetail.largeUomQty * this.props.uomDetail.packagedQty +
      this.props.uomDetail.smallUomQty;

    return totalQty;
  }

  modifyQty(isLarge) {
    if (!isLarge) {
      if (parseInt(this.state.largeUomQty, 10) !== 0) {
        const valueAfterMinimum = this.calculateTotalQty() - this.state.minQty;

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
    } else {
      return this.state.largeUomQty;
    }
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

  checkQtyAfterEnter(isLarge) {
    const smallUomQty = this.state.smallUomQty;
    const largeUomQty = this.state.largeUomQty;
    this.checkTotalClickPlusButton(this.state.qty);
    /** if value that entered below min qty, qty = min qty */
    if (
      this.state.qty === '' ||
      this.state.qty + this.state.largeUomQty * this.state.packagedQty <
        this.state.minQty
    ) {
      if (!isLarge) {
        this.sendValueToParent(this.state.minQty);
        this.setState({ smallUomQty: this.state.minQty });
      }
      return true;
    }
    /** Limited Stock */
    if (!this.state.unlimitedStock) {
      /** Modified Qty is less than stock */
      if (this.calculateTotalQty() < this.state.stock) {
        /** Qty less than Multiple Qty */
        if (
          this.state.stock - this.calculateTotalQty() <=
          this.state.multipleQty
        ) {
          this.setState({
            plusButtonDisable: true,
            qty: this.modifyQty(isLarge)
          });
        } else {
          if (isLarge) {
            this.sendValueToParentLarge(largeUomQty);
            this.setState({ largeUomQty });
          } else {
            this.sendValueToParent(smallUomQty);
            this.setState({ smallUomQty });
          }
        }
      } else {
        /** Modified Qty is more than stock */
        if (isLarge) {
          this.sendValueToParentLarge(largeUomQty);
          this.setState({ largeUomQty });
        } else {
          this.sendValueToParent(smallUomQty);
          this.setState({ smallUomQty });
        }
        this.setState({ plusButtonDisable: true });
      }
    } else {
      /** Unlimited Stock */
      if (isLarge) {
        this.sendValueToParentLarge(largeUomQty);
        this.setState({ largeUomQty });
      } else {
        this.sendValueToParent(smallUomQty);
        this.setState({ smallUomQty });
      }
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
    if (
      !this.props.item.warehouseCatalogues[0].unlimitedStock &&
      this.props.item.warehouseCatalogues[0].stock > this.state.minQty
    ) {
      return `Tersisa ${NumberFormat(
        this.props.item.warehouseCatalogues[0].stock
      )} ${this.state.smallUnit}`;
    }
    return '';
  }
  /** === MAX QUANTITY ORDER === */
  checkMaxQtyOrder() {
    if (
      this.props.item.isMaximum ||
      this.props.item.qty === this.props.item.maxQty
    ) {
      return `Maksimum pembelian ${this.props.item.maxQty} ${
        this.state.smallUnit
      }`;
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
        {this.state.showMaxQtyWarning ? (
          <Text style={Fonts.type67}>{this.checkMaxQtyOrder()}</Text>
        ) : (
          <Text style={Fonts.type67}>{''}</Text>
        )}
      </View>
    );
  }
  /** => render minus button */
  renderMinusButton() {
    return this.state.qty <= this.state.minQty ||
      this.props.showKeyboard ||
      this.state.smallUomQty === 0 ? (
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
    return this.props.showKeyboard || this.state.plusButtonDisable ? (
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
    return this.props.showKeyboard || this.state.plusButtonLargeDisable ? (
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
  renderInput(parentQty, isLarge) {
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
          onEndEditing={() => this.checkQtyAfterEnter(isLarge)}
          onChangeText={qty => {
            const cleanNumber = qty.replace(/[^0-9]/g, '');
            const number = cleanNumber === '' ? 0 : cleanNumber;
            this.checkTotalClickPlusButton(number);
            if (isLarge) {
              this.setState({ largeUomQty: number });
            } else {
              this.setState({ smallUomQty: number });
            }
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
        {this.renderInput(qty, isLarge)}
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
      <>
        <View style={{ alignSelf: 'flex-start' }}>
          {this.renderRemainingStock()}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center'
          }}
        >
          <View style={{ alignContent: 'flex-start' }}>
            <Text style={Fonts.fontH12Medium}>
              Dalam {this.state.smallUnit}
            </Text>
          </View>
          <View style={styles.subMainContainer}>
            {this.renderCalculator(this.state.qty, false)}
          </View>
        </View>
      </>
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
            flex: 1,
            alignItems: 'center'
          }}
        >
          <View style={{ alignContent: 'flex-start' }}>
            <Text style={Fonts.fontH12Medium}>
              Dalam {this.state.smallUnit}
            </Text>
          </View>
          <View style={styles.subMainContainerDouble}>
            {this.renderCalculator(this.state.smallUomQty, false)}
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
            <Text style={Fonts.fontH12Medium}>
              Dalam {this.state.largeUnit}
            </Text>
          </View>
          <View style={styles.subMainContainerDouble}>
            {this.renderCalculator(this.state.largeUomQty, true)}
            <Text style={[Fonts.type38, { marginTop: 5 }]}>{`Sejumlah ${this
              .props.uomDetail.largeUomQty *
              this.props.uomDetail.packagedQty} ${
              this.props.uomDetail.smallUom
            }`}</Text>
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

export default MultipleOrderButton;

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
