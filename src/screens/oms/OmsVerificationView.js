import {
  React,
  Component,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from '../../library/reactPackage';
import {
  StatusBarRed,
  ButtonSingle,
  ModalBottomErrorRespons,
  LoadingPage
} from '../../library/component';
import {
  connect,
  MaterialIcon,
  bindActionCreators
} from '../../library/thirdPartyPackage';
import masterColor from '../../config/masterColor.json';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import ModalBottomStockConfirmation from './ModalBottomStockConfirmation';
import ModalBottomErrorNoUrban from './ModalBottomErrorNoUrban';
import CallCS from '../../screens/global/CallCS';
import ModalBottomErrorPromo from './ModalBottomErrorPromo';
import ModalBottomErrorMaxOrderPromo from './ModalBottomErrorMaxOrderPromo';

class OmsVerificationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openBenefitDetail: null,
      openModalSkuStatusConfirmation: false,
      openModalErrorGlobal: false,
      openModalErrorNoUrban: false,
      openModalCS: false,
      openModalErrorPromo: false,
      openModalErrorMaxOrderPromo: false
    };
  }

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT */
  componentDidMount() {
    this.props.portfolioGetProcessV2();
  }
  /** === DID UPDATE */
  componentDidUpdate(prevProps) {
    /** === SUCCESS POST CHECKOUT ITEM ===
     * after success fetch checkout item navigate to checkout page
     */
    if (
      prevProps.oms.dataOmsGetCheckoutItem !==
      this.props.oms.dataOmsGetCheckoutItem
    ) {
      if (this.props.oms.dataOmsGetCheckoutItem !== null) {
        NavigationService.navigate('OmsCheckoutView');
      }
    }
    /** ERROR GET CHECKOUT LIST */
    /**
     * === ERROR RESPONS ===
     * ==> ERROR CODE 400
     * 1. 'ERR-STOCK'
     * 2. 'ERR-STATUS'
     * 3. 'ERR-WAREHOUSE'
     * 4. 'ERR-RUN-OUT'
     * ==> ERROR CODE 406
     * 1. 'ERR-URBAN'
     * 2. 'ERR-VERIFIED'
     */
    if (
      prevProps.oms.errorOmsGetCheckoutItem !==
      this.props.oms.errorOmsGetCheckoutItem
    ) {
      if (this.props.oms.errorOmsGetCheckoutItem !== null) {
        if (this.props.oms.errorOmsGetCheckoutItem.code === 400) {
          this.setState({ openModalSkuStatusConfirmation: true });
        } else if (
          this.props.oms.errorOmsGetCheckoutItem.code === 406 &&
          this.props.oms.errorOmsGetCheckoutItem.data
        ) {
          this.manageError();
        } else {
          this.setState({ openModalErrorGlobal: true });
        }
      }
    }
  }

  /**
   * =============================
   * ERROR FUNCTION
   * ============================
   */
  manageError() {
    switch (this.props.oms.errorOmsGetCheckoutItem.data.errorCode) {
      case 'ERR-URBAN':
        this.setState({
          openModalErrorNoUrban: true,
          cartId: this.props.oms.errorOmsGetCheckoutItem.data.cartId
        });
        break;
      case 'ERR-PROMO':
        this.setState({
          openModalErrorPromo: true,
          cartId: this.props.oms.errorOmsGetCheckoutItem.data.cartId
        });
        break;
      case 'ERR-BLOCK-PROMO':
        this.setState({
          openModalErrorMaxOrderPromo: true
        });
        break;
      default:
        break;
    }
  }

  /** === CALLBACK FOR ERROR PROMO MODAL ==== */
  backToCartItemView() {
    // close error promo modal
    this.setState({ openModalErrorPromo: false });
    // back to cart view
    NavigationService.navigate('OmsCartView');
    // re-fetch the cart
    this.props.omsGetCartItemFromCheckoutProcess({
      catalogues: this.props.permanent.dataSkuCart
    });
    // delete the cart
    this.props.omsDeleteCartItemProcess({
      orderId: this.props.navigation.state.params.cartId
    });
  }

  /** ===  === */
  getCheckoutItem() {
    this.props.omsGetCheckoutItemProcess({
      cartId: this.props.navigation.state.params.cartId,
      catalogues: this.props.oms.dataCheckout,
      portfolioId: this.props.merchant.dataGetPortfolioV2[0].id
    });
  }

  openBenefitDetail(index) {
    if (this.state.openBenefitDetail === index) {
      this.setState({ openBenefitDetail: null });
    } else {
      this.setState({ openBenefitDetail: index });
    }
  }

  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={Fonts.type48}>BERIKUT ADALAH RINGKASAN ORDER ANDA</Text>
      </View>
    );
  }

  renderPotonganProductList() {
    const { promoSku } = this.props.oms.dataOmsCheckPromo;
    if (promoSku.length > 0) {
      return (
        <View>
          <View style={styles.sectionHeaderContainer}>
            <Text style={Fonts.type16}>{`Produk Mendapatkan Potongan Harga (${
              promoSku.length
            } SKU)`}</Text>
          </View>
          {this.renderPotonganProductItem(promoSku)}
        </View>
      );
    }
  }

  renderPotonganProductItem(promoSku) {
    return promoSku.map((item, index) => {
      return (
        <View key={index}>
          <View style={styles.productListContainer}>
            <View style={styles.productImageContainer}>
              <Image
                source={{ uri: item.catalogueImages }}
                style={GlobalStyle.image70Contain}
              />
            </View>
            <View style={styles.productDetailContainer}>
              <View style={{ width: '75%' }}>
                <Text style={[Fonts.type16, { marginBottom: 4 }]}>
                  {item.name}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={[Fonts.type17, { marginBottom: 4 }]}>{`x${
                    item.qty
                  } Pcs`}</Text>
                  <Text style={[Fonts.type22, { marginBottom: 4 }]}>
                    {MoneyFormat(parseInt(item.price))}
                  </Text>
                  <View style={styles.totalAndPriceContainer}>
                    <Text style={Fonts.type10}>Total</Text>
                  </View>
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                  <Text style={Fonts.type10}>
                    {MoneyFormat(parseInt(item.totalPrice))}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {this.state.openBenefitDetail === index ? (
            this.renderBenefitDetail(item.listPromo)
          ) : (
            <View />
          )}
          {this.renderBenefitTotal(item, index)}
        </View>
      );
    });
  }

  renderBenefitTotal(item, index) {
    return (
      <TouchableOpacity
        onPress={() => this.openBenefitDetail(index)}
        style={styles.totalBenefitContainer}
      >
        <View style={styles.totalBenefitLeftSection}>
          {this.state.openBenefitDetail === index ? (
            <MaterialIcon name="keyboard-arrow-up" size={24} />
          ) : (
            <MaterialIcon name="keyboard-arrow-down" size={24} />
          )}
          <Text style={[Fonts.type50, { marginLeft: 8 }]}>Total Potongan</Text>
        </View>
        <View>
          <Text style={Fonts.type50}>
            {MoneyFormat(parseInt(item.totalRebate))}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderBenefitDetail(benefitList) {
    return benefitList.map((item, index) => {
      return (
        <View key={index} style={[styles.benefitDetailContainer]}>
          <View style={styles.benefitListContainer}>
            <Text style={Fonts.type8}>{item.name}</Text>
            <Text style={Fonts.type107}>
              {MoneyFormat(parseInt(item.value))}
            </Text>
          </View>
        </View>
      );
    });
  }

  renderBonusesProductList() {
    const { bonusSku } = this.props.oms.dataOmsCheckPromo;
    if (bonusSku.length > 0) {
      return (
        <View>
          <View style={styles.sectionHeaderContainer}>
            <Text style={Fonts.type16}>Bonus SKU</Text>
          </View>
          {this.renderBonusesProductItem(bonusSku)}
        </View>
      );
    }
  }

  renderBonusesProductItem(bonusSku) {
    return bonusSku.map((item, index) => {
      return (
        <View key={index} style={styles.productListContainer}>
          <View style={styles.productImageContainer}>
            <Image
              source={{
                uri: item.catalogueImages
              }}
              style={GlobalStyle.image70Contain}
            />
          </View>
          <View style={styles.productDetailContainer}>
            <View style={{ width: '75%' }}>
              <Text style={[Fonts.type16, { marginBottom: 4 }]}>
                {item.name}
              </Text>
            </View>
            <Text style={[Fonts.type17, { marginBottom: 4 }]}>
              {item.promoName}
            </Text>
            <Text style={[Fonts.type10, { marginBottom: 4 }]}>{`x${
              item.qty
            } Pcs`}</Text>
          </View>
        </View>
      );
    });
  }

  renderNonBenefitProductList() {
    const { notPromoSku } = this.props.oms.dataOmsCheckPromo;
    if (notPromoSku.length > 0) {
      return (
        <View>
          <View style={styles.sectionHeaderContainer}>
            <Text style={Fonts.type16}>
              Produk Tidak Mendapatkan Potongan Harga
            </Text>
          </View>
          {this.renderNonBenefitProductItem(notPromoSku)}
        </View>
      );
    }
  }

  renderNonBenefitProductItem(notPromoSku) {
    return notPromoSku.map((item, index) => {
      return (
        <View key={index}>
          <View style={styles.productListContainer}>
            <View style={styles.productImageContainer}>
              <Image
                source={{ uri: item.catalogueImages }}
                style={GlobalStyle.image70Contain}
              />
            </View>
            <View style={styles.productDetailContainer}>
              <View style={{ width: '75%' }}>
                <Text style={[Fonts.type16, { marginBottom: 4 }]}>
                  {item.name}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={[Fonts.type17, { marginBottom: 4 }]}>{`x${
                    item.qty
                  } Pcs`}</Text>
                  <Text style={[Fonts.type22, { marginBottom: 4 }]}>
                    {MoneyFormat(parseInt(item.price))}
                  </Text>
                  <View style={styles.totalAndPriceContainer}>
                    <Text style={Fonts.type10}>Total</Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'flex-end'
                  }}
                >
                  <Text style={Fonts.type10}>
                    {MoneyFormat(parseInt(item.totalPrice))}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    });
  }

  renderBottomSection() {
    const { dataOmsCheckPromo } = this.props.oms;
    return (
      <View style={styles.bottomContainer}>
        <View style={styles.bottomInformationContainer}>
          <View style={styles.bottomInformationHeader}>
            <Text style={Fonts.type48}>Total (Sebelum Pajak)</Text>
          </View>
          <View
            style={[styles.bottomInformationTextContainer, { marginBottom: 8 }]}
          >
            <Text style={Fonts.type8}>Total Transaksi</Text>
            <Text style={Fonts.type8}>
              {MoneyFormat(parseInt(dataOmsCheckPromo.grandTotalTransaction))}
            </Text>
          </View>
          <View style={styles.bottomInformationTextContainer}>
            <Text style={Fonts.type8}>Total Potongan</Text>
            <Text style={Fonts.type107}>
              {MoneyFormat(parseInt(dataOmsCheckPromo.grandTotalRebate))}
            </Text>
          </View>
        </View>
        <View>
          <ButtonSingle
            disabled={this.props.oms.loadingOmsGetCheckoutItem}
            loading={this.props.oms.loadingOmsGetCheckoutItem}
            title={'Lanjut Ke Pembayaran'}
            borderRadius={4}
            onPress={() => this.getCheckoutItem()}
          />
        </View>
      </View>
    );
  }

  renderLoading() {
    return <LoadingPage />;
  }

  renderMainContent() {
    return (
      <>
        <ScrollView>
          {this.renderHeader()}
          {this.renderPotonganProductList()}
          {this.renderBonusesProductList()}
          {this.renderNonBenefitProductList()}
          <View style={{ paddingBottom: 50 }} />
        </ScrollView>
        {this.renderBottomSection()}
      </>
    );
  }

  renderContent() {
    const isReady =
      !this.props.oms.loadingOmsCheckPromo &&
      this.props.oms.dataOmsCheckPromo !== null;
    return isReady ? this.renderMainContent() : this.renderLoading();
  }

  /**
   * ===================================
   * MODAL
   * ===================================
   * - stock confirmation (===> RENDER MODAL SKU STATUS CONFIRMATION)
   * - error respons from BE (===> RENDER MODAL ERROR RESPONS FROM BE)
   */
  /** ===> RENDER MODAL SKU STATUS CONFIRMATION === */
  renderModalSkuStatusConfirmation() {
    return (
      <View>
        {this.state.openModalSkuStatusConfirmation ? (
          <ModalBottomStockConfirmation
            open={this.state.openModalSkuStatusConfirmation}
            close={() => {
              this.setState({ openModalSkuStatusConfirmation: false });
              NavigationService.navigate('OmsCartView');
            }}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
  /** ===> RENDER MODAL ERROR RESPONS FROM BE ===  */
  renderModalErrorRespons() {
    return this.state.openModalErrorGlobal ? (
      <ModalBottomErrorRespons
        open={this.state.openModalErrorGlobal}
        onPress={() => {
          this.setState({ openModalErrorGlobal: false });
          // this.checkCartBeforeCheckout();
        }}
      />
    ) : (
      <View />
    );
  }
  /** === MODAL CALL CS === */
  renderModalCallCS() {
    return this.state.openModalCS ? (
      <View>
        <CallCS
          statusBarRed
          open={this.state.openModalCS}
          close={() => this.setState({ openModalCS: false })}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    ) : (
      <View />
    );
  }
  /** ===> RENDER MODAL ERROR NO URBAN ===  */
  renderModalErrorNoUrban() {
    return this.state.openModalErrorNoUrban ? (
      <ModalBottomErrorNoUrban
        open={this.state.openModalErrorNoUrban}
        backToHome={() => {
          this.setState({ openModalErrorNoUrban: false });
          NavigationService.navigate('MerchantHomeView');
        }}
        callCS={() => {
          this.setState({ openModalErrorNoUrban: false, openModalCS: true });
        }}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER MODAL ERROR PROMO === */
  renderModalErrorPromo() {
    return this.state.openModalErrorPromo ? (
      <ModalBottomErrorPromo
        open={this.state.openModalErrorPromo}
        close={() =>
          this.setState({
            openModalErrorPromo: false
          })
        }
        backToCart={() => this.backToCartItemView()}
        proceedToCheckout={() => {
          this.setState({ openModalErrorPromo: false });
          this.props.omsReplaceCheckoutItem(
            this.props.oms.errorOmsGetCheckoutItem.data.dataCheckout
          );
        }}
      />
    ) : (
      <View />
    );
  }
  /** ===> RENDER MODAL MAX ORDER PROMO === */
  renderModalErrorMaxOrderPromo() {
    return this.state.openModalErrorMaxOrderPromo ? (
      <View>
        <ModalBottomErrorMaxOrderPromo
          openModalBlockPromo={
            this.props.oms.errorOmsGetCheckoutItem.data.blockPromo.length > 0
          }
        />
      </View>
    ) : (
      <View />
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarRed />
        {this.renderContent()}
        {/* modal */}
        {this.renderModalSkuStatusConfirmation()}
        {/* error */}
        {this.renderModalErrorRespons()}
        {this.renderModalErrorNoUrban()}
        {this.renderModalCallCS()}
        {this.renderModalErrorPromo()}
        {this.renderModalErrorMaxOrderPromo()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  headerContainer: {
    paddingVertical: 16,
    marginHorizontal: 16,
    borderBottomColor: masterColor.fontBlack10,
    borderBottomWidth: 1
  },
  sectionHeaderContainer: {
    padding: 16
  },
  productListContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: masterColor.fontBlack10,
    borderBottomWidth: 1
  },
  productImageContainer: {
    marginRight: 8
  },
  productDetailContainer: {
    flex: 1
  },
  totalAndPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalBenefitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13
  },
  totalBenefitLeftSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  benefitDetailContainer: {
    paddingTop: 12,
    paddingLeft: 48,
    paddingRight: 16
  },
  benefitListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomContainer: {
    borderColor: masterColor.fontBlack10,
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  bottomInformationContainer: {
    paddingHorizontal: 16,
    paddingTop: 16
  },
  bottomInformationHeader: {
    paddingBottom: 8,
    marginBottom: 8,
    borderBottomColor: masterColor.fontBlack10,
    borderBottomWidth: 1
  },
  bottomInformationTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const mapStateToProps = ({ oms, permanent, merchant }) => {
  return { oms, permanent, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(OmsVerificationView);
