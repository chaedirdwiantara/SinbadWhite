import {
  React,
  Component,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Keyboard,
  Text
} from '../../library/reactPackage';
import {
  connect,
  MaterialIcon,
  Tooltip,
  bindActionCreators
} from '../../library/thirdPartyPackage';
import {
  OrderButton,
  StatusBarRedOP50,
  StatusBarBlackOP40,
  ButtonSingleSmall,
  SkeletonType18
} from '../../library/component';
import { GlobalStyle, Fonts, MoneyFormat, NumberFormat } from '../../helpers';
import { Color } from '../../config';
import * as ActionCreators from '../../state/actions';
import Price from '../../functions/Price';
// import PdpPromoListView from './PdpPromoListView';

const { width, height } = Dimensions.get('window');

class PdpOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showKeyboard: false,
      questionMarkShow: true,
      buttonAddDisabled: false,
      qtyFromChild:
        this.props.pdp.dataDetailPdp !== null
          ? this.props.pdp.dataDetailPdp.minQty
          : 0
    };
  }
  /**
   * =============================
   * FUNCTIONAL
   * ============================
   */
  /** DID MOUNT */
  componentDidMount() {
    this.keyboardListener();
  }
  /** WILL UNMOUNT */
  componentWillUnmount() {
    this.keyboardRemove();
  }
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    /** => IF SKU NOT AVAILABLE */
    if (prevProps.pdp.dataDetailPdp !== this.props.pdp.dataDetailPdp) {
      if (this.props.pdp.dataDetailPdp !== null) {
        this.setState({
          qtyFromChild: this.props.pdp.dataDetailPdp.minQty
        });
        if (this.props.pdp.dataDetailPdp.warehouseCatalogues.length === 0) {
          this.toParentFunction({
            type: 'skuNotAvailable'
          });
        }
      }
    }
  }

  /**
   * ========================
   * FOR KEYBOARD
   * ========================
   */
  /** KEYBOARD LISTENER */
  keyboardListener() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    );
  }
  /** KEYBOARD SHOW */
  keyboardDidShow = () => {
    this.setState({ showKeyboard: true });
  };
  /** KEYBOARD HIDE */
  keyboardDidHide = () => {
    this.setState({ showKeyboard: false });
  };
  /** KEYBOARD REMOVE */
  keyboardRemove() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  /** === SEND DATA TO PARENT (PdpView) */
  toParentFunction(data) {
    this.props.parentFunction(data);
  }
  /** === BUTTON TITLE ===  */
  buttonTitle() {
    if (
      this.props.pdp.dataDetailPdp.warehouseCatalogues[0].unlimitedStock ||
      this.props.pdp.dataDetailPdp.warehouseCatalogues[0].stock >
        this.props.pdp.dataDetailPdp.minQty
    ) {
      return 'Tambah ke Keranjang';
    }
    return 'Stock Habis';
  }
  /** === BUTTON DISABLED ===  */
  buttonDisabled() {
    if (
      this.props.pdp.dataDetailPdp.warehouseCatalogues[0].unlimitedStock ||
      this.props.pdp.dataDetailPdp.warehouseCatalogues[0].stock >
        this.props.pdp.dataDetailPdp.minQty
    ) {
      return false;
    }
    return true;
  }
  /** === CALCUATION TOTAL === */
  calTotal() {
    if (
      this.props.pdp.dataDetailPdp.warehouseCatalogues[0].unlimitedStock ||
      this.props.pdp.dataDetailPdp.warehouseCatalogues[0].stock >
        this.props.pdp.dataDetailPdp.minQty
    ) {
      return Price(this.props.pdp.dataDetailPdp) * this.state.qtyFromChild;
    }
    return 0;
  }
  /** === CHECK INPUT QTY SECTION === */
  checkInputQtySection() {
    if (!this.props.pdp.dataDetailPdp.warehouseCatalogues[0].unlimitedStock) {
      if (
        this.props.pdp.dataDetailPdp.warehouseCatalogues[0].stock >
        this.props.pdp.dataDetailPdp.minQty
      ) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  }
  /**
   * ========================================
   * beberapa penjelasan fungsi
   * ========================================
   * - parentFunctionFromOrderButton
   * fungsi ini dipanggil dari child component (OrderButton)
   * - parentFunctionToCloseProductOrderView
   * fungsi memanggil fungsi di RootProduct untuk menutup ProductOrderView
   */
  parentFunctionFromOrderButton(data) {
    /** NOTE 1 */
    this.setState({
      qtyFromChild: data.qty
    });
  }

  /**
   * =======================
   * RENDER VIEW
   * ======================
   */
  /** === RENDER TOTAL VALUE === */
  renderBottomValue() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingRight: 10
          }}
        >
          <View style={{ marginBottom: 5 }}>
            <Text>
              <Text style={Fonts.type9}>Total: </Text>
              <Text style={Fonts.type53}>{MoneyFormat(this.calTotal())}</Text>
            </Text>
          </View>
          <View>
            <Text style={Fonts.type69}>Belum termasuk PPN 10%</Text>
          </View>
        </View>
      </View>
    );
  }
  /** === RENDER BUTTON ORDER === */
  renderButtonOrder() {
    return (
        <OrderButton
          showKeyboard={this.state.showKeyboard}
          disabledAllButton={this.state.showKeyboard}
          item={this.props.pdp.dataDetailPdp}
          onRef={ref => (this.parentFunctionFromOrderButton = ref)}
          parentFunctionFromOrderButton={this.parentFunctionFromOrderButton.bind(
            this
          )}
          onFocus={() => this.setState({ buttonAddDisabled: true })}
          onBlur={() => this.setState({ buttonAddDisabled: false })}
        />
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingleSmall
        accessibilityLabel={'btnPdpAddtoCart'}
        disabledGrey={!this.state.showKeyboard}
        disabled={this.buttonDisabled() || this.state.showKeyboard}
        title={this.buttonTitle()}
        borderRadius={4}
        onPress={() =>
          this.toParentFunction({
            type: 'addSkuToCart',
            data: {
              catalogueId: this.props.pdp.dataDetailPdp.id,
              qty: this.state.qtyFromChild
            }
          })
        }
      />
    );
  }
  /** === RENDER TOTAL BOTTOM === */
  renderBottomSection() {
    return (
      <View
        style={[
          styles.boxTotalPrice,
          GlobalStyle.shadowForBox10,
          { marginTop: !this.state.showKeyboard ? 0.14 * height : 0 }
        ]}
      >
        <View style={{ flex: 1 }}>{this.renderBottomValue()}</View>
        <View style={{ flex: 1 }}>{this.renderButton()}</View>
      </View>
    );
  }
  /** === RENDER TOOLTIP === */
  renderTooltip() {
    return (
      <Tooltip
        backgroundColor={Color.fontBlack50OP80}
        height={55}
        withOverlay={false}
        withPointer={false}
        onOpen={() => this.setState({ questionMarkShow: false })}
        onClose={() => this.setState({ questionMarkShow: true })}
        containerStyle={{
          padding: 8,
          width: 0.4 * width
        }}
        popover={
          <Text style={Fonts.type87}>
            Harga ini mungkin berubah mempertimbangkan lokasi gudang
          </Text>
        }
      >
        {this.state.questionMarkShow ? (
          <MaterialIcon name="help" size={18} color={Color.fontBlack40} />
        ) : (
          <View />
        )}
      </Tooltip>
    );
  }
  /** === RENDER DATA === */
  renderData() {
    return (
      <View style={styles.boxItem}>
        <View style={{ flexDirection: 'row', paddingBottom: 25 }}>
          <View
            style={{
              backgroundColor: Color.backgroudWhite
            }}
          >
            <Image
              defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
              source={{
                uri: this.props.pdp.dataDetailPdp.catalogueImages[0].imageUrl
              }}
              style={GlobalStyle.image70ContainRadius5}
            />
          </View>
          <View style={{ paddingLeft: 16 }}>
            <View style={{ width: '80%', marginBottom: 5 }}>
              <Text style={Fonts.type10}>
                {this.props.pdp.dataDetailPdp.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[Fonts.type70, { marginRight: 10 }]}>
                {MoneyFormat(Price(this.props.pdp.dataDetailPdp))}
              </Text>
              {this.renderTooltip()}
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={[Fonts.type38, { marginRight: 10 }]}>
                per-Dus {this.props.pdp.dataDetailPdp.packagedQty}{' '}
                {this.props.pdp.dataDetailPdp.catalogueUnit.unit}
              </Text>
              <View
                style={{
                  borderRightWidth: 1,
                  borderRightColor: Color.fontBlack40
                }}
              />
              <Text style={[Fonts.type38, { marginLeft: 10 }]}>
                min.pembelian {this.props.pdp.dataDetailPdp.minQty}{' '}
                {this.props.pdp.dataDetailPdp.catalogueUnit.unit}
              </Text>
            </View>
          </View>
        </View>
        {this.checkInputQtySection() ? (
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ alignContent: 'flex-start' }}>
              <Text style={Fonts.type96}>Jumlah/pcs</Text>
            </View>
            <View style={{ flex: 1 }}>
              {this.renderButtonOrder()}
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return this.props.pdp.dataDetailPdp.warehouseCatalogues.length > 0 ? (
      <View>
        {this.renderData()}
        {this.renderBottomSection()}
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER SKELETON === */
  renderSkeleton() {
    return <SkeletonType18 />;
  }
  /** RENDER STATUS BAR === */
  renderStatusBar() {
    return this.props.white ? <StatusBarBlackOP40 /> : <StatusBarRedOP50 />;
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderStatusBar()}
        {!this.props.pdp.loadingDetailPdp &&
        this.props.pdp.dataDetailPdp !== null
          ? this.renderContent()
          : this.renderSkeleton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroudWhite
  },
  boxItem: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  boxTotalPrice: {
    flexDirection: 'row',
    paddingVertical: 11,
    paddingLeft: 20,
    paddingRight: 10,
    height: 63
  },
  boxRemainingStockOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  boxInputQty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  boxPesan: {
    marginLeft: 5,
    flexDirection: 'row'
  }
});

const mapStateToProps = ({ pdp, oms }) => {
  return { pdp, oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PdpOrderView);

/**
 * ============================
 * NOTE
 * ==========================
 */
/** NOTE 1 */
/**
 * data = {
 *  catalogueId: "1", (string)
 *  qty: 1 (number)
 * }
 */
/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Tatas
 * updatedDate: 07072020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
