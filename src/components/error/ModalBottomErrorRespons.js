import {
  React,
  Component,
  View,
  Text,
  Image
} from '../../library/reactPackage';
import {
  ModalBottomType1,
  StatusBarRedOP50,
  StatusBarBlackOP40,
  StatusBarBlackOP40Translucent
} from '../../library/component';
import { GlobalStyle, Fonts } from '../../helpers';

class ModalBottomErrorRespons extends Component {
  /**
   * ========================
   * FUNCTIONAL
   * ========================
   */
  checkStatusBar() {
    switch (this.props.statusBarType) {
      case 'red':
        return <StatusBarRedOP50 />;
      case 'white':
        return <StatusBarBlackOP40 />;
      case 'transparent':
        return <StatusBarBlackOP40Translucent />;
      default:
        return <StatusBarRedOP50 />;
    }
  }
  /**
   * ========================
   * RENDER VIEW
   * ========================
   */
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <React.Fragment>
        <View>
          {this.checkStatusBar()}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              source={require('../../assets/images/sinbad_image/cry_sinbad.png')}
              style={GlobalStyle.fullImage}
            />
            <View style={{ marginBottom: 20 }}>
              <Text
                style={[Fonts.type7, { textAlign: 'center', marginBottom: 10 }]}
              >
                Terjadi Kesalahan
              </Text>
              <Text style={[Fonts.type17, { textAlign: 'center' }]}>
                Silahkan Mencoba Kembali
              </Text>
            </View>
          </View>
        </View>
        {this.props.toast}
      </React.Fragment>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <ModalBottomType1
        open={this.props.open}
        content={this.renderContent()}
        onPress={this.props.onPress}
        title={''}
        buttonTitle={'Ok'}
      />
    );
  }
}

export default ModalBottomErrorRespons;
