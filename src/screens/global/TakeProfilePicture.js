import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';
var RNFS = require('react-native-fs');
import { bindActionCreators } from 'redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ImageEditor from '@react-native-community/image-editor';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor.json';
import { StatusBarBlack } from '../../components/StatusBarGlobal';

const { width, height } = Dimensions.get('window');

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
    const cropData = {
      offset: { x: 200, y: 500 },
      size: { width: 1700, height: 1700 }
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
