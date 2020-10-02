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
  ModalBottomType4,
  StatusBarRedOP50,
  ButtonSingleSmall
} from '../../library/component';
import { MaterialCommunityIcons } from '../../library/thirdPartyPackage';
import { Fonts, GlobalStyle } from '../../helpers';
import masterColor from '../../config/masterColor.json';

const dummies = {
  promoSku: [
    {
      catalogueImages:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115822.png',
      name: 'LAKME SKIN BRIGHTENING COMPACT',
      errors: [
        {
          message: 'Promo potongan harga Rp500 Lakme sudah Tidak Tersedia'
        },
        {
          message: 'Potongan Promo Lakme 01 Eyebrow Rp200 Tidak Tersedia'
        }
      ]
    },
    {
      catalogueImages:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115822.png',
      name: 'LAKME EYESHADOW CRAYON BRONZE',
      errors: [
        {
          message: 'Promo potongan harga Rp500 Lakme sudah Tidak Tersedia'
        }
      ]
    }
  ],
  bonusSku: [
    {
      catalogueImages:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115822.png',
      name: 'LAKME EYESHADOW CRAYON BRONZE',
      errors: [
        {
          message: 'Promo Bonus SKU Tidak Tersedia'
        }
      ]
    },
    {
      catalogueImages:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115822.png',
      name: 'LAKME EYESHADOW CRAYON BRONZE',
      errors: [
        {
          message: 'Promo Bonus SKU Tidak Tersedia'
        }
      ]
    },
    {
      catalogueImages:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115822.png',
      name: 'LAKME EYESHADOW CRAYON BRONZE',
      errors: [
        {
          message: 'Promo Bonus SKU Tidak Tersedia'
        }
      ]
    }
  ]
};

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
          <ButtonSingleSmall title={'Lanjut Ke Pembayaran'} borderRadius={4} />
        </View>
        <View style={{ marginBottom: 16 }}>
          <ButtonSingleSmall
            white
            title={'Kembali Ke Keranjang'}
            borderRadius={4}
          />
        </View>
      </View>
    );
  }

  renderErrorsPromoList() {
    return dummies.promoSku.length > 0 ? (
      <View>
        <View style={styles.errorPromoHeaderContainer}>
          <Text style={Fonts.type16}>Potongan Harga</Text>
          <MaterialCommunityIcons
            color={masterColor.mainColor}
            name={'close-circle'}
            size={24}
          />
        </View>
        {this.renderErrorsPromoItem(dummies.promoSku)}
      </View>
    ) : (
      <View />
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
            {this.renderErrorsMessageItem(item.errors)}
          </View>
        </View>
      );
    });
  }

  renderErrorsBonusList() {
    return dummies.bonusSku.length > 0 ? (
      <View>
        <View style={styles.errorPromoHeaderContainer}>
          <Text style={Fonts.type16}>Bonus SKU</Text>
          <MaterialCommunityIcons
            color={masterColor.mainColor}
            name={'close-circle'}
            size={24}
          />
        </View>
        {this.renderErrorsBonusItem(dummies.bonusSku)}
      </View>
    ) : (
      <View />
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
            {this.renderErrorsMessageItem(item.errors)}
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
          {item.message}
        </Text>
      );
    });
  }

  render() {
    const { open, close } = this.props;
    return (
      <ModalBottomType4
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

export default ModalBottomErrorPromo;
