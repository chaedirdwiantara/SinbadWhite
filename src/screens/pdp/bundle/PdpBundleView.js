import {
  React,
  Component,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions
} from '../../../library/reactPackage'
import {
  connect,
  bindActionCreators,
  Tooltip,
  MaterialIcon
} from '../../../library/thirdPartyPackage'
import {
  CartGlobal,
  StatusBarRed,
  ButtonSingle,
  OrderButton
} from '../../../library/component'
import { Fonts, GlobalStyle, MoneyFormat, NumberFormat } from '../../../helpers'
import * as ActionCreators from '../../../state/actions'
import NavigationService from '../../../navigation/NavigationService'
import { Color } from '../../../config'

const { width, height } = Dimensions.get('window');

class PdpBundleView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skuEmpty: true,
      questionMarkShow: true,
      qtyFromChild:
        this.props.pdp.dataDetailPdp !== null
          ? this.props.pdp.dataDetailPdp.minQty
          : 0
    }
  }
  /**
   * ====================
   * HEADER CONFIG
   * ====================
   */
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <View>
          <Text style={Fonts.type35}>Bundle</Text>
        </View>
      ),
      headerRight: () => {
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 16, marginLeft: 12 }}>
            <CartGlobal />
          </View>
        </View>
      }
    }
  }
  /**
   * ====================
   * FUNCTIONAL SECTION
   * ====================
   */
  /**
   * BUTTON TITLE
   */
  buttonTitle(){
    if (this.state.skuEmpty) return 'Stock Habis'
    return 'Tambah ke Kranjang'
  }

  /**
   * BUTTON DISABLED
   */
  buttonDisabled(){
    if (this.state.skuEmpty) return true
    return false
  }

   /** === CHECK INPUT QTY SECTION === */
   checkInputQtySection() {
    if (!this.props.pdp.dataDetailPdp.warehouseCatalogues[0].unlimitedStock) {
      if (
        this.props.pdp.dataDetailPdp.warehouseCatalogues[0].stock >
        this.props.pdp.dataDetailPdp.minQty
      ) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  }

   /** === RENDER TERSISA TEXT === */
   renderRemainingStock() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={Fonts.type22}>{this.checkTersisa()}</Text>
      </View>
    );
  }

  checkTersisa() {
    if (
      !this.props.pdp.dataDetailPdp.warehouseCatalogues[0].unlimitedStock &&
      this.props.pdp.dataDetailPdp.warehouseCatalogues[0].stock >
        this.props.pdp.dataDetailPdp.minQty
    ) {
      return `Tersisa ${NumberFormat(
        this.props.pdp.dataDetailPdp.warehouseCatalogues[0].stock
      )} Pcs`;
    }
    return '';
  }

  parentFunctionFromOrderButton(data) {
    /** NOTE 1 */
    this.setState({
      qtyFromChild: data.qty
    });
  }

  /**
   * ===============
   * VIEW SECTION
   * ===============
   */

   /**
    * ================
    * PROMO HIGHLIGHT
    * ================
    */
  renderPromoHighlight(){
    return (
      <View>
        <View style={styles.highlightStyle} > 
          <View style={styles.iconHighlight}>
              <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white', opacity: 1}}>!</Text>
            </View>
        </View>
        <View style={{ flex: 1, marginVertical: 8, flexDirection: 'row' }}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 9}}>
          <Text style={[Fonts.type16, {marginLeft: 8}]}>Tambahkan produk terkait untuk mendapatkan bundle promosi !</Text>
        </View>          
        </View>
      </View>      
    )
  }

  /**
   * ===================
   * BUTTON ADD TO CART
   * ===================
   */
  renderBottomButton(){
    return(
      <ButtonSingle
        title={this.buttonTitle()}
        borderRadius={4}
        disabled={this.buttonDisabled()}
        disabledGrey
      />
    )
  }

  /** === RENDER TOOLTIP === */
  renderTooltip() {
    return (
      <Tooltip
        backgroundColor={Color.fontBlack50OP80}
        height={55}
        withOverlay={false}
        withPointer={false}
        onOpen={() => this.setState({ questionMarkShow: false })}
        onClose={() => this.setState({ questionMarkShow: true })}
        containerStyle={{
          padding: 8,
          width: 0.4 * width
        }}
        popover={
          <Text style={Fonts.type87}>
            Harga ini mungkin berubah mempertimbangkan lokasi gudang
          </Text>
        }
      >
        {this.state.questionMarkShow ? (
          <MaterialIcon name="help" size={18} color={Color.fontBlack40} />
        ) : (
          <View />
        )}
      </Tooltip>
    );
  }

    /** === RENDER BUTTON ORDER === */
    renderButtonOrder() {
      return (
        <View style={styles.boxPesan}>
          <OrderButton
            disabledAllButton={this.state.showKeyboard}
            item={this.props.pdp.dataDetailPdp}
            onRef={ref => (this.parentFunctionFromOrderButton = ref)}
            parentFunctionFromOrderButton={this.parentFunctionFromOrderButton.bind(
              this
            )}
            onFocus={() => this.setState({ buttonAddDisabled: true })}
            onBlur={() => this.setState({ buttonAddDisabled: false })}
          />
        </View>
      );
    }


  /**
   * ===================
   * RENDER DATA
   * ===================
   */
  renderData(){
    return(
      <View style={styles.boxItem}>
        <View style={{ flexDirection: 'row', paddingBottom: 25}}>
          <View style={{ backgroundColor: Color.backgroundWhite}}>
            <Image 
              defaultSource={require('../../../assets/images/sinbad_image/sinbadopacity.png')}
              source={{
                uri: this.props.pdp.dataDetailPdp.catalogueImages[0].imageUrl
              }}
              style={GlobalStyle.image100ContainRadius8}
            />
          </View>
          <View style={{ paddingLeft: 16}}>
            <View style={{ width: '80%', marginBottom: 5 }}>
              <Text style={Fonts.type10}>
                {this.props.pdp.dataDetailPdp.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[Fonts.type70, { marginRight: 10 }]}>
                {MoneyFormat(this.props.pdp.dataDetailPdp.warehousePrice)}
              </Text>
              {this.renderTooltip()}
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={[Fonts.type38, { marginRight: 10}]}>
                per-Dus {this.props.pdp.dataDetailPdp.packagedQty}{' '}{ this.props.pdp.dataDetailPdp.catalogueUnit.unit}
              </Text>
              <View style={{
                borderRightWidth: 1,
                borderRightColor: Color.fontBlack40
              }} />
              <Text style={[ Fonts.type38, { marginLeft: 10 }]}>
                min.pembelian {this.props.pdp.dataDetailPdp.minQty}{' '}{this.props.pdp.dataDetailPdp.catalogueUnit.unit}
              </Text>
            </View>
          </View>
        </View>

        {this.checkInputQtySection() ? (
          <View style={styles.boxInputQty}>
            <View style={{ justifyContent: 'center' }}>
              <Text style={Fonts.type96}>Jumlah/pcs</Text>
            </View>
            <View style={styles.boxRemainingStockOrderButton}>
              {this.renderRemainingStock()}
              {this.renderButtonOrder()}
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    )
  }

    
  /**
   * ===================
   * DETAIL SKU
   * ===================
   */
  renderDetailSKU(){
    return(
      <View>
        <Text>Detail SKU</Text>
      </View>
    )
  }

  /**
   * =================
   * RENDER CONTENT
   * =================
   */
  renderContent() {
    return(
      <View style={{ flex: 1}}>
        {this.renderPromoHighlight()}
        {this.renderData()}
      </View>
    )
  }


  /**
   * ====================
   * MAIN RENDER
   * ====================
   */
  render(){
    return(
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarRed />
        <ScrollView>
          {this.renderContent()}
        </ScrollView>
        {/* Render Bottom Button */}
        {this.renderBottomButton()}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  iconHighlight: {
    marginTop: -10,
    marginLeft: -10, 
    width: 45, 
    height: 45, 
    borderRadius: 100, 
    backgroundColor: Color.fontYellow40, 
    opacity: 0.6,
    alignContent: 'center',
    alignItems: 'center'
  },
  highlightStyle: { 
    backgroundColor: Color.fontYellow40, 
    opacity: 0.4, 
    flexDirection: 'row', 
    height: 47, 
    width: '100%', 
    position: 'absolute'
  },
  boxItem: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10
  },
  boxInputQty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  boxRemainingStockOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  boxPesan: {
    marginLeft: 5,
    flexDirection: 'row',
    width: '55%'
  }
})

const mapStateToProps = ({ pdp }) => {
  return { pdp }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PdpBundleView)

/**
 * ==============
 * NOTEs
 * ==============
 * 
 * createdBy: Tatas
 * createdDate: 28092020
 * 
 */