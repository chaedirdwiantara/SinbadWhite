import {
  React,
  Component,
  View,
  Text,
  PermissionsAndroid,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from '../../library/reactPackage';
import { MaterialIcon, RNFetchBlob, Pdf } from '../../library/thirdPartyPackage';
import {ModalBottomErrorRespons} from '../../library/component'
import NavigationService from '../../navigation/NavigationService';
import { Fonts } from '../../helpers';
import { Color } from '../../config';
class HistoryPaymentInvoiceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: 'http://www.africau.edu/images/default/sample.pdf',
      loadingDownload: false,
      openModalErrorGlobal: false
    };
  }
  /** HEADER MODIFICATION */
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  /**PROGRESS DOWNLOAD */
  progressDownload(){
    this.setState({
      loadingDownload : true
    })
    this.requestWritePermission()
  }
  /**ANDROID REQUEST WRITE PERMISSION */
  requestWritePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Sinbad Agent App Permission',
          message:
            'Sinbad Agent App needs access to your file ' +
            'so you can download the invoice file.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.download();
      } else {
        //will update to modal error soon
        console.log('permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  /** DOWNLOAD INVOICE */
  download() {
    var date = new Date();
    var url = this.state.source;
    var ext = this.extention(url);
    ext = '.' + ext[0];
    const { config, fs, android } = RNFetchBlob;
    let downloadDir = fs.dirs.DownloadDir;
    let options = {
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: 'application/pdf',
        path:
          downloadDir +
          '/Sinbad_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Sinbad'
      }
    };
    config(options)
      .fetch('GET', url)
      .then(res => {
        android.actionViewIntent(res.path(), 'application/pdf');
        this.setState({loadingDownload: false})
      }
      )
      .catch(error => {
        this.setState({
          openModalErrorGlobal: true
        })
    })
  }
  extention(filename) {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  }

  /** RENDER SHOW INVOICE */
  renderInvoice() {
    const source = {
      uri: this.state.source,
      cache: true,
      expiration:86400
    };
    return (
      <View style={{ flex: 1 }}>
        <Pdf
          source={source}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
  /** RENDER CONTENT */
  renderContent() {
    return <>{this.renderInvoice()}</>;
  }

  /**RENDER HEADER */
  renderHeader() {
    return (
      <View
        style={{
          backgroundColor: '#f0444c',
          height: 56,
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <View style={{flex: 1, alignItems:'flex-start', flexDirection:'row'}}>
        <View style={{ marginHorizontal: 16 }}>
          <MaterialIcon
            name="arrow-back"
            size={24}
            color={Color.backButtonWhite}
            onPress={()=>NavigationService.goBack(null)}
          />
        </View>
        <Text style={Fonts.type35}>Faktur</Text>
        </View>
        <View style={{flex:1, alignItems:'flex-end', marginRight:16}}>
          {this.state.loadingDownload === false? 
        <MaterialIcon onPress={()=>this.progressDownload()} name="get-app" size={24} color={Color.backButtonWhite} /> :
        <ActivityIndicator size="small" color="#ffffff" />}
        </View>
      </View>
    );
  }

  /**MODAL ERROR DOWNLOAD */
  renderModalErrorDownload() {
    return this.state.openModalErrorGlobal ? (
      <ModalBottomErrorRespons
        statusBarType={'transparent'}
        open={this.state.openModalErrorGlobal}
        onPress={() => this.setState({ openModalErrorGlobal: false })}
      />
    ) : (
      <View />
    );
  }
  render() {
    return (
      <>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderModalErrorDownload()}
      </>
    );
  }
}
export default HistoryPaymentInvoiceView;
