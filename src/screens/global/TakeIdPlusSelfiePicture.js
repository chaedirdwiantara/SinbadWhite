import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageStore,
  Image,
  TouchableOpacity
} from 'react-native';
var RNFS = require('react-native-fs');
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
    this.state = {
      loading: false
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
    const cropData = {
      offset: { x: 600, y: 400 },
      size: { width: 1850, height: 2900 }
    };

    if (this.camera) {
      const options = {
        quality: 0.2,
        base64: true,
        pauseAfterCapture: true,
        fixOrientation: true
      };
      const data = await this.camera.takePictureAsync(options);
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
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          defaultTouchToFocus
          flashMode={RNCamera.Constants.FlashMode.off}
          clearWindowBackground={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel'
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              width
            }}
          >
            <View style={styles.markerSelfie}>
              {this.state.loading ? (
                <Image
                  source={require('../../assets/gif/loading/load_triagle.gif')}
                  style={{ height: 80, width: 80 }}
                />
              ) : (
                <View />
              )}
            </View>
            <View style={styles.markerId} />
          </View>
          <View
            style={{
              height: 0.15 * height,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
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
  markerId: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 0.45 * height,
    height: 0.2 * height,
    borderWidth: 5,
    borderRadius: 0.05 * width,
    borderColor: masterColor.fontGreen50,
    borderStyle: 'dashed'
  },
  markerSelfie: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 0.45 * height,
    height: 0.55 * height,
    marginBottom: 10,
    borderWidth: 5,
    borderRadius: 0.05 * width,
    borderColor: masterColor.fontGreen50,
    borderStyle: 'dashed'
  },
  boxCircleCamera: {
    borderWidth: 2,
    borderRadius: 40,
    padding: 10,
    borderColor: masterColor.fontWhite
  }
});

const mapStateToProps = ({ global }) => {
  return { global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TakeIdPlusSelfiePicture);
