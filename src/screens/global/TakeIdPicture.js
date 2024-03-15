import { 
  React,
  Component,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  width,
  height
} from '../../library/reactPackage'
import { 
  RNCamera,
  bindActionCreators,
  connect,
  ImageEditor,
  MaterialCommunityIcons,
  RNFS,
} from '../../library/thirdPartyPackage'
import { 
  ButtonSingle,
  ModalBottomType4,
  StatusBarBlack,
} from '../../library/component'
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor.json';
import { ToastAndroid } from 'react-native';
import { Fonts } from '../../helpers';
import ImagePicker from 'react-native-image-crop-picker';

class TakeIdPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showModalTnC: false,
      checkTnC: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.global.imageBase64 !== this.props.global.imageBase64) {
      if (this.props.global.imageBase64 !== '') {
        NavigationService.goBack(this.props.navigation.state.key);
      }
    }
  }

  takePicture = async () => {
    this.setState({ loading: true });

    if (this.camera) {
      const options = {
        quality: 0.2,
        pauseAfterCapture: true,
        fixOrientation: true,
      };
      try {
        const {uri, width} = await this.camera.takePictureAsync(options);
        const url = await ImageEditor.cropImage(uri, {
          offset: {x:width * .1, y: width * .4},
          size: {width: width * .8, height: width * .5}
        })
        const dataImage = await RNFS.readFile(url, 'base64')
        this.props.saveImageBase64(dataImage);
        RNFS.unlink(uri)
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.LONG)
        NavigationService.goBack(this.props.navigation.state.key);
      }
    }
  };

  /** === PICK IMAGE === */
  pickImage(){
    this.setState({showModalTnC: false, checkTnC: false})
    ImagePicker.openPicker({
      includeBase64: true,
      width: 1920,
      height: 1080,
      cropping: true,
      mediaType: 'photo'
    }).then(image => {
      this.props.saveImageBase64(image.data)
    });
  }

  /** RENDER MODAL TNC */
  renderModalTnC(){
    const {showModalTnC} = this.state
    return(
      <ModalBottomType4 
        open={showModalTnC}
        title="Ketentuan Pilih Galeri"
        typeClose="cancel"
        close={() => this.setState({showModalTnC: false, checkTnC: false})}
        content={this.renderContentModalTnC()}
      />
    )
  }
  /** RENDER MODAL TNC CONTENT */
  renderContentModalTnC(){
    const {checkTnC} = this.state
    return(
      <View>
        <View style={{paddingHorizontal: 16, flex: 1, paddingBottom: 16, flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.setState({ checkTnC: !checkTnC })}>
            <MaterialCommunityIcons
              color={checkTnC ? masterColor.mainColor : masterColor.fontBlack40}
              name={checkTnC ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={24}
            />
          </TouchableOpacity>
          <Text style={[Fonts.type8, {marginLeft: 8, flex: 1}]}>
            Saya bertanggung jawab atas foto KTP pemilik toko yang saya upload. Apabila terdapat penyalahgunaan terhadap foto KTP ini, maka saya bersedia mengikuti kebijakan yang berlaku di Sinbad
          </Text>
        </View>
        <ButtonSingle
          disabled={!checkTnC}
          title={'Lanjutkan'}
          borderRadius={4}
          onPress={() => this.pickImage()}
        />
      </View>
    )
  }

  render() {
    const {typeCamera, uploadFromGallery} = this.props.navigation?.state?.params || {}
    const {showModalTnC} = this.state
    return (
      <View style={styles.mainContainer}>
        <StatusBarBlack />
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          aspect={1}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={true}
          defaultTouchToFocus
          flashMode={RNCamera.Constants.FlashMode.off}
          clearWindowBackground={false}
        >
          <View style={styles.masking}>
            <View style={styles.partialMask}>
              <Text style={[Fonts.type7, {color: masterColor.fontWhite}]}>
                Ambil Foto {typeCamera === 'id' ? 'KTP' : 'NPWP'}
              </Text>
              <Text style={[Fonts.type37, {color: masterColor.fontWhite, marginTop: 16}]}>
                Posisikan {typeCamera === 'id' ? 'KTP' : 'NPWP'} Anda tepat berada di dalam bingkai
              </Text>
            </View>
            <View style={{height: .35 * height, backgroundColor: 'transparent', flexDirection: 'row'}}>
              <View style={{flex: 1, backgroundColor: masterColor.fontBlack100OP60}} />
              <View style={{width: .9 * width, backgroundColor: 'transparent'}} />
              <View style={{flex: 1, backgroundColor: masterColor.fontBlack100OP60}} />
            </View>
            <View style={styles.partialMask}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flex: 1}} />
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={{...styles.boxCircleCamera, alignSelf: 'center'}}
                    onPress={this.takePicture.bind(this)}
                  >
                    <MaterialCommunityIcons
                      name="camera"
                      color={masterColor.fontWhite}
                      size={32}
                    />
                  </TouchableOpacity>
                </View>
                {uploadFromGallery ? (
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      style={{alignSelf: 'center'}}
                      onPress={() => this.setState({showModalTnC: true})}
                    >
                      <MaterialCommunityIcons
                        name="image-multiple"
                        color={masterColor.fontWhite}
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>
                ) : <View style={{flex: 1}} />}
              </View>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.markerId}>
              {this.state.loading && (
                <Image
                  source={require('../../assets/gif/loading/load_triagle.gif')}
                  style={{ height: 80, width: 80 }}
                />
              )}
            </View>
          </View>
        </RNCamera>
        {showModalTnC && this.renderModalTnC()}
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
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  markerId: {
    justifyContent: 'center',
    alignItems: 'center',
    width: .91 * width,
    height: .355 * height,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: masterColor.fontWhite
  },
  boxCircleCamera: {
    borderWidth: 2,
    borderRadius: 40,
    padding: 10,
    margin: 16,
    borderColor: masterColor.fontWhite,
  },
  masking: {
    position: 'absolute', 
    height: '100%', 
    width: '100%', 
    flex: 1
  },
  partialMask: {
    flex: 1, 
    backgroundColor: masterColor.fontBlack100OP60, 
    alignItems:'center', 
    justifyContent: 'center'
  }
});

const mapStateToProps = ({ global }) => {
  return { global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(TakeIdPicture);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: tatas
 * updatedDate: 23062020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */