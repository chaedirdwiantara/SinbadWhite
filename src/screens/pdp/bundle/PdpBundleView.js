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
  OrderButton,
  ProductListType3,
  Accordion,
  LoadingPage,
  SkeletonType21,
  SkeletonType23
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
      skuEmpty: false,
      questionMarkShow: true,
      coverage: false,
      buttonAddDisabled: false,
      qtyFromChild:
        this.props.pdp.dataDetailPdp !== null
          ? this.props.pdp.dataDetailPdp.minQty
          : 0,
      affiliateSKU: [
        {
          id: 1,
          name: "Product 1",
          minPriceRange: 10000,
          maxPriceRange: 15000,
          catalogueImages: 'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67842629.png',
          isBundle: true
        },
        {
          id: 2,
          name: "Product 2",
          minPriceRange: 10000,
          maxPriceRange: 15000,
          catalogueImages: 'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67842629.png',
          isBundle: true
        },
        {
          id: 3,
          name: "Product 3",
          minPriceRange: 10000,
          maxPriceRange: 15000,
          catalogueImages: 'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67842629.png',
          isBundle: true
        },
        {
          id: 4,
          name: "Product 4",
          minPriceRange: 10000,
          maxPriceRange: 15000,
          catalogueImages: 'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67842629.png',
          isBundle: true
        },
        {
          id: 5,
          name: "Product 5",
          minPriceRange: 10000,
          maxPriceRange: 15000,
          catalogueImages: 'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67842629.png',
          isBundle: true
        }
      ],
      affiliatePromo: [
        {
          id: 1,
          title: 'Title 1',
          description: 'This is description'
        },
        {
          id: 2,
          title: 'Title 2',
          description: 'This is description'
        },
        {
          id: 3,
          title: 'Title 3',
          description: 'This is description'
        },
        {
          id: 4,
          title: 'Title 4',
          description: 'This is description'
        }
      ]
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
    if (this.props.pdp.dataDetailPdp.warehouseCatalogues.length > 0){
      if (
        this.props.pdp.dataDetailPdp.warehouseCatalogues[0].unlimitedStock ||
        this.props.pdp.dataDetailPdp.warehouseCatalogues[0].stock >
          this.props.pdp.dataDetailPdp.minQty
      ) {
        return 'Tambah ke Keranjang';
      }
      return 'Stock Habis';
    } else {
      console.log('buttonTitle')
      return ''
    }
    
  }

  /**
   * BUTTON DISABLED
   */
  buttonDisabled(){
    if (this.props.pdp.dataDetailPdp.warehouseCatalogues.length > 0){
      if (
        this.props.pdp.dataDetailPdp.warehouseCatalogues[0].unlimitedStock ||
        this.props.pdp.dataDetailPdp.warehouseCatalogues[0].stock >
          this.props.pdp.dataDetailPdp.minQty
      ) {
        return false;
      }
      return true;
    }else{
      console.log('buttonDisabled')
      return true
    }
    
  }

   /** === CHECK INPUT QTY SECTION === */
   checkInputQtySection() {
    if (this.props.pdp.dataDetailPdp.warehouseCatalogues.length > 0){
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
    }else{
      console.log('checkInputQtySection')
      return true
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
    if (this.props.pdp.dataDetailPdp.warehouseCatalogues.length > 0){
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
    } else {
      console.log('checkTersisa')
      return ''
    }
    
  }

  /** === PARENT FUNCTION FROM ORDER === */
  parentFunctionFromOrderButton(data) {
    /** NOTE 1 */
    this.setState({
      qtyFromChild: data.qty
    });
  }

  /** === PARENT FUNCTION PROMO BUNDLE === */
  parentFunction(data) {
      switch (data.type) {
        case 'order':
            console.log('Press Order')
          break;
        case 'detail':
            this.props.pdpGetDetailProcess(data.item.id)
          break;      
        default:
          break;
      }
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

  /** === BUTTON ADD TO CART ===  */
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

    /** === RENDER PDP SKU NOT AVAILABLED === */
    renderPdpNotAvailable() {
      return (
        <View style={styles.containerPdpNotifNotAvailabled}>
          <MaterialIcon name="error" size={20} color={Color.mainColor} />
          <Text style={[Fonts.type60, { paddingLeft: 8 }]}>
            SKU tidak tersedia di lokasi Anda. Silahkan pilih SKU lain yang
            tersedia
          </Text>
        </View>
      );
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

  /** === RENDER PAGE === */
  renderLoadingPage(){
    return <LoadingPage />
  }

    
  /**
   * ===================
   * AFFILIATE SKU SECTION
   * ===================
   */
  renderAffiliateSection(){
    return(
      <View>
        <View style={{ marginHorizontal: 16, backgroundColor: Color.fontBlack10, height: 1, marginTop: 8}} />
        <Text style={[ Fonts.type7, { marginVertical: 16, alignSelf: 'center' }]}>PRODUK TERKAIT</Text>
        <View style={{ marginHorizontal: 16, backgroundColor: Color.fontBlack10, height: 1}} />
      </View>      
    )
  }

    /**
   * ===================
   * AFFILIATE PROMO SECTION
   * ===================
   */
  renderPromoSection(){
    return(
      <View>
        <View style={{ marginHorizontal: 16, backgroundColor: Color.fontBlack10, height: 1, marginTop: 8}} />
        <Text style={[ Fonts.type7, { marginVertical: 16, alignSelf: 'center' }]}>PROMO BUNDLE TERKAIT</Text>
        <View style={{ marginHorizontal: 16, backgroundColor: Color.fontBlack10, height: 1}} />
      </View>      
    )
  }

  /** === RENDER AFFILIATE SKU === */
  renderAffiliateItem(){
    return(
      <View style={{marginTop: 16}}>
        <ProductListType3 
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
          data={this.props.pdp.dataDetailPdp.affiliatedSKUs}
          loading={this.props.pdp.loadingDetailPdp}
        />
      </View>
    )
  }

  /** === RENDER ACCORDION === */
  renderAccordion(){
    return(
      <View style={{ marginBottom: 100 }}>
        <Accordion 
          data={this.props.pdp.dataDetailPdp.affiliatedPromos}
        />
      </View>
    )
  }

  renderDetailSKU(){
    return this.props.pdp.loadingDetailPdp ? (
      <View style={{ marginTop: 10 }}>
        <SkeletonType23 />
      </View>
    ) : (
      this.renderData()
    )
  }

  renderAffiliateSKU(){
    return this.props.pdp.loadingDetailPdp ? (
      <SkeletonType21 />
    ) : (
      this.renderAffiliateItem()
    )
  }

  renderPromoBundle(){
    return this.props.pdp.loadingDetailPdp ? (
      this.renderLoadingPage()
    ) : (
      this.renderAccordion()
    )
  }

  renderButton(){
    return !this.props.pdp.loadingDetailPdp ? (
      this.renderButtonContent()
    ) : (
      <View />
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
        {this.renderDetailSKU()}
        {this.renderAffiliateSection()}
        {this.renderAffiliateSKU()}
        {this.renderPromoSection()}
        {this.renderPromoBundle()}
      </View>
    )
  }

  /** === RENDER BUTTON CONTENT === */
  /** this.props.pdp.dataDetailPdp.warehouseCatalogues.length > 0 */
  renderButtonContent() {
    return this.props.pdp.dataDetailPdp.warehouseCatalogues.length > 0 ? (
      this.renderBottomButton()
    ) : (
      this.renderPdpNotAvailable()
    );
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
        {/* {this.renderBottomButton()} */}
        {this.renderButton()}
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
  },
  containerPdpNotifNotAvailabled: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Color.fontYellow10,
    flexDirection: 'row',
    alignItems: 'center'
  },
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