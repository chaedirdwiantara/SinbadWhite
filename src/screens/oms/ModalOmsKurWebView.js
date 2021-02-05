import {
  React,
  View,
  Component,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  StyleSheet,
  Text
} from '../../library/reactPackage';
import {
  MaterialIcon,
  Modal,
  bindActionCreators,
  connect,
} from '../../library/thirdPartyPackage';
import { LoadingPage } from '../../library/component';
import { WebView } from 'react-native-webview';
import masterColor from '../../config/masterColor.json';
import { Fonts} from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';

const { width, height } = Dimensions.get('window');
class ModalOmsKurWebView extends Component {
constructor(props) {
  super(props);
  this.state = {}
}

componentDidUpdate(prevProps) {
  if (
    prevProps.oms.dataOmsApplicablePaylater !==
    this.props.oms.dataOmsApplicablePaylater
    ) {
    if (this.props.oms.dataOmsApplicablePaylater !== null ) {
      this.props.applicablePaylater(this.props.oms.dataOmsApplicablePaylater)
    }
  }
}

async renderBack() {
  const data = this.props.merchant.dataGetMerchantLastOrder.store.id
  await this.props.OmsApplicablePaylaterProcess(data)
}

renderHeader() {
  return(
    <View style={styles.headerContainer}>
      <View style={[styles.headerContent]}>
        <View style={[styles.headerBody]}>
          <TouchableOpacity onPress={() => this.renderBack()}>
            <View>
              <MaterialIcon
                name="arrow-back"
                size={24}
                color={masterColor.backButtonWhite}
                style={{
                  marginBottom: 8,
                  marginLeft: 8,
                  alignContent: 'flex-start'
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', flex: 1, alignSelf:"center" }}>
          <Text style={Fonts.type35}>S & K KUR KlikAcc</Text>
        </View>
      </View>
    </View>
  )
}

renderContent() {
  return (
    <View style={{flex: 1}}> 
          <WebView 
            originWhitelist={['*']}
            scalesPageToFit={true}
            // style={{flex: 1}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            // source={{ uri: 'https://sign-sandbox.privy.id/doc/d09ed395db72851826617f5047a45953189388e6f023ce543bdb6bf660743fe0-b2a1094c3515837a5f23c27991d9e3dab0d9cc2f7aaed6ab233e28050193ced3-868b68b8ac3c1fafd8c841f07a6020d9' }}
            source={{ uri: this.props.url }}
          />
        
    </View>
  )
}

render() {  
  return(
    <View style={{flex:1}}>
      <Modal
        style={{flex: 1}}
        isVisible={this.props.open}
        coverScreen={true}
        useNativeDriver={true}
        style={styles.mainContainer}
        onPress={this.props.close}
        onRequestClose={() => this.renderBack()}
      >
        {this.renderHeader()}
        {this.renderContent()}
        {
          this.props.oms.loadingOmsApplicablePaylater === false ?
            null
          :
            <View style={{flex:1, position:"absolute", height:"100%", top: 0, left: 0, right: 0, bottom: 0, backgroundColor:"black", opacity: 0.5}}>
              <LoadingPage/>
            </View>
        } 
      </Modal>
    </View>
  )
}

}

const styles = StyleSheet.create({
mainContainer: {
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0
},
contentContainer: {
  borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
  maxHeight: 0.8 * height,
  backgroundColor: masterColor.backgroundWhite,
  flexDirection: 'column',
  position: 'absolute',
  width: '100%',
  bottom: 0,
  zIndex: 1000
},
boxContentBody: {
  flex: 1,
  paddingTop: 20
},
boxContentTitle: {
  marginTop: 18,
  justifyContent: 'center',
  flexDirection: 'row'
},
boxClose: {
  position: 'absolute',
  height: '100%',
  justifyContent: 'center',
  left: 16
},
headerContainer: {
  backgroundColor: '#F0444C',
  height: 56,
  justifyContent: 'center'
},
headerContent: {
  flex: 1,
  flexDirection: 'row'
},
headerBody: {
  marginHorizontal: 8,
  marginVertical: 16
},
});

const mapStateToProps = ({ oms, merchant, user, permanent }) => {
return { oms, merchant, user, permanent };
};

const mapDispatchToProps = dispatch => {
return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalOmsKurWebView);