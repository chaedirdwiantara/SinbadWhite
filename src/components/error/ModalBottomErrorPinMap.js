import {
  React,
  Component,
  View,
  Image,
  Text
} from '../../library/reactPackage';
import {
  StatusBarBlackOP40,
  StatusBarTransparentBlack,
  StatusBarBlackOP40Translucent,
  ModalBottomSwipeCloseNotScroll,
  ButtonSingle
} from '../../library/component';
import { GlobalStyle, Fonts } from '../../helpers';

class ModalBottomErrorPinMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER CONTENT ITEM === */
  renderContentItem() {
    return (
      <View>
        <StatusBarBlackOP40Translucent />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            source={require('../../assets/images/sinbad_image/no_gps.png')}
            style={GlobalStyle.fullImage}
          />
          <View style={{ marginBottom: 20 }}>
            <Text
              style={[Fonts.type7, { textAlign: 'center', marginBottom: 10 }]}
            >
              Area tidak ditemukan
            </Text>
            <Text style={[Fonts.type17, { textAlign: 'center' }]}>
              Perbesar peta dengan
            </Text>
            <Text style={[Fonts.type17, { textAlign: 'center' }]}>
              dua jari pada layar Anda atau input alamat manual
            </Text>
          </View>
        </View>
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        disabled={false}
        loading={false}
        title={'Input Manual'}
        borderRadius={4}
        onPress={this.props.onPress}
      />
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View>
        {this.renderContentItem()}
        {this.renderButton()}
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <ModalBottomSwipeCloseNotScroll
        open={this.props.open}
        close={this.props.close}
        content={this.renderContent()}
        onPress={this.props.onPress}
        title={''}
      />
    );
  }
}

export default ModalBottomErrorPinMap;
