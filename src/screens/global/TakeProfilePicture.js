import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from '../../library/reactPackage';
import {
  RNCamera,
  RNFS,
  bindActionCreators,
  MaterialIcon,
  ImageEditor,
  connect
} from '../../library/thirdPartyPackage';
import { StatusBarBlack } from '../../library/component';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor.json';

const { width } = Dimensions.get('window');

class TakeProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.global.imageBase64 !== this.props.global.imageBase64) {
      if (this.props.global.imageBase64 !== '') {
        this.props.profileEditProcess({
          agentId: this.props.user.id,
          params: {
            image: `data:image/gif;base64,${this.props.global.imageBase64}`
          }
        });
        NavigationService.goBack(this.props.navigation.state.key);
      }
    }
  }

  takePicture = async () => {
    this.setState({ loading: true });
    let cropData = {
      offset: { x: 0, y: 250 }
    };

    if (this.camera) {
      const options = {
        quality: 0.2,
        base64: true,
        pauseAfterCapture: true,
        fixOrientation: true,
        orientation: 'portrait'
      };
      const data = await this.camera.takePictureAsync(options);
      let smallest = data.width < data.height ? data.width : data.height;
      cropData.size = { width: smallest, height: smallest };
      ImageEditor.cropImage(data.uri, cropData).then(url => {
        RNFS.readFile(url, 'base64').then(dataImage => {
          this.props.saveImageBase64(dataImage);
        });
        RNFS.unlink(data.uri);
      });
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarBlack />
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          aspect={1}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          captureAudio={false}
          mir
          defaultTouchToFocus
          flashMode={RNCamera.Constants.FlashMode.on}
          clearWindowBackground={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel'
          }}
        >
          <View style={styles.overlayCamera} />
          <View style={{ position: 'absolute' }}>
            {this.state.loading ? (
              <Image
                source={require('../../assets/gif/loading/load_triagle.gif')}
                style={{ height: 80, width: 80 }}
              />
            ) : (
              <View />
            )}
          </View>
          <View>
            <Image
              source={require('../../assets/images/background/take_profile_marker.png')}
              style={{
                width: '100%',
                resizeMode: 'cover',
                height: undefined,
                aspectRatio: 1 / 1
              }}
            />
          </View>
          <View style={styles.overlayCamera}>
            <TouchableOpacity
              style={styles.boxCircleCamera}
              onPress={this.takePicture.bind(this)}
            >
              <MaterialIcon
                name="photo-camera"
                color={masterColor.fontWhite}
                size={32}
              />
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlayCamera: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: masterColor.fontBlack100
  },
  boxCircleCamera: {
    borderWidth: 2,
    borderRadius: 40,
    padding: 10,
    borderColor: masterColor.fontWhite
  }
});

const mapStateToProps = ({ global, user }) => {
  return { global, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(TakeProfilePicture);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Tatas
 * updatedDate: 06072020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
