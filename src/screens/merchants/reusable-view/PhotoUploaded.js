import {
  React,
  Component,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from '../../../library/reactPackage';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';

class PhotoUploaded extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
  /** === RENDER IMAGE ==== */
  renderImage() {
    return (
      <View style={{ paddingHorizontal: 16, flexDirection: 'row' }}>
        <Image
          source={{
            uri: this.props.image
          }}
          style={[
            styles.image,
            {
              marginTop: this.props.marginTop,
              transform: this.props.rotate
                ? [{ rotate: '270deg' }]
                : [{ rotate: '0deg' }]
            }
          ]}
        />
      </View>
    );
  }
  /** === RENDER RETAKE BUTTON === */
  renderReTakeButton() {
    return this.props.loading || this.props.imageBase64 === '' ? (
      <View />
    ) : (
      <View
        style={{
          alignItems: 'center',
          marginTop: this.props.marginTopRetakeText
        }}
      >
        <TouchableOpacity onPress={this.props.reTake}>
          <Text style={Fonts.type29}>ULANGI FOTO</Text>
        </TouchableOpacity>
      </View>
    );
  }
  /** === RENDER MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderImage()}
        {this.renderReTakeButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  image: {
    resizeMode: 'contain',
    height: undefined,
    width: '100%',
    aspectRatio: 1 / 1
  }
});

export default PhotoUploaded;
