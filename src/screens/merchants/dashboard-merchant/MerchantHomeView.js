import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image
} from 'react-native';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
// import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ActionCreators from '../../../state/actions';
import GlobalStyle from '../../../helpers/GlobalStyle';
import masterColor from '../../../config/masterColor.json';
import Fonts from '../../../helpers/GlobalFont';
import { MoneyFormatShort, MoneyFormat } from '../../../helpers/NumberFormater';
import { StatusBarRed } from '../../../components/StatusBarGlobal';
import NavigationService from '../../../navigation/NavigationService';
const { width, height } = Dimensions.get('window');

class MerchantHomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      banner: [
        {
          id: 1,
          image: require('../../../assets/images/sinbad_image/loadingbanner.png')
        },
        {
          id: 2,
          image: require('../../../assets/images/sinbad_image/loadingbanner.png')
        }
      ]
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

  componentDidMount() {
    this.props.merchantGetLastOrderProcess(1);
  }

  goToPdp() {
    NavigationService.navigate('PdpView');
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */

  renderListProductImage() {
    return (
      <View style={{ paddingHorizontal: 5 }}>
        <Image
          defaultSource={require('../../../assets/images/sinbad_image/sinbadopacity.png')}
          source={{
            uri:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67126185.png'
          }}
          style={styles.productImage}
        />
      </View>
    );
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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red'
        }}
      >
        <Card containerStyle={styles.cardPromo}>
          <View style={{ height: '100%' }}>
            <View style={{ marginBottom: 0.025 * height }}>
              <Text style={styles.titleCard}>Last Order</Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                justifyContent: 'space-between'
              }}
              onPress={() =>
                this.setState({ modalProductList: true, orderPerParcel: item })
              }
            >
              <View style={{ flexDirection: 'row' }}>
                {this.renderListProductImage()}
              </View>
              <View style={{ justifyContent: 'center', marginRight: 10 }}>
                {this.renderPlusProduct()}
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }

  renderData() {
    return (
      <View>
        <Carousel
          ref={ref => (this.carousel = ref)}
          data={this.state.banner}
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
    return (
      <View style={styles.mainContainer}>
        <StatusBarRed />
        {this.renderData()}
        <TouchableOpacity onPress={() => this.goToPdp()}>
          <Text>Order</Text>
        </TouchableOpacity>
      </View>
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
    height: 0.21 * height,
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
    width: 50,
    height: undefined,
    aspectRatio: 1 / 1
  },
  textPlusProduct: {
    color: '#333333',
    fontSize: RFPercentage(1.3),
    fontFamily: Fonts.MontserratMedium
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(MerchantHomeView);
