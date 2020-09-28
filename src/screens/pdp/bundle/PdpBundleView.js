import {
  React,
  Component,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from '../../../library/reactPackage'
import {
  connect,
  bindActionCreators
} from '../../../library/thirdPartyPackage'
import {
  CartGlobal,
  StatusBarRed,
  ButtonSingle
} from '../../../library/component'
import { Fonts } from '../../../helpers'
import * as ActionCreators from '../../../state/actions'
import NavigationService from '../../../navigation/NavigationService'
import { Color } from '../../../config'

class PdpBundleView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skuEmpty: true
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
  buttonTitle(){
    if (this.state.skuEmpty) return 'Stock Habis'
    return 'Tambah ke Kranjang'
  }

  buttonDisabled(){
    if (this.state.skuEmpty) return true
    return false
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
        {this.renderDetailSKU()}
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
  }
})

const mapStateToProps = ({ pdp, oms }) => {
  return { pdp, oms }
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