import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  height
} from '../../library/reactPackage';
import {
  ModalBottomType1,
  StatusBarRedOP50,
  ButtonSingleSmall
} from '../../library/component';
import {
  connect,
  MaterialCommunityIcons
} from '../../library/thirdPartyPackage';
import { Fonts, GlobalStyle } from '../../helpers';
import masterColor from '../../config/masterColor.json';

class ModalBottomErrorPromo extends Component {
  constructor(props) {
    super(props);
  }

  renderContent() {
    return (
      <View style={styles.modalContainer}>
        <StatusBarRedOP50 />
        <View style={styles.modalText}>
          <Text style={Fonts.type17}>
            Maaf, promo berikut sudah tidak lagi tersedia
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollArea}
        >
          {this.renderErrorsPromoList()}
          {this.renderErrorsBonusList()}
        </ScrollView>
        <View style={{ marginBottom: 16, marginTop: 16 }}>
          <ButtonSingleSmall
            title={'Lanjut Ke Pembayaran'}
            borderRadius={4}
            onPress={this.props.proceedToCheckout}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <ButtonSingleSmall
            white
            title={'Kembali Ke Keranjang'}
            borderRadius={4}
            onPress={this.props.backToCart}
          />
        </View>
      </View>
    );
  }

  renderErrorsPromoList() {
    return (
      <View>
        <View style={styles.errorPromoHeaderContainer}>
          <Text style={Fonts.type16}>Potongan Harga</Text>
          <MaterialCommunityIcons
            color={masterColor.mainColor}
            name={'close-circle'}
            size={24}
          />
        </View>
        {this.renderErrorsPromoItem(
          this.props.oms.errorOmsGetCheckoutItem.data.error.promoSku
        )}
      </View>
    );
  }

  renderErrorsPromoItem(promoSku) {
    return promoSku.map((item, index) => {
      return (
        <View key={index} style={styles.errorPromoItemContainer}>
          <View>
            <Image
              source={{
                uri: item.catalogueImages
              }}
              style={GlobalStyle.image77Contain}
            />
          </View>
          <View style={styles.errorPromoItemRightSection}>
            <Text style={[Fonts.type16, { marginBottom: 8 }]}>{item.name}</Text>
            {this.renderErrorsMessageItem(item.listPromo)}
          </View>
        </View>
      );
    });
  }

  renderErrorsBonusList() {
    return (
      <View>
        <View style={styles.errorPromoHeaderContainer}>
          <Text style={Fonts.type16}>Bonus SKU</Text>
          <MaterialCommunityIcons
            color={masterColor.mainColor}
            name={'close-circle'}
            size={24}
          />
        </View>
        {this.renderErrorsBonusItem(
          this.props.oms.errorOmsGetCheckoutItem.data.error.bonusSku
        )}
      </View>
    );
  }

  renderErrorsBonusItem(bonusSku) {
    return bonusSku.map((item, index) => {
      return (
        <View key={index} style={styles.errorPromoItemContainer}>
          <View>
            <Image
              source={{
                uri: item.catalogueImages
              }}
              style={GlobalStyle.image77Contain}
            />
          </View>
          <View style={styles.errorPromoItemRightSection}>
            <Text style={[Fonts.type16, { marginBottom: 8 }]}>{item.name}</Text>
            <Text key={index} style={[Fonts.type29]}>
              {`${item.namePromo} Tidak Tersedia`}
            </Text>
          </View>
        </View>
      );
    });
  }

  renderErrorsMessageItem(errorMessage) {
    return errorMessage.map((item, index) => {
      const isLast = index === errorMessage.length - 1;
      return (
        <Text
          key={index}
          style={[Fonts.type29, !isLast ? { marginBottom: 8 } : {}]}
        >
          {`${item.name} Tidak Tersedia`}
        </Text>
      );
    });
  }

  render() {
    const { open, close } = this.props;
    return (
      <ModalBottomType1
        open={open}
        content={this.renderContent()}
        close={() => close()}
        title={'Promo Tidak Tersedia'}
        typeClose="cancel"
      />
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 16
  },
  modalText: {
    alignItems: 'center'
  },
  errorPromoHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  errorPromoItemContainer: {
    flexDirection: 'row',
    paddingVertical: 8
  },
  errorPromoItemRightSection: {
    flex: 1,
    marginLeft: 8
  },
  scrollArea: {
    height: 0.5 * height
  }
});

const mapStateToProps = ({ oms }) => {
  return { oms };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(ModalBottomErrorPromo);
