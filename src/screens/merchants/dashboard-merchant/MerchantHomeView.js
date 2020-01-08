import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
// import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ActionCreators from '../../../state/actions';
import GlobalStyle from '../../../helpers/GlobalStyle';
import masterColor from '../../../config/masterColor.json';
import Fonts from '../../../helpers/GlobalFont';
import { MoneyFormat } from '../../../helpers/NumberFormater';
import { StatusBarRed } from '../../../components/StatusBarGlobal';
import NavigationService from '../../../navigation/NavigationService';
import ModalBottomMerchantCheckout from './ModalBottomMerchantCheckout';

const { width, height } = Dimensions.get('window');

class MerchantHomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      modalCheckout: false
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

  componentDidMount() {
    this.props.merchantGetLastOrderProcess(
      // this.props.merchant.selectedMerchant.store.id
      1
    );
  }

  goToPdp() {
    NavigationService.navigate('PdpView');
  }

  goToCheckIn() {
    NavigationService.navigate('MerchantCheckinView');
  }

  goToCheckOut() {
    this.setState({ modalCheckout: true });
  }

  closeModalCheckout() {
    this.setState({ modalCheckout: false });
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */

  renderListProductImage(item) {
    return item.orderBrands.map((itemBrand, indexBrand) => {
      return itemBrand.orderBrandCatalogues.map(
        (itemCatalogue, indexCatalogue) => {
          return indexCatalogue < 3 ? (
            <View key={indexCatalogue} style={{ paddingHorizontal: 5 }}>
              <Image
                defaultSource={require('../../../assets/images/sinbad_image/sinbadopacity.png')}
                source={{
                  uri: itemCatalogue.catalogue.catalogueImages[0].imageUrl
                }}
                style={styles.productImage}
              />
            </View>
          ) : (
            <View key={indexCatalogue} />
          );
        }
      );
    });
  }

  renderPlusProduct() {
    return (
      <View>
        <Text style={styles.textPlusProduct}>(+3} Produk Lain)</Text>
      </View>
    );
  }

  renderItem({ item, index }) {
    return (
      <View>
        <View>
          <Text
            style={{
              fontSize: 13,
              lineHeight: 16,
              margin: 10,
              fontWeight: 'bold'
            }}
          >
            Faktur: {item.invoiceGroup.name}
          </Text>
        </View>
        <Card containerStyle={styles.cardPromo}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ marginBottom: 0.025 * height }}>
              <Text style={styles.titleCard}>Last Order</Text>
            </View>
            <View
              style={{
                width: 0.8 * width,
                height: 0.12 * height,
                backgroundColor: '#fafafa',
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'space-between'
              }}
              onPress={() =>
                this.setState({ modalProductList: true, orderPerParcel: item })
              }
            >
              <View style={{ flexDirection: 'row' }}>
                {this.renderListProductImage(item)}
              </View>
              <View style={{ justifyContent: 'center', marginRight: 10 }}>
                {this.renderPlusProduct(item)}
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}
            >
              <View style={{ justifyContent: 'space-evenly' }}>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 14,
                    color: '#52575c',
                    textAlign: 'left'
                  }}
                >
                  {item.orderCode}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 14,
                    color: '#52575c',
                    textAlign: 'left'
                  }}
                >
                  {moment(new Date(item.createdAt)).format('DD-MM-YYYY')}
                </Text>
              </View>
              <View style={{ justifyContent: 'space-evenly' }}>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 14,
                    color: '#52575c',
                    textAlign: 'right'
                  }}
                >
                  {item.parcelDetails.totalQty} Qty
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 14,
                    color: '#52575c',
                    textAlign: 'right'
                  }}
                >
                  Total: {MoneyFormat(item.parcelDetails.totalNettPrice)}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  }

  renderData() {
    return this.props.merchant.dataGetMerchantLastOrder !== null ? (
      <View>
        <Carousel
          ref={ref => (this.carousel = ref)}
          data={this.props.merchant.dataGetMerchantLastOrder.orderParcels}
          sliderWidth={1 * width}
          itemWidth={1 * width}
          renderItem={this.renderItem.bind(this)}
          onSnapToItem={index => this.setState({ activeIndex: index })}
          slideStyle={{ padding: 10 }}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          loop
          autoplay
          activeSlideAlignment={'center'}
        />
        {/* {this.pagination()} */}
      </View>
    ) : (
      <View />
    );
  }

  renderTask() {
    return (
      <Card containerStyle={{ flex: 1 }}>
        <View style={styles.containerTitle}>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text>Task List</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={{ textAlign: 'right' }}>5 / 6 Selesai</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.containerList}>
            <View style={styles.checkBox}>
              <MaterialIcons
                name="check-circle"
                color={masterColor.fontGreen50}
                size={24}
              />
            </View>
            <View style={styles.taskBox}>
              <Text style={{ textAlign: 'left' }}>Check in</Text>
            </View>
            <View style={styles.rightArrow}>
              <MaterialIcons
                name="chevron-right"
                color={masterColor.fontBlack50}
                size={24}
              />
            </View>
          </View>
          <View style={styles.containerList}>
            <View style={styles.checkBox}>
              <MaterialIcons
                name="check-circle"
                color={masterColor.fontGreen50}
                size={24}
              />
            </View>
            <View style={styles.taskBox}>
              <Text style={{ textAlign: 'left' }}>Order</Text>
            </View>
            <View style={styles.rightArrow}>
              <MaterialIcons
                name="chevron-right"
                color={masterColor.fontBlack50}
                size={24}
              />
            </View>
          </View>
          <View style={styles.containerList}>
            <View style={styles.checkBox}>
              <MaterialIcons
                name="check-circle"
                color={masterColor.fontGreen50}
                size={24}
              />
            </View>
            <View style={styles.taskBox}>
              <Text style={{ textAlign: 'left' }}>Check Out</Text>
            </View>
            <View style={styles.rightArrow}>
              <MaterialIcons
                name="chevron-right"
                color={masterColor.fontBlack50}
                size={24}
              />
            </View>
          </View>
        </View>
      </Card>
    );
  }

  renderStoreMenu() {
    return (
      <View style={{ padding: 15 }}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Store Menu</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.wrapMenu}
            onPress={() => this.goToPdp()}
          >
            <View style={styles.boxMenu} />
            <Text style={{ color: '#25282b', fontSize: 12, lineHeight: 15 }}>
              Order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapMenu}
            onPress={() => this.goToCheckIn()}
          >
            <View style={styles.boxMenu} />
            <Text style={{ color: '#25282b', fontSize: 12, lineHeight: 15 }}>
              Check In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapMenu}
            onPress={() => this.goToCheckOut()}
          >
            <View style={styles.boxMenu} />
            <Text style={{ color: '#25282b', fontSize: 12, lineHeight: 15 }}>
              Check Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    let storeName = '';
    if (navigation.state.params) {
      if (navigation.state.params.storeName.length >= 21) {
        storeName = navigation.state.params.storeName.substring(0, 21) + '...';
      } else {
        storeName = navigation.state.params.storeName;
      }
    }

    return {
      headerTitle: () => (
        <View>
          <Text style={Fonts.type35}>{storeName}</Text>
        </View>
      )
    };
  };

  /** MAIN */
  render() {
    return !this.props.merchant.loadingGetMerchantLastOrder ? (
      <ScrollView style={styles.mainContainer}>
        <StatusBarRed />
        {this.renderData()}
        {this.renderTask()}
        {this.renderStoreMenu()}
        <ModalBottomMerchantCheckout
          open={this.state.modalCheckout}
          close={() => this.closeModalCheckout()}
        />
      </ScrollView>
    ) : (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  containerSlider: {
    flex: 1,
    paddingBottom: 5
  },
  inactiveDot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: 'rgba(51,51,51, 0.2)'
  },
  activeDot: {
    width: 20,
    height: 6,
    borderRadius: 5,
    backgroundColor: 'red'
  },
  // CARD
  cardPromo: {
    borderRadius: 15,
    borderWidth: 0,
    height: 0.31 * height,
    width: 0.9 * width,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#777777',
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignItems: 'flex-start',
    marginLeft: 0.015 * width,
    marginTop: 2,
    marginRight: 0.03 * width
  },
  productImage: {
    resizeMode: 'contain',
    width: 57,
    height: undefined,
    aspectRatio: 1 / 1
  },
  textPlusProduct: {
    color: '#333333',
    fontSize: RFPercentage(1.3),
    fontFamily: Fonts.MontserratMedium
  },
  // SEMENTARA
  cardTask: {
    flex: 1,
    flexDirection: 'column',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#777777',
    shadowOpacity: 0.22,
    shadowRadius: 2.22
  },
  containerTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 0.1 * width
  },
  containerList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10
  },
  checkBox: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  taskBox: {
    flex: 2,
    justifyContent: 'center'
  },
  rightArrow: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  wrapMenu: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxMenu: {
    height: 50,
    width: 70,
    backgroundColor: '#fafafa'
  }
});

const mapStateToProps = ({ auth, merchant }) => {
  return { auth, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MerchantHomeView);
