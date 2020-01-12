import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-elements';
// import { RFPercentage } from 'react-native-responsive-fontsize';
import ModalBottom from 'react-native-modal';
import * as ActionCreators from '../../state/actions';
import OrderButton from '../../components/OrderButton';
import { MoneyFormat } from '../../helpers/NumberFormater';
import { StatusBarRedOP50 } from '../../components/StatusBarGlobal';
import masterColor from '../../config/masterColor.json';
import GlobalStyle from '../../helpers/GlobalStyle';
import ButtonSingleSmall from '../../components/button/ButtonSingleSmall';
import Fonts from '../../helpers/GlobalFont';

const { width, height } = Dimensions.get('window');

class PdpOrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonAddDisabled: false,
      qtyFromChild: this.props.data.minQty,
      catalogueId: this.props.data.id
    };
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
  /** === CALCUATION TOTAL */
  calTotal() {
    if (this.props.data.discountedRetailBuyingPrice !== null) {
      return (
        this.props.data.discountedRetailBuyingPrice * this.state.qtyFromChild
      );
    }
    return this.props.data.retailBuyingPrice * this.state.qtyFromChild;
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
  /** RENDER BUTTON ORDER */
  renderButtonOrder() {
    return (
      <View style={styles.boxPesan}>
        <OrderButton
          item={this.props.data}
          onRef={ref => (this.parentFunctionFromOrderButton = ref)}
          parentFunctionFromOrderButton={this.parentFunctionFromOrderButton.bind(
            this
          )}
          onFocus={() => this.setState({ buttonAddDisabled: true })}
          onBlur={() => this.setState({ buttonAddDisabled: false })}
        />
      </View>
    );
  }
  /** RENDER BUTTON */
  renderButton() {
    return (
      <ButtonSingleSmall
        disabled={this.state.buttonAddDisabled}
        title={'Tambah ke Keranjang'}
        borderRadius={4}
        onPress={() => {
          this.props.omsAddToCart({
            method: 'add',
            catalogueId: this.state.catalogueId,
            qty: this.state.qtyFromChild
          });
          this.props.parentFunction({ type: 'addProduct' });
        }}
      />
    );
  }
  /** RENDER TOTAL */
  renderTotal() {
    return (
      <View style={[styles.boxTotalPrice, GlobalStyle.shadowForBox10]}>
        <View style={{ flex: 1 }}>{this.renderBottomValue()}</View>
        <View style={{ flex: 1 }}>{this.renderButton()}</View>
      </View>
    );
  }
  /** RENDER DATA */
  renderData() {
    return (
      <View style={styles.boxItem}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={[
              GlobalStyle.shadowForBox,
              { backgroundColor: masterColor.backgroudWhite }
            ]}
          >
            <Image
              defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
              source={{
                uri: this.props.data.catalogueImages[0].imageUrl
              }}
              style={GlobalStyle.image65}
            />
          </View>
          <View style={{ paddingLeft: 16 }}>
            <View style={{ width: '80%', marginBottom: 5 }}>
              <Text style={Fonts.type10}>{this.props.data.name}</Text>
            </View>
            <Text style={Fonts.type70}>
              {MoneyFormat(
                this.props.data.discountedRetailBuyingPrice !== null
                  ? this.props.data.discountedRetailBuyingPrice
                  : this.props.data.retailBuyingPrice
              )}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={[Fonts.type38, { marginRight: 10 }]}>
                per-Dus {this.props.data.packagedQty} pcs
              </Text>
              <View
                style={{
                  borderRightWidth: 1,
                  borderRightColor: masterColor.fontBlack40
                }}
              />
              <Text style={[Fonts.type38, { marginLeft: 10 }]}>
                min.pembelian {this.props.data.minQty} pcs
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            paddingTop: 25
          }}
        >
          <View style={{ justifyContent: 'center' }}>
            <Text style={Fonts.type10}>Jumlah/pcs</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={Fonts.type38}>
                Tersisa {this.props.data.stock} pcs
              </Text>
            </View>
            {this.renderButtonOrder()}
          </View>
        </View>
      </View>
    );
  }
  /** MAIN */
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRedOP50 />
        {this.renderData()}
        {this.renderTotal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroudWhite
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
  boxPesan: {
    flexDirection: 'row',
    width: '55%'
  },
  productImage: {
    resizeMode: 'contain',
    height: '100%',
    width: undefined,
    aspectRatio: 1 / 1
  }
});

const mapStateToProps = ({ pdp, oms }) => {
  return { pdp, oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PdpOrderView);

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
