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
import * as ActionCreators from '../../state/actions';

class ModalBottomErrorMaxOrder extends Component {
  /** === RENDER ITEMS === */
  renderItems() {
    return this.props.oms.errorOmsGetCheckoutItem.data.catalogues.map(
      (item, index) => {
        const isLast =
          index ===
          this.props.oms.errorOmsGetCheckoutItem.data.catalogues.length - 1;
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
                uri: item.catalogueImages.imageUrl
              }}
              style={GlobalStyle.image77Contain}
            />
            <View style={styles.itemDetailsContainer}>
              <Text style={Fonts.type16}>{item.name}</Text>
              <View style={styles.itemChangesContainer}>
                <Text style={Fonts.type29}>{item.currentQty} Pcs</Text>
                <Image
                  source={require('../../assets/icons/global/arrow_right.png')}
                  style={styles.arrowIcon}
                />
                <Text style={Fonts.type29}>{item.maxQty} Pcs</Text>
              </View>
            </View>
          </View>
        );
      }
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.container}>
        <StatusBarRedOP50 />
        <View style={styles.modalDescriptionContainer}>
          <Text style={[Fonts.type59, styles.modalDescriptionText]}>
            Beberapa produk di bawah ini telah mengalami perubahan ketentuan
            batas pembelian. Mohon tinjau ulang keranjang anda dan coba lagi.
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={[Fonts.type48, { marginBottom: 8 }]}>
            Perubahan ketentuan batas pembelian
          </Text>
          <ScrollView style={styles.scrollViewContainer}>
            {this.renderItems()}
          </ScrollView>
        </View>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <>
        <ModalBottomType1
          open={this.props.open}
          onPress={() => this.props.close()}
          title={'Konfirmasi batas pembelian'}
          buttonTitle={'Tinjau Keranjang'}
          content={this.renderContent()}
        />
      </>
    );
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
  scrollViewContainer: {
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
export default connect(mapStateToProps, mapDispatchToProps)(ModalBottomErrorMaxOrder);

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
