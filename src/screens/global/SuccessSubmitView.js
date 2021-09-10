import {
  React,
  Component,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  StatusBar,
  ImageBackground
} from '../../library/reactPackage';

import { Fonts } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import { ButtonSingle } from '../../library/component';
import NavigationService from '../../navigation/NavigationService';

let ScreenHeight = Dimensions.get('window').height;
class SuccessSubmitView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: this.props.navigation.state
    };
  }

  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
  /** === STATUS BAR === */
  renderStatusBar() {
    return (
      <StatusBar
        backgroundColor={masterColor.statusBarGreenOP80}
        barStyle={'light-content'}
      />
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <ButtonSingle
        whiteTransparent
        disabled={false}
        title={'Lihat Hasil Survey'}
        borderRadius={4}
        onPress={() =>
          NavigationService.navigate('MerchantSurveyResultView', {
            readOnly: false
          })
        }
      />
    );
  }
  /** === RENDER TITLE CAPTION === */
  renderTitleCaption() {
    return (
      <Text style={[Fonts.type6, { marginTop: '10%', alignContent: 'center' }]}>
        Survei Berhasil Dikirim
      </Text>
    );
  }
  /** === RENDER CAPTION === */

  renderCaption() {
    return (
      <Text
        style={[
          Fonts.type25,
          { marginTop: '3%', marginBottom: '5%', textAlign: 'center' }
        ]}
      >
        {`Terima kasih sudah menyelesaikan "${this?.props?.navigation?.state
          ?.params?.surveyName ?? '-'}" `}
      </Text>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.centeredCaption}>
        <Image
          source={require('../../assets/images/afterSubmit/Check_Illustration.png')}
          style={styles.imageSuccess}
        />
        {this.renderTitleCaption()}
        {this.renderCaption()}
        {this.renderButton()}
      </View>
    );
  }
  /** === RENDER BACKGROUND === */
  renderBackground() {
    return (
      <ImageBackground
        source={require('../../assets/images/background/bg_confirm.png')}
        style={styles.boxImage}
      >
        {this.renderContent()}
      </ImageBackground>
    );
  }
  /** === RENDER MAIN === */
  render() {
    return (
      <React.Fragment>
        {this.renderStatusBar()}
        {this.renderBackground()}
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  boxContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxImage: {
    height: ScreenHeight,
    width: '100%'
  },
  centeredCaption: {
    position: 'absolute',
    top: 200,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center'
  },
  imageSuccess: {
    width: 150,
    height: 150
  }
});

export default SuccessSubmitView;
