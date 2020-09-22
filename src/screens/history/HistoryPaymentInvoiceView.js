import {
    React,
    Component,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
  } from '../../library/reactPackage';
  import { MaterialIcon } from '../../library/thirdPartyPackage';
  import { LoadingPage } from '../../library/component';
  import Pdf from 'react-native-pdf';
  import { Color } from '../../config';
  class HistoryPaymentInvoiceView extends Component {
    static navigationOptions = ({ navigation }) => {
      return {
        headerRight: (
          <View style={{ flex: 1, marginRight: 20 }}>
            <TouchableOpacity onPress={() => console.log('download')}>
              <MaterialIcon
                name="get-app"
                size={24}
                color={Color.backButtonWhite}
              />
            </TouchableOpacity>
          </View>
        )
      };
    };
    renderInvoice() {
      const source = {
        uri: 'http://www.africau.edu/images/default/sample.pdf',
        cache: true
      };
      return (
        <View style={{ flex: 1 }}>
          <Pdf
            source={source}
            style={{ flex: 1 }}
            // onLoadProgress={() => (this.showLoadingPage())}
            // onLoadComplete={() => (this.hideLoadingPage())}
          />
        </View>
      );
    }
    renderContent() {
      return <>{this.renderInvoice()}</>;
    }
    render() {
      return <>{
        // this.loading? <LoadingPage/>:
        this.renderContent()
        }</>;
    }
  }
  export default HistoryPaymentInvoiceView;
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'flex-start',
//       alignItems: 'center',
//       marginTop: 25
//     },
//     pdf: {
//       flex: 1,
//       width: Dimensions.get('window').width,
//       height: Dimensions.get('window').height
//     }
//   });
  