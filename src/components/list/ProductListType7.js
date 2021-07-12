/**
 * this product list for history order
 */
import {
  React,
  Component,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import {
  MaterialIcon,
  connect,
  bindActionCreators
} from '../../library/thirdPartyPackage';
import * as ActionCreators from '../../state/actions';
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor.json';

class ProductListType7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultShowProduct: 2,
      showMore: false,
      totalSku: 0
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    let totalSku = 0;
    this.props.data.forEach(item => {
      totalSku++;
    });
    this.setState({ totalSku });
  }
  /** GO TO PDP DETAIL */
  goToDetail(pdpId) {
    this.props.pdpGetDetailProcess(pdpId);
    NavigationService.navigate('PdpDetailView');
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** ITEM LIST PRODUCT */
  renderListProductItem(item) {
    return (
      <View style={[GlobalStyle.shadowForBox5, styles.boxListProductItem]}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 16,
            flexDirection: 'row'
          }}
        >
          <View>
            <Image
              defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
              source={{
                uri: item.catalogueImagesUrl
              }}
              style={[GlobalStyle.image60, { borderRadius: 5 }]}
            />
          </View>
          <View
            style={{ justifyContent: 'space-between', flex: 1, paddingLeft: 8 }}
          >
            <Text style={Fonts.type10}>{item.catalogueName}</Text>
            <Text style={Fonts.type10}>
              {this.props.type === 'Bonus'
                ? MoneyFormat(0)
                : MoneyFormat(item.cataloguePrice)}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              width: '20%',
              alignItems: 'flex-end'
            }}
          >
            <Text style={Fonts.type10}>{item.catalogueQty} Pcs</Text>
          </View>
        </View>
        <View style={GlobalStyle.lines} />
        <View style={styles.boxButtonAndPriceTotal}>
          <Text style={Fonts.type10}>
            Total Harga:{' '}
            {this.props.type === 'Bonus'
              ? MoneyFormat(0)
              : MoneyFormat(item.catalogueTotalPrice)}
          </Text>
        </View>
      </View>
    );
  }
  /** ITEM LIST PRODUCT CLICKABLE*/
  renderListProductItemClickable(item) {
    return (
      <View style={[GlobalStyle.shadowForBox5, styles.boxListProductItem]}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 16,
            flexDirection: 'row'
          }}
        >
          <View>
            <TouchableOpacity onPress={() => this.goToDetail(item.id)}>
              <Image
                defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
                source={{
                  uri: item.catalogueImagesUrl
                }}
                style={[GlobalStyle.image60, { borderRadius: 5 }]}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ justifyContent: 'space-between', flex: 1, paddingLeft: 8 }}
          >
            <TouchableOpacity onPress={() => this.goToDetail(item.id)}>
              <Text style={Fonts.type10}>{item.catalogueName}</Text>
            </TouchableOpacity>
            <Text style={Fonts.type10}>
              {this.props.type === 'Bonus'
                ? MoneyFormat(0)
                : MoneyFormat(item.cataloguePrice)}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              width: '20%',
              alignItems: 'flex-end'
            }}
          >
            <Text style={Fonts.type10}>{item.catalogueQty} Pcs</Text>
          </View>
        </View>
        <View style={GlobalStyle.lines} />
        <View style={styles.boxButtonAndPriceTotal}>
          <Text style={Fonts.type10}>
            Total Harga:{' '}
            {this.props.type === 'Bonus'
              ? MoneyFormat(0)
              : MoneyFormat(item.catalogueTotalPrice)}
          </Text>
        </View>
      </View>
    );
  }
  /** ITEM LIST PRODUCT FULL */
  renderListProductContentFull(item, index) {
    return (
      <View key={index}>
        {this.props.clickable
          ? this.renderListProductItemClickable(item)
          : this.renderListProductItem(item)}
      </View>
    );
  }
  /** ITEM LIST PRODUCT LIMIT */
  renderListProductContentLimit(item, index, indexCounter) {
    return indexCounter <= this.state.defaultShowProduct ? (
      <View key={index}>
        {this.props.clickable
          ? this.renderListProductItemClickable(item)
          : this.renderListProductItem(item)}
      </View>
    ) : (
      <View key={index} />
    );
  }
  /** CONTENT LIST PRODUCT */
  renderListProductContent(itemProduct, index, indexCounter) {
    return this.state.showMore
      ? this.renderListProductContentFull(itemProduct, index)
      : this.renderListProductContentLimit(itemProduct, index, indexCounter++);
  }
  /** LIST ALL PRODUCT */
  renderListProduct(itemBrand, indexCounter) {
    return itemBrand.map((item, index) => {
      indexCounter++;
      return (
        <View key={index}>
          {this.renderListProductContent(item, index, indexCounter)}
        </View>
      );
    });
  }
  /** RENDER SEE MOTE */
  renderButtonSeeMore() {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ showMore: !this.state.showMore })}
      >
        {this.state.showMore ? (
          <View style={styles.boxSeeMore}>
            <MaterialIcon name="keyboard-arrow-up" size={24} />
            <Text style={Fonts.type10}>Lihat Ringkas</Text>
          </View>
        ) : (
          <View style={styles.boxSeeMore}>
            <MaterialIcon name="keyboard-arrow-down" size={24} />
            <Text style={Fonts.type10}>Lihat Lebih</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
  /** MAIN */
  render() {
    return (
      <View style={styles.boxListProduct}>
        {this.renderListProduct(this.props.data, 0)}
        {this.state.totalSku > 2 ? this.renderButtonSeeMore() : <View />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxListProduct: {
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  boxSeeMore: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxListProductItem: {
    paddingVertical: 16,
    marginBottom: 8,
    borderRadius: 4
  },
  boxButtonAndPriceTotal: {
    paddingHorizontal: 10,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonWhite: {
    backgroundColor: masterColor.backgroundWhite,
    borderWidth: 1,
    borderColor: masterColor.mainColor,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 4
  }
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};
export default connect(
  null,
  mapDispatchToProps
)(ProductListType7);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: tatas
 * updatedDate: 24062020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
