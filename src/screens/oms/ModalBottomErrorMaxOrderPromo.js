import {
  React,
  Component,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  height
} from '../../library/reactPackage';
import { connect, bindActionCreators } from '../../library/thirdPartyPackage';
import { ModalBottomType1, StatusBarRedOP50 } from '../../library/component';
import { GlobalStyle, Fonts } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';

class ModalBottomErrorMaxOrderPromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalBlockPromo: this.props.openModalBlockPromo
    };
  }

  backToCartItemView() {
    // navigate to cart item view
    NavigationService.navigate('OmsCartView');
    // re-fetch the cart
    this.props.omsGetCartItemFromCheckoutProcess({
      catalogues: this.props.oms.dataCart
    });
  }

  /** === ON CLOSE MODAL BLOCK PROMO === */
  onCloseModalBlockPromo() {
    this.setState({ openModalBlockPromo: false });
    this.backToCartItemView();
  }

  /** === RENDER ITEM === */
  renderItems() {
    return this.props.oms.errorOmsGetCheckoutItem.data.blockPromo.map(
      (item, index) => {
        const isLast =
          index ===
          this.props.oms.errorOmsGetCheckoutItem.data.blockPromo.length - 1;
        return (
          <View
            key={index}
            style={[
              styles.contentItemContainer,
              !isLast ? styles.itemSeparator : {}
            ]}
          >
            <Image
              defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
              source={{
                uri: item.catalogueImage
              }}
              style={GlobalStyle.image77Contain}
            />
            <View style={styles.itemDetailsContainer}>
              <Text style={Fonts.type16}>{item.catalogueName}</Text>
              <View style={styles.itemChangesContainer}>
                <Text style={Fonts.type29}>
                  {item.orderQty || item.benefitQty} Pcs
                </Text>
                <Image
                  source={require('../../assets/icons/global/arrow_right.png')}
                  style={styles.arrowIcon}
                />
                <Text style={Fonts.type29}>
                  {item.catalogueMaxOrderQty} Pcs
                </Text>
              </View>
            </View>
          </View>
        );
      }
    );
  }
  /** === RENDER BLOCK PROMO CONTENT === */
  renderBlockPromoContent() {
    return this.state.openModalBlockPromo ? (
      <View style={styles.container}>
        <StatusBarRedOP50 />
        <View style={styles.modalDescriptionContainer}>
          <Text style={[Fonts.type59, styles.modalDescriptionText]}>
            Beberapa produk di bawah ini telah mengalami perubahan ketentuan
            batas pembelian dan mempengaruhi pendapatan promo anda. Mohon tinjau
            ulang keranjang dan coba lagi.
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={[Fonts.type48, { marginBottom: 8 }]}>
            Perubahan ketentuan batas pembelian
          </Text>
          <ScrollView style={styles.scrollViewContiner}>
            {this.renderItems()}
          </ScrollView>
        </View>
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER MODAL BLOCK PROMO === */
  renderModalBlockPromo() {
    return (
      <ModalBottomType1
        open={this.state.openModalBlockPromo}
        onPress={() => this.onCloseModalBlockPromo()}
        title={'Konfirmasi batas pembelian'}
        buttonTitle={'Tinjau Keranjang'}
        content={this.renderBlockPromoContent()}
      />
    );
  }
  /** === MAIN === */
  render() {
    return <>{this.renderModalBlockPromo()}</>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    width: '100%'
  },
  contentContainer: {
    paddingHorizontal: 16
  },
  contentItemContainer: {
    flexDirection: 'row',
    paddingVertical: 16
  },
  itemSeparator: {
    borderBottomColor: masterColor.fontBlack10,
    borderBottomWidth: 1
  },
  itemDetailsContainer: {
    marginLeft: 8,
    width: '60%'
  },
  itemChangesContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center'
  },
  arrowIcon: {
    height: 18,
    width: 18,
    marginHorizontal: 5
  },
  modalDescriptionContainer: {
    alignItems: 'center'
  },
  modalDescriptionText: {
    textAlign: 'center',
    marginHorizontal: 40,
    marginTop: 4,
    marginBottom: 16
  },
  scrollViewContiner: {
    maxHeight: height * 0.5
  }
});

const mapStateToProps = ({ oms, permanent }) => {
  return { oms, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ModalBottomErrorMaxOrderPromo);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: ryan
 * createdDate:
 * updatedBy:
 * updatedDate: 01042021
 * updatedFunction:
 */
