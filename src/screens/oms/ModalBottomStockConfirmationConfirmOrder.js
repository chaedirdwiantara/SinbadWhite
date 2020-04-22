import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import Text from 'react-native-text';
import { connect } from 'react-redux';
import Fonts from '../../helpers/GlobalFont';
import ModalBottomType1 from '../../components/modal_bottom/ModalBottomType1';
import { StatusBarRedOP50 } from '../../components/StatusBarGlobal';
import masterColor from '../../config/masterColor.json';
import GlobalStyles from '../../helpers/GlobalStyle';
import ButtonSingleSmall from '../../components/button/ButtonSingleSmall';

const { height } = Dimensions.get('window');

class ModalBottomStockConfirmationConfirmOrder extends Component {
  /** === RENDER IMAGE === */
  renderImage(item) {
    return (
      <View
        style={{
          paddingRight: 16,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image
          defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
          source={{
            uri: item.catalogue.catalogueImages[0].imageUrl
          }}
          style={[GlobalStyles.image54Contain, { opacity: 0.5 }]}
        />
      </View>
    );
  }
  /** === RENDER SKU NAME === */
  renderSkuName(item) {
    return (
      <View>
        <Text
          style={[
            Fonts.type16,
            {
              opacity: item.errorCode === 'ERR-STOCK' ? 1 : 0.5,
              textTransform: 'capitalize'
            }
          ]}
        >
          {item.catalogue.name}
        </Text>
      </View>
    );
  }
  /** === RENDER SKU INFO === */
  renderSkuInfo(info) {
    return (
      <View style={{ marginTop: 8 }}>
        <Text style={[Fonts.type8, { opacity: 0.5 }]}>{info}</Text>
      </View>
    );
  }
  /** === RENDER PRODUCT TIDAK TERSEDIA === */
  renderProductErrorTidakTersedia() {
    return this.props.oms.errorOmsConfirmOrder.data.errorData.map(
      (item, index) => {
        return (
          <View style={{ flexDirection: 'row' }} key={index}>
            {this.renderImage(item)}
            <View style={styles.boxNameAndInfo}>
              {this.renderSkuName(item)}
              {this.renderSkuInfo('Produk Tidak Tersedia')}
            </View>
          </View>
        );
      }
    );
  }
  /** === RENDER PRODUCT TIDAK TERSEDIA === */
  renderProductTidakTersedia() {
    return (
      <View>
        <View style={{ paddingTop: 10, paddingLeft: 16 }}>
          <Text style={Fonts.type42}>Produk Tidak Tersedia</Text>
        </View>
        <View style={[GlobalStyles.lines, { marginTop: 8, marginLeft: 16 }]} />
        <View style={{ paddingHorizontal: 16 }}>
          {this.renderProductErrorTidakTersedia()}
        </View>
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <View style={styles.buttonContainer}>
        <View style={{ padding: 16, flex: 1 }}>
          <ButtonSingleSmall
            flex
            white
            disabled={false}
            loading={false}
            onPress={this.props.backToCart}
            title={'Tinjau Keranjang'}
            borderRadius={4}
          />
        </View>
        <View style={{ padding: 16, flex: 1 }}>
          <ButtonSingleSmall
            flex
            disabled={!this.props.oms.errorOmsConfirmOrder.data.confirmOrder}
            loading={false}
            onPress={this.props.confirmation}
            title={'Konfirmasi'}
            borderRadius={4}
          />
        </View>
      </View>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.container}>
        <StatusBarRedOP50 />
        <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
          <Text style={[Fonts.type59, { textAlign: 'center' }]}>
            Produk pada pesanan Anda telah diperbaharui Silahkan konfirmasi pada
            tampilan di bawah ini.
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <ScrollView>{this.renderProductTidakTersedia()}</ScrollView>
          {this.renderButton()}
        </View>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <ModalBottomType1
        open={this.props.open}
        title={'Konfirmasi Stock'}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 0.6 * height,
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    width: '100%'
  },
  contentContainer: {
    flex: 1
  },
  boxNameAndInfo: {
    width: '60%',
    justifyContent: 'space-between',
    paddingVertical: 13
  },
  /** for button */
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ oms }) => {
  return { oms };
};

export default connect(
  mapStateToProps,
  {}
)(ModalBottomStockConfirmationConfirmOrder);
