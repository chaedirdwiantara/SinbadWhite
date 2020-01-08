import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Accordion from 'react-native-collapsible/Accordion';
import { Fonts } from '../../utils/Fonts';
import { MoneyFormat } from '../../helpers';
import { totalDiscountPromo, totalPrice, voucherDiscountPromoTotal } from '../../redux/actions';

const { height } = Dimensions.get('window');

class TotalCartList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSectionsOrderAnda: [0],
      activeSectionsPotonganHarga: [0],
      activeSectionsRincianHarga: [0],
      collapsed: true,
      multipleSelect: true,
      totalPrice: 0,
      totalPromo: 0,
      totalDiskon: 0,
      totalBonus: 0
    };
  }

  setSectionsOrderAnda = sections => {
    this.setState({
      activeSectionsOrderAnda: sections.includes(undefined) ? [] : sections
    });
  };

  setSectionsPotonganHarga = sections => {
    this.setState({
      activeSectionsPotonganHarga: sections.includes(undefined) ? [] : sections
    });
  };

  setSectionsRincianHarga = sections => {
    this.setState({
      activeSectionsRincianHarga: sections.includes(undefined) ? [] : sections
    });
  };

  totalDiskonPromo() {
    return this.props.cart.createOrderData.discount + this.props.cart.createOrderData.promo;
  }

  voucher() {
    if (this.props.voucher.voucherUsed !== null) {
      return this.props.voucher.voucherUsed.amount;
    }
    return 0;
  }

  renderContentSectionOne = (section, _) => {
    return (
      <View style={styles.contentSection} key={_}>
        {this.props.cart.createOrderData.order_line.map((item, index) => {
          return !item.bonus ? (
            <View key={index}>
              <View
                style={{
                  marginBottom: 0.01 * height,
                  width: '70%'
                }}
              >
                <Text style={styles.orderAndaTextProduct}>{item.product_name}</Text>
              </View>
              <View style={styles.orderAndaContentBox}>
                <View>
                  <Text style={styles.orderAndaTextUnit}>{item.quantity} pcs</Text>
                </View>
                <View>
                  <Text style={styles.orderAndaTextAmount}>{MoneyFormat(item.gross)}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View key={index} />
          );
        })}
        <View style={styles.subTotalBox}>
          <Text style={styles.subTotalText}>Subtotal</Text>
          <Text style={styles.subTotalTextAmount}>
            {MoneyFormat(this.props.cart.createOrderData.gross)}
          </Text>
        </View>
      </View>
    );
  };

  renderContentSectionTwoBonus = (item, index) => {
    return (
      <View style={styles.bonusBox} key={index}>
        <View style={styles.bonusBoxYellow}>
          <Text style={styles.bonusText}>BONUS</Text>
        </View>
        <View style={styles.bonusBoxGreen}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.bonusTextProduct}>{item.product_name}</Text>
          </View>
          <View style={styles.bonusContentBox}>
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.bonusTextUnit}>{item.quantity} pcs</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.bonusTextAmount}>{MoneyFormat(0)}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderContentSectionTwo = (section, _) => {
    return (
      <View style={styles.contentSectionPotonganHarga} key={_}>
        <View style={styles.rincianPotonganHarga}>
          <Text style={styles.potonganHargaText}>Diskon</Text>
          <Text style={styles.orderAndaTextAmountGreen}>
            {this.props.cart.createOrderData.discount === 0 ? 0 : ''}
          </Text>
        </View>
        <View style={[styles.rincianPotonganHarga, { flexDirection: 'column' }]}>
          {this.props.cart.createOrderData.order_line.map((item, index) => {
            return item.discount !== 0 ? (
              <View
                key={index}
                style={[styles.orderAndaContentBox, { justifyContent: 'space-between', flex: 1 }]}
              >
                <View style={{ width: '70%' }}>
                  <Text style={styles.orderAndaTextUnitGreen}>{item.product_name}</Text>
                </View>
                <Text style={styles.orderAndaTextAmountGreen}>{MoneyFormat(item.discount)}</Text>
              </View>
            ) : (
              <View key={index} />
            );
          })}
        </View>
        <View style={styles.rincianPotonganHarga}>
          <Text style={styles.potonganHargaText}>Promo</Text>
          <Text style={styles.orderAndaTextAmountGreen}>
            {this.props.cart.createOrderData.promo === 0 ? 0 : ''}
          </Text>
        </View>
        <View style={[styles.rincianPotonganHarga, { flexDirection: 'column' }]}>
          {this.props.cart.createOrderData.order_line.map((item, index) => {
            return item.promo !== 0 ? (
              <View
                key={index}
                style={[styles.orderAndaContentBox, { justifyContent: 'space-between', flex: 1 }]}
              >
                <View style={{ width: '70%' }}>
                  <Text style={styles.orderAndaTextUnitGreen}>{item.product_name}</Text>
                </View>
                <Text style={styles.orderAndaTextAmountGreen}>-{MoneyFormat(item.promo)}</Text>
              </View>
            ) : (
              <View key={index} />
            );
          })}
        </View>
        {this.props.cart.createOrderData.order_line.map((item, index) => {
          return item.bonus ? this.renderContentSectionTwoBonus(item, index) : <View key={index} />;
        })}
        <View style={styles.rincianPotonganHarga}>
          <Text style={styles.subTotalText}>Total Diskon & Promo</Text>
          <Text style={styles.subTotalTextAmountGreen}>
            -{MoneyFormat(this.totalDiskonPromo())}
          </Text>
        </View>
        {/* this for voucher */}
        <View style={styles.rincianPotonganHarga}>
          <Text style={styles.potonganHargaText}>Voucher</Text>
          {this.props.voucher.voucherUsed === null ? (
            <Text style={styles.orderAndaTextAmountGreen}>0</Text>
          ) : (
            <View />
          )}
        </View>
        <View style={[styles.rincianPotonganHarga, { flexDirection: 'column' }]}>
          {this.props.voucher.voucherUsed !== null ? (
            <View
              style={[styles.orderAndaContentBox, { justifyContent: 'space-between', flex: 1 }]}
            >
              <View style={styles.boxVoucherList}>
                <Text style={styles.orderAndaTextProductWhite}>
                  "{this.props.voucher.voucherUsed.code}"
                </Text>
              </View>
              <Text style={styles.orderAndaTextAmountGreen}>
                -{MoneyFormat(this.props.voucher.voucherUsed.amount)}
              </Text>
            </View>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.rincianPotonganHarga}>
          <Text style={styles.subTotalText}>Subtotal</Text>
          <Text style={styles.subTotalTextAmount}>
            {MoneyFormat(this.props.cart.createOrderData.untaxed_amount - this.voucher())}
          </Text>
        </View>
      </View>
    );
  };

  renderPPN() {
    return (
      <View>
        {this.props.cart.createOrderData.voucher_availability.findIndex(x => x.available === true) > - 1 ?
        <Text style={styles.subTotalTextAmount}>
        +{MoneyFormat(0.1 * (this.props.cart.createOrderData.untaxed_amount - this.voucher()))}
      </Text> :
      <Text style={styles.subTotalTextAmount}>
      +{MoneyFormat(this.props.cart.createOrderData.taxes)}
    </Text>
        }
        
      </View>
    );
  }

  renderContentSectionThree = (section, _) => {
    return (
      <View style={styles.contentSection} key={_}>
        <View style={styles.rincianHargaBox}>
          <Text style={styles.rincianHargaText}>Total Harga</Text>
          <Text style={styles.subTotalTextAmount}>
            {MoneyFormat(this.props.cart.createOrderData.gross)}
          </Text>
        </View>
        <View style={styles.rincianHargaBox}>
          <Text style={styles.rincianHargaText}>Setelah Potongan</Text>
          {this.props.cart.createOrderData.voucher_availability.length === 0 ?
          <Text style={styles.subTotalTextAmount}>
          {MoneyFormat(this.props.cart.createOrderData.gross)}
        </Text> :
        <Text style={styles.subTotalTextAmount}>
        {MoneyFormat(this.props.cart.createOrderData.untaxed_amount - this.voucher())}
      </Text>
          }
          
        </View>
        <View style={styles.rincianHargaBox}>
          <Text style={styles.rincianHargaText}>PPN 10%</Text>
          {this.props.cart.createOrderData ?
          this.props.cart.createOrderData.voucher_availability.length === 0 ?
          <Text style={styles.subTotalTextAmount}>
          +{MoneyFormat(this.props.cart.createOrderData.taxes)}
        </Text> :
        this.renderPPN() : <View />
          }
        </View>
      </View>
    );
  };

  renderHeaderOrderAnda = (section, _, isActive) => {
    return (
      <View>
        <View style={[styles.headerBox, { height: 0.07 * height }]}>
          <View style={styles.headerBoxContent}>
            <View style={{ justifyContent: 'center', paddingLeft: '5%' }}>
              <Text style={styles.headerTitle}>Order Anda</Text>
            </View>
            <View style={{ justifyContent: 'center', paddingRight: '5%' }}>
              <Ionicons
                style={styles.arrow}
                name={isActive ? 'ios-arrow-up' : 'ios-arrow-down'}
                size={0.025 * height}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderHeaderPotonganHarga = (section, _, isActive) => {
    return (
      <View>
        <View style={[styles.headerBox, { height: 0.09 * height }]}>
          <View style={styles.headerBoxContent}>
            <View style={{ justifyContent: 'center', paddingLeft: '5%' }}>
              <Text style={styles.headerTitle}>Potongan Harga</Text>
            </View>
            <View style={{ justifyContent: 'center', paddingRight: '5%' }}>
              <Ionicons
                style={styles.arrow}
                name={isActive ? 'ios-arrow-up' : 'ios-arrow-down'}
                size={0.025 * height}
              />
            </View>
          </View>
        </View>
        {!isActive ? (
          <View style={styles.potonganHargaBox}>
            <View style={styles.potonganHargaBoxAmount}>
              <Text style={styles.titlePotonganHargaBoxAmount}>
                -{MoneyFormat(this.totalDiskonPromo() + this.voucher())}
              </Text>
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  };

  renderHeaderRincianHarga = (section, _, isActive) => {
    return (
      <View>
        <View style={[styles.headerBox, { height: 0.07 * height }]}>
          <View style={styles.headerBoxContent}>
            <View style={{ justifyContent: 'center', paddingLeft: '5%' }}>
              <Text style={styles.headerTitle}>Rincian Harga</Text>
            </View>
            <View style={{ justifyContent: 'center', paddingRight: '5%' }}>
              <Ionicons
                style={styles.arrow}
                name={isActive ? 'ios-arrow-up' : 'ios-arrow-down'}
                size={0.025 * height}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Accordion
            activeSections={this.state.activeSectionsOrderAnda}
            sections={['OrderAnda']}
            touchableComponent={TouchableOpacity}
            expandMultiple
            renderHeader={this.renderHeaderOrderAnda}
            renderContent={this.renderContentSectionOne}
            duration={400}
            onChange={this.setSectionsOrderAnda}
            sectionContainerStyle={styles.section}
          />
          <Accordion
            activeSections={this.state.activeSectionsPotonganHarga}
            sections={['PotonganHarga']}
            touchableComponent={TouchableOpacity}
            expandMultiple
            renderHeader={this.renderHeaderPotonganHarga}
            renderContent={this.renderContentSectionTwo}
            duration={400}
            onChange={this.setSectionsPotonganHarga}
            sectionContainerStyle={styles.section}
          />
          <Accordion
            activeSections={this.state.activeSectionsRincianHarga}
            sections={['RincianHarga']}
            touchableComponent={TouchableOpacity}
            expandMultiple
            renderHeader={this.renderHeaderRincianHarga}
            renderContent={this.renderContentSectionThree}
            duration={400}
            onChange={this.setSectionsRincianHarga}
            sectionContainerStyle={styles.section}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0.15 * height,
    marginTop: 0.03 * height,
    flex: 1,
    backgroundColor: '#fff',
    margin: 17
  },
  headerBox: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
  },
  headerBoxContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 0.07 * height
  },
  section: {
    marginBottom: 0.01 * height,
    flex: 1,
    marginTop: '2%',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 0,
    shadowColor: '#777777',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  contentSection: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '5%'
  },
  contentSectionPotonganHarga: {
    paddingBottom: '5%'
  },
  headerTitle: {
    fontSize: RFPercentage(1.7),
    fontFamily: Fonts.MontserratSemiBold,
    color: '#333333'
  },
  potonganHargaBox: {
    marginTop: -0.03 * height,
    paddingBottom: 0.02 * height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  potonganHargaBoxAmount: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#f2f2f2'
  },
  titlePotonganHargaBoxAmount: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#3cb870'
  },
  orderAndaContentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0.01 * height
  },
  orderAndaTextProduct: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.6),
    color: '#333333'
  },
  orderAndaTextUnit: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.6),
    color: '#4f4f4f'
  },
  orderAndaTextAmount: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#333333'
  },
  orderAndaTextUnitGreen: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.6),
    color: '#3cb870'
  },
  orderAndaTextAmountGreen: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#3cb870'
  },
  subTotalBox: {
    marginTop: 0.02 * height,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  rincianHargaBox: {
    marginBottom: 0.01 * height,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  rincianPotonganHarga: {
    marginBottom: 0.01 * height,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  rincianHargaText: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.6),
    color: '#333333'
  },
  subTotalText: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(1.6),
    color: '#333333'
  },
  subTotalTextAmount: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(1.7),
    color: '#333333'
  },
  subTotalTextAmountGreen: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: RFPercentage(1.7),
    color: '#3cb870'
  },
  potonganHargaText: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.6),
    color: '#333333'
  },
  orderAndaTextProductWhite: {
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(1.6),
    color: '#ffffff'
  },
  boxVoucherList: {
    backgroundColor: '#3cb870',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 0.03 * height
  },
  bonusBoxYellow: {
    backgroundColor: '#ffde7a',
    width: '5%'
  },
  bonusBoxGreen: {
    backgroundColor: '#6fcf97',
    flex: 1,
    paddingLeft: '3%',
    paddingRight: '5%'
  },
  bonusBox: {
    width: '100%',
    height: 0.06 * height,
    marginBottom: 0.005 * height,
    flexDirection: 'row'
  },
  bonusText: {
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(1.3),
    color: '#3cb870',
    width: 0.06 * height,
    transform: [{ rotate: '270deg' }],
    marginLeft: -0.018 * height,
    marginTop: 0.022 * height,
    textAlign: 'center'
  },
  bonusTextProduct: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.5),
    color: '#ffffff'
  },
  bonusTextUnit: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.5),
    color: '#ffffff'
  },
  bonusTextAmount: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#ffffff'
  },
  bonusContentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  }
});

const mapStateToProps = ({ cart, voucher }) => {
  return { cart, voucher };
};

export default connect(
  mapStateToProps,
  { totalDiscountPromo, totalPrice, voucherDiscountPromoTotal }
)(TotalCartList);
