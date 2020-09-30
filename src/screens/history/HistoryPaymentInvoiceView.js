import {
  React,
  Component,
  View,
  Text,
  PermissionsAndroid,
  ActivityIndicator
} from '../../library/reactPackage';
import {
  MaterialIcon,
  RNFetchBlob,
  Pdf,
  bindActionCreators,
  connect
} from '../../library/thirdPartyPackage';
import * as ActionCreators from '../../state/actions';
import { ModalBottomErrorRespons } from '../../library/component';
import NavigationService from '../../navigation/NavigationService';
import { Fonts } from '../../helpers';
import { Color } from '../../config';
class HistoryPaymentInvoiceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingDownload: false,
      openModalErrorGlobal: false,
      url: this.props.history.dataViewInvoice.data.url,
      filename: this.props.history.dataViewInvoice.data.fileName
    };
  }
 
  
  /** HEADER MODIFICATION */
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  /**PROGRESS DOWNLOAD */
  progressDownload() {
    this.setState({
      loadingDownload: true
    });
    this.requestWritePermission();
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
    var url = this.state.url;
    var ext = this.extention(url);
    const filename = this.state.filename
    ext = '.' + ext[0];
    const { config, fs, android } = RNFetchBlob;
    let downloadDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: false,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: 'application/pdf',
        path:
          downloadDir + '/'+
          filename,
        description: 'Sinbad'
      }
    };
    RNFetchBlob.fs.exists(downloadDir + '/'+
    filename).then((exist) => {
      if(exist === true){
        android.actionViewIntent(downloadDir + '/'+
        filename, 'application/pdf');
        this.setState({ loadingDownload: false });
      }
      else {
        config(options)
        .fetch('GET', url)
        .then(res => {
          android.actionViewIntent(res.path(), 'application/pdf');
          this.setState({ loadingDownload: false });
        })
        .catch(error => {
          this.setState({
            openModalErrorGlobal: true,
            loadingDownload: false
          });
        });
      }
    })
    .catch((err) => { console.log(err) });
  }
  extention(filename) {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  }

  /** RENDER SHOW INVOICE */
  renderInvoice() {
    const source = {
      uri: this.state.url,
      cache: true,
      expiration: 86400
    };
    return (
      <View style={{ flex: 1 }}>
        <Pdf source={source} style={{ flex: 1 }} />
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
        <View
          style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row' }}
        >
          <View style={{ marginHorizontal: 16 }}>
            <MaterialIcon
              name="arrow-back"
              size={24}
              color={Color.backButtonWhite}
              onPress={() => NavigationService.goBack(null)}
            />
          </View>
          <Text style={Fonts.type35}>Faktur</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 16 }}>
          {this.state.loadingDownload === false ? (
            <MaterialIcon
              onPress={() => this.progressDownload()}
              name="get-app"
              size={24}
              color={Color.backButtonWhite}
            />
          ) : (
            <ActivityIndicator size="small" color="#ffffff" />
          )}
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
    console.log(this.state.loadingDownload, 'download');
    
    return (
      <>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderModalErrorDownload()}
      </>
    );
  }
}
const mapStateToProps = ({ history, user, merchant, oms }) => {
  return { history, user, merchant, oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryPaymentInvoiceView);
