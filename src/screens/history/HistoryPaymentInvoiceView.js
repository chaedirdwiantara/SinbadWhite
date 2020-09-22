import {
    React,
    Component,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
  } from '../../library/reactPackage';
  import RNFetchBlob from 'rn-fetch-blob'
  import { MaterialIcon } from '../../library/thirdPartyPackage';
  import { LoadingPage } from '../../library/component';
  import Pdf from 'react-native-pdf';
  import { Color } from '../../config';
  import { PermissionsAndroid, Alert } from 'react-native';
  class HistoryPaymentInvoiceView extends Component {
    static navigationOptions = ({ navigation }) => {
      return {
        headerRight: (
          <View style={{ flex: 1, marginRight: 20 }}>
            <TouchableOpacity onPress={() => this.renderCek()}>
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
    renderCek(){
        console.log('cek');
        
    }
    renderInvoice() {
      const source = {
        uri: 'http://www.africau.edu/images/default/sample.pdf',
        cache: true
      };
      return (
        <View style={{ flex: 1 }}>
           <TouchableOpacity onPress={()=> this.renderCek()
           }><Text>Klik</Text></TouchableOpacity> 
          <Pdf
            source={source}
            style={{ flex: 1 }}
            // onLoadProgress={() => (this.showLoadingPage())}
            // onLoadComplete={() => (this.hideLoadingPage())}
          />
        </View>
      );
    }
    extention(filename){
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
      }
    requestWritePermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Cool Photo App Camera Permission",
              message:
                "Cool Photo App needs access to your camera " +
                "so you can take awesome pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
            this.download()
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };
    download(){
        var date      = new Date();
        var url       = "http://www.africau.edu/images/default/sample.pdf";
        var ext       = this.extention(url);
        ext = "."+ext[0];
        const { config, fs } = RNFetchBlob
        let PictureDir = fs.dirs.DownloadDir
        let options = {
          fileCache: true,
          addAndroidDownloads : {
            useDownloadManager : true,
            notification : true,
            path:  PictureDir + "/Sinbad_"+Math.floor(date.getTime() + date.getSeconds() / 2)+ext,
            description : 'Sinbad'
          }
        }
        config(options).fetch('GET', url).then((res) => {
          Alert.alert("Success Downloaded");
        });
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
  