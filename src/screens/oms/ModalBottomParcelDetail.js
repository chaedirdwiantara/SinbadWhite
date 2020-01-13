import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Fonts from '../../utils/Fonts';
import { MoneyFormat } from '../../helpers/NumberFormater';
import ModalBottomType4 from '../../components/modal_bottom/ModalBottomType4';
import { StatusBarRedOP50 } from '../../components/StatusBarGlobal';

const { height } = Dimensions.get('window');

class ModalBottomParcelDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      openTotal: false
    };
  }

  renderOpenTotal() {
    return (
      <View style={styles.boxOpenTotal}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={styles.productText}>Total Produk</Text>
          </View>
          <View>
            <Text style={styles.productText}>
              {MoneyFormat(this.state.data.parcelDetails.totalGrossPrice)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={styles.productText}>PPN 10%</Text>
          </View>
          <View>
            <Text style={styles.productText}>
              {MoneyFormat(this.state.data.parcelDetails.tax)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderTotal() {
    return (
      <TouchableOpacity
        style={styles.boxTotal}
        onPress={() => this.setState({ openTotal: !this.state.openTotal })}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.state.openTotal ? (
            <Icons name="keyboard-arrow-up" size={24} />
          ) : (
            <Icons name="keyboard-arrow-down" size={24} />
          )}

          <Text style={[styles.title, { marginLeft: 5 }]}>Total</Text>
        </View>
        <View>
          <Text style={styles.title}>
            {MoneyFormat(this.state.data.parcelDetails.totalNettPrice)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderProductListContent(brand) {
    return brand.orderBrandCatalogues.map((item, index) => {
      return (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.productText}>
              {item.catalogue.name} ({item.qty}pcs)
            </Text>
          </View>
          <View style={{ width: '40%', alignItems: 'flex-end' }}>
            <Text style={styles.productText}>
              {MoneyFormat(item.grossPrice)}
            </Text>
          </View>
        </View>
      );
    });
  }

  renderProductList() {
    return this.state.data.orderBrands.map((item, index) => {
      return <View key={index}>{this.renderProductListContent(item)}</View>;
    });
  }

  renderProduct() {
    return (
      <View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.title}>Produk</Text>
        </View>
        <View style={styles.lines} />
        <View>{this.renderProductList()}</View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginTop: 10,
            marginBottom: 20
          }}
        >
          <View>
            <Text style={styles.subTotalText}>Total Order</Text>
          </View>
          <View>
            <Text style={styles.subTotalText}>
              {MoneyFormat(this.state.data.parcelDetails.totalGrossPrice)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderData() {
    return (
      <View>
        {this.renderProduct()}
        {this.state.openTotal ? this.renderOpenTotal() : <View />}
        {this.renderTotal()}
      </View>
    );
  }

  renderContent() {
    return (
      <View>
        <StatusBarRedOP50 />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <ScrollView>{this.renderData()}</ScrollView>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ModalBottomType4
        typeClose={'cancel'}
        title={'Detail Pesanan'}
        open={this.props.open}
        close={this.props.close}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 0.9 * height,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingBottom: 0.01 * height
  },
  modalPosition: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  boxTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'rgba(103, 186, 237, 0.1)'
  },
  boxOpenTotal: {
    paddingLeft: 40,
    paddingRight: 10,
    paddingTop: 5,
    backgroundColor: 'rgba(103, 186, 237, 0.1)'
  },
  contentContainer: {
    flex: 1
  },
  lines: {
    marginLeft: 10,
    borderTopWidth: 1,
    marginVertical: 10,
    borderColor: '#f2f2f2'
  },
  /** text */
  productText: {
    color: '#333333',
    fontSize: RFPercentage(1.5),
    fontFamily: Fonts.MontserratMedium,
    lineHeight: 14,
    marginBottom: 5
  },
  subTotalText: {
    color: '#4f4f4f',
    fontSize: RFPercentage(1.5),
    fontFamily: Fonts.MontserratBold
  },
  title: {
    color: '#333333',
    fontSize: RFPercentage(2),
    fontFamily: Fonts.MontserratBold
  },

  /** for button */
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ffffff'
  },
  titleButton: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 13,
    color: '#ffffff'
  },
  button: {
    backgroundColor: '#f0444c',
    borderRadius: 10,
    width: 282,
    height: 41
  },
  /**close */
  titleModalBottom: {
    marginTop: 0.03 * height,
    marginBottom: 0.03 * height,
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(2),
    color: '#333333'
  },
  closeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    width: '15%',
    height: '100%'
  },
  icons: {
    width: 24,
    height: 24
  }
});

export default ModalBottomParcelDetail;
