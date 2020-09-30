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
  ModalBottomErrorRespons
} from '../../library/component';
import { MaterialIcon } from '../../library/thirdPartyPackage';
import masterColor from '../../config/masterColor.json';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import NavigationService from '../../navigation/NavigationService';
import ModalBottomStockConfirmation from './ModalBottomStockConfirmation';
import ModalBottomErrorNoUrban from './ModalBottomErrorNoUrban';
import CallCS from '../../screens/global/CallCS';
import ModalBottomInputOwnerId from './ModalBottomInputOwnerId';

const dummies = {
  grandTotalPotongan: 21000,
  grandTotalTransaction: 900000,
  bonusSku: [
    {
      name: 'LAKME EYESHADOW CRAZON BRONZE',
      namePromo: 'Promo beli 50pcs Lakme bonus 5pcs Lakme',
      qty: 5,
      catalogueImages:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67842629.png'
    }
  ],
  promoSku: [
    {
      name: 'SGM EKSPLOR 1+ MADU 1200 GR GA',
      catalogueImages:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115822.png',
      qty: 20,
      price: 25000,
      totalPrice: 500000,
      totalPotongan: 21000,
      listPromo: [
        {
          name: 'Promo 1',
          value: 5000
        },
        {
          name: 'Promo 2',
          value: 6000
        }
      ],
      listVoucher: [
        {
          name: 'Voucher A',
          value: 10000
        }
      ]
    }
  ],
  notPromoSku: [
    {
      name: 'CIP STRAW MUSHROOM PEELED 425 GR',
      catalogueImages:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/110049.png',
      qty: 10,
      price: 40000,
      totalPrice: 400000
    },
    {
      name: 'CIP CHAMPIGNON MUSHROOM WHOLE 425 GR',
      catalogueImages:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/110048.png',
      qty: 10,
      price: 40000,
      totalPrice: 400000
    }
  ]
};

class OmsVerificationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openBenefitDetail: null,
      openModalSkuStatusConfirmation: false,
      openModalErrorGlobal: false,
      openModalErrorNoUrban: false,
      openModalCS: false,
      openModalInputOwnerId: false
    };
  }

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

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
    if (dummies.promoSku.length > 0) {
      return (
        <View>
          <View style={styles.sectionHeaderContainer}>
            <Text style={Fonts.type16}>{`Potongan Harga (${
              dummies.promoSku.length
            } SKU)`}</Text>
          </View>
          {this.renderPotonganProductItem()}
        </View>
      );
    }
  }

  renderPotonganProductItem() {
    return dummies.promoSku.map((item, index) => {
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
              <Text style={[Fonts.type16, { marginBottom: 4 }]}>
                {item.name}
              </Text>
              <Text style={[Fonts.type17, { marginBottom: 4 }]}>{`x${
                item.qty
              } Pcs`}</Text>
              <Text style={[Fonts.type22, { marginBottom: 4 }]}>
                {MoneyFormat(item.price)}
              </Text>
              <View style={styles.totalAndPriceContainer}>
                <Text style={Fonts.type10}>Total</Text>
                <Text style={Fonts.type10}>{MoneyFormat(item.totalPrice)}</Text>
              </View>
            </View>
          </View>
          {this.state.openBenefitDetail === index ? (
            this.renderBenefitDetail([...item.listPromo, ...item.listVoucher])
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
          <Text style={Fonts.type50}>{MoneyFormat(item.totalPotongan)}</Text>
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
            <Text style={Fonts.ryanNew01}>{MoneyFormat(item.value)}</Text>
          </View>
        </View>
      );
    });
  }

  renderBonusesProductList() {
    if (dummies.bonusSku.length > 0) {
      return (
        <View>
          <View style={styles.sectionHeaderContainer}>
            <Text style={Fonts.type16}>Bonus SKU</Text>
          </View>
          {this.renderBonusesProductItem()}
        </View>
      );
    }
  }

  renderBonusesProductItem() {
    return dummies.bonusSku.map((item, index) => {
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
            <Text style={[Fonts.type16, { marginBottom: 4 }]}>{item.name}</Text>
            <Text style={[Fonts.type17, { marginBottom: 4 }]}>
              {item.namePromo}
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
    if (dummies.notPromoSku.length > 0) {
      return (
        <View>
          <View style={styles.sectionHeaderContainer}>
            <Text style={Fonts.type16}>Produk Tidak Mendapatkan Promo</Text>
          </View>
          {this.renderNonBenefitProductItem()}
        </View>
      );
    }
  }

  renderNonBenefitProductItem() {
    return dummies.notPromoSku.map((item, index) => {
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
              <Text style={[Fonts.type16, { marginBottom: 4 }]}>
                {item.name}
              </Text>
              <Text style={[Fonts.type17, { marginBottom: 4 }]}>{`x${
                item.qty
              } Pcs`}</Text>
              <Text style={[Fonts.type22, { marginBottom: 4 }]}>
                {MoneyFormat(item.price)}
              </Text>
              <View style={styles.totalAndPriceContainer}>
                <Text style={Fonts.type10}>Total</Text>
                <Text style={Fonts.type10}>{MoneyFormat(item.totalPrice)}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    });
  }

  renderBottomSection() {
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
              {MoneyFormat(dummies.grandTotalTransaction)}
            </Text>
          </View>
          <View style={styles.bottomInformationTextContainer}>
            <Text style={Fonts.type8}>Total Potongan</Text>
            <Text style={Fonts.ryanNew01}>
              {MoneyFormat(dummies.grandTotalPotongan)}
            </Text>
          </View>
        </View>
        <View>
          <ButtonSingle title={'Lanjut Ke Pembayaran'} borderRadius={4} />
        </View>
      </View>
    );
  }

  renderContent() {
    return (
      <ScrollView>
        {this.renderHeader()}
        {this.renderPotonganProductList()}
        {this.renderBonusesProductList()}
        {this.renderNonBenefitProductList()}
        <View style={{ paddingBottom: 50 }} />
      </ScrollView>
    );
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
            close={() =>
              this.setState({ openModalSkuStatusConfirmation: false })
            }
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
          NavigationService.navigate('HomeView');
        }}
        callCS={() => {
          this.setState({ openModalErrorNoUrban: false, openModalCS: true });
        }}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER MODAL INPUT OWNER ID === */
  renderModalInputOwnerId() {
    return this.state.openModalInputOwnerId ? (
      <ModalBottomInputOwnerId
        open={this.state.openModalInputOwnerId}
        close={() =>
          this.setState({
            openModalInputOwnerId: false
          })
        }
      />
    ) : (
      <View />
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarRed />
        {this.renderContent()}
        {this.renderBottomSection()}
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

export default OmsVerificationView;
