import {
  React,
  Component,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text
} from '../../library/reactPackage'
import {
  LinearGradient
} from '../../library/thirdPartyPackage'
import { GlobalStyle, Fonts } from '../../helpers'
import masterColor from '../../config/masterColor.json';

class PdpGrid extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * =======================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER ITEM === */
  renderButton() {
    return (
      <TouchableOpacity
        onPress={this.props.onPressPesan}
        style={[styles.pesanButton, { backgroundColor: masterColor.mainColor }]}
      >
        <Text style={Fonts.type39}>Pesan</Text>
      </TouchableOpacity>
    );
  }
  /** === RENDER PROMO TAG === */
  promoTag() {
    return (
      <View style={styles.boxPromoTag}>
        <View>
          <Image
            source={require('../../assets/icons/pdp/promo-tag-left.png')}
            style={{ flex: 1, resizeMode: 'stretch' }}
          />
        </View>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          colors={[masterColor.fontGreen50, masterColor.fontGreen60]}
          style={{
            backgroundColor: masterColor.mainColor,
            paddingRight: 8,
            paddingVertical: 6,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 2
          }}
        >
          <Text style={Fonts.type94}>Promo</Text>
        </LinearGradient>
      </View>
    );
  }
  /** === RENDER ITEM === */
  renderItem() {
    const productImage = (
      <Image
        defaultSource={require('../../assets/images/sinbad_image/sinbadopacity.png')}
        source={{
          uri: this.props.image
        }}
        style={GlobalStyle.fullWidthRatioContainRadius5Image}
      />
    );

    return (
      <View style={styles.mainContent}>
        <View style={styles.boxMainContent}>
          <TouchableOpacity
            style={[GlobalStyle.shadow5, styles.cardMainContent]}
            onPress={this.props.onPress}
          >
            <View>
              {this.props.promo ? this.promoTag() : null}
              {productImage}
            </View>
            <View
              style={{ paddingHorizontal: 11, paddingVertical: 10, flex: 1 }}
            >
              <View>
                <Text style={[Fonts.type37, { textTransform: 'capitalize' }]}>
                  {this.props.name}
                </Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text style={Fonts.type11}>{this.props.price}</Text>
              </View>
              {this.props.pesanButton ? (
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 10,
                    flex: 1,
                    justifyContent: 'flex-end'
                  }}
                >
                  {this.renderButton()}
                </View>
              ) : (
                <View />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  /** === MAIN ==== */
  render() {
    return (
      <View
        style={[styles.mainContainer, { flex: this.props.flex ? 1 : null }]}
      >
        {this.renderItem()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: masterColor.backgroundWhite
  },
  mainContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  boxMainContent: {
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 5,
    width: '100%'
  },
  cardMainContent: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: masterColor.backgroundWhite
  },
  boxPromoTag: {
    width: '50%',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  /** button */
  pesanButton: {
    paddingVertical: 6,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  }
});

export default PdpGrid;
