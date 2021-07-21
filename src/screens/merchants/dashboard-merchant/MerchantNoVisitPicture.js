import {
  React,
  Component,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Text
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  MaterialIcon,
  RNCamera,
  RNFS,
  ImageEditor,
  connect
} from '../../../library/thirdPartyPackage';
import { StatusBarWhite, ButtonSingleSmall } from '../../../library/component';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';

const { height } = Dimensions.get('window');

class MerchantNoVisitPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerShown: false,
      notes: null,
      backCamera: true,
      flash: false,
      capturedPhoto: null,
      loading: false
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    const { notes } = this.props.navigation.state.params;
    this.setState({ notes });
  }
  /** DID UPDATE */
  componentDidUpdate(prevProps) {
    // check post no visit success, and goback to detail/task list.
  }
  /** Will Unmount */
  componentWillUnmount() {
    this.setHeaderShown(false);
  }
  /** === TAKE PHOTO === */
  takePhoto = async () => {
    try {
      this.setState({ loading: true });
      let cropOptions = {
        offset: { x: 0, y: 250 },
        size: { width: 1850, height: 2900 }
      };

      if (this.camera) {
        let options = {
          quality: 0.2,
          base64: true,
          pauseAfterCapture: true,
          fixOrientation: true
        };

        let data = await this.camera.takePictureAsync(options);
        let cropedUri = await ImageEditor.cropImage(data.uri, cropOptions);
        let dataImage = await RNFS.readFile(cropedUri, 'base64');
        this.props.saveImageBase64(dataImage);
        this.setState({ capturedPhoto: dataImage, loading: false }, () =>
          this.setHeaderShown(true)
        );
        RNFS.unlink(cropedUri);
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    }
  };
  postNoVisitReason = () => {
    // post noVisitReasonId, noVisitReasonNote, and picture
  };
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    let storeName = '';
    let headerShown = false;
    if (navigation.state.params) {
      if (navigation.state.params.storeName.length >= 21) {
        storeName = navigation.state.params.storeName.substring(0, 21) + '...';
      } else {
        storeName = navigation.state.params.storeName;
      }
      if (navigation.state.params.headerShown) {
        headerShown = navigation.state.params.headerShown;
      }
    }

    return {
      headerShown,
      headerTitle: () => (
        <View>
          <Text style={Fonts.type35}>{storeName}</Text>
        </View>
      )
    };
  };
  setHeaderShown = headerShown => {
    this.props.navigation.setParams({ headerShown });
  };
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER CAMERA === */
  renderCamera() {
    return (
      <View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{ height: '100%' }}
          type={
            this.state.backCamera
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          captureAudio={false}
          defaultTouchToFocus
          flashMode={
            this.state.flash
              ? RNCamera.Constants.FlashMode.on
              : RNCamera.Constants.FlashMode.off
          }
          clearWindowBackground={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel'
          }}
        >
          <View style={{ justifyContent: 'space-between', flex: 1 }}>
            <View style={styles.cameraButtonContainer}>
              <TouchableOpacity onPress={() => NavigationService.goBack()}>
                <MaterialIcon
                  name={'close'}
                  color={Color.fontWhite}
                  size={22}
                />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
              {this.state.loading && (
                <Image
                  source={require('../../../assets/gif/loading/load_triagle.gif')}
                  style={{ height: 80, width: 80 }}
                />
              )}
            </View>
            <View style={[styles.cameraButtonContainer]}>
              <TouchableOpacity
                style={styles.smallIcon}
                onPress={() => this.setState({ flash: !this.state.flash })}
              >
                <MaterialIcon
                  name={this.state.flash ? 'flash-on' : 'flash-off'}
                  color={Color.fontBlack60}
                  size={15}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mediumIcon}
                onPress={() => this.takePhoto()}
              >
                <MaterialIcon
                  name={'photo-camera'}
                  color={Color.fontBlack60}
                  size={32}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.smallIcon}
                onPress={() =>
                  this.setState({ backCamera: !this.state.backCamera })
                }
              >
                <MaterialIcon
                  name={'cached'}
                  color={Color.fontBlack60}
                  size={15}
                />
              </TouchableOpacity>
            </View>
          </View>
        </RNCamera>
      </View>
    );
  }
  /** === RENDER DISPLAY PHOTO === */
  renderDisplayPhoto() {
    return (
      <View style={{ height: 0.7 * height }}>
        <Image
          style={styles.displayPhoto}
          source={{
            isStatic: true,
            uri: 'data:image/jpeg;base64,' + this.state.capturedPhoto
          }}
        />
      </View>
    );
  }
  /** === RENDER BUTTON DISPLAY PHOTO === */
  renderButton() {
    return (
      <View style={styles.buttonContainer}>
        <View style={{ padding: 16, flex: 1 }}>
          <ButtonSingleSmall
            flex
            title={'Ambil Ulang'}
            white
            borderRadius={4}
            onPress={() =>
              this.setState(
                {
                  capturedPhoto: null
                },
                () => this.setHeaderShown(false)
              )
            }
          />
        </View>
        <View style={{ padding: 16, flex: 1 }}>
          <ButtonSingleSmall
            flex
            title={'Simpan'}
            borderRadius={4}
            onPress={() => this.postNoVisitReason()}
          />
        </View>
      </View>
    );
  }
  /** === RENDER DISPLAY PHOTO CONTAINER === */
  renderDisplayPhotoContainer() {
    return (
      <View style={styles.contentContainer}>
        {this.renderDisplayPhoto()}
        {this.renderButton()}
      </View>
    );
  }
  /** MAIN */
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBarWhite />
        {this.state.capturedPhoto
          ? this.renderDisplayPhotoContainer()
          : this.renderCamera()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Color.fontWhite,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1000
  },
  displayPhoto: {
    flex: 1,
    height: '100%',
    resizeMode: 'cover'
  },
  cameraButtonContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(37, 40, 43, 0.4)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 16
  },
  smallIcon: {
    borderRadius: 40,
    marginLeft: 5,
    padding: 6,
    backgroundColor: Color.fontWhite
  },
  mediumIcon: {
    borderWidth: 2,
    borderRadius: 40,
    borderColor: Color.fontWhite,
    padding: 10,
    backgroundColor: Color.fontWhite
  },
  buttonContainer: {
    paddingVertical: 8,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantNoVisitPicture);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 21072021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 * -> create new screen for taking a picture no visit reason.
 */
