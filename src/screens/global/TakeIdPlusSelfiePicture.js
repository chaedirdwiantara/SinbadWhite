import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { bindActionCreators } from 'redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ImageEditor from '@react-native-community/image-editor';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import ComingSoon from '../../components/empty_state/ComingSoon';
import masterColor from '../../config/masterColor.json';
import { StatusBarBlack } from '../../components/StatusBarGlobal';

const { width, height } = Dimensions.get('window');

class TakeIdPlusSelfiePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  takePicture = async () => {
    const cropData = {
      offset: { x: 0, y: 100 },
      size: { width: 100, height: 100 },
      displaySize: { width: 100, height: 100 },
      resizeMode: 'contain'
    };

    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);

      // ImageEditor.cropImage(data.uri, cropData).then(url => {
      //   console.log(url);
      // });
      // ImageEditor.cropImage(data.uri, cropData).then(url => {
      //   console.log('Cropped image uri', url);
      // });
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
          defaultTouchToFocus
          flashMode={RNCamera.Constants.FlashMode.on}
          clearWindowBackground={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel'
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        >
          <View style={styles.overlayCamera} />
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

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TakeIdPlusSelfiePicture);
