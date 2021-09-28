import {
  React,
  Component,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  StatusBar,
  BackHandler,
  ImageBackground
} from '../../library/reactPackage';

import { Fonts } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import { ButtonSingle } from '../../library/component';
import NavigationService from '../../navigation/NavigationService';

const win = Dimensions.get('window');
class SuccessSubmitView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: this.props.navigation.state.params.caption
    };
  }
  /**
   * ==============================
   * FUNCTIONAL
   * ==============================
   */
  /**
   * === BACK ACTION ===
   * @returns {boolean} true & navigate to survey list.
   */
  backAction = () => {
    NavigationService.navigate('MerchantHomeView');
    return true;
  };
  /** === DID MOUNT === */
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction
    );
  }
  /** === WILL UNMOUNT === */
  componentWillUnmount() {
    this.backHandler.remove();
  }
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
  /**
   * === RENDER STATUS BAR ===
   * @returns {ReactElement} render status bar.
   */
  renderStatusBar() {
    return (
      <StatusBar
        backgroundColor={masterColor.statusBarGreenOP80}
        barStyle={'light-content'}
      />
    );
  }
  /**
   * === RENDER BUTTON ===
   * @returns {ReactElement} render button.
   */
  renderButton() {
    const {
      surveyResponseId,
      surveyId,
      surveyName
    } = this.props.navigation.state.params;
    return (
      <ButtonSingle
        whiteTransparent
        disabled={false}
        title={'Lihat Hasil Survey'}
        borderRadius={4}
        onPress={() =>
          NavigationService.navigate('MerchantSurveyResultView', {
            surveyResponseId,
            surveyId,
            surveyName
          })
        }
      />
    );
  }
  /**
   * === RENDER TITLE CAPTION ===
   * @returns {ReactElement} render title caption.
   */
  renderTitleCaption() {
    return (
      <Text style={[Fonts.type6, { marginTop: '10%', alignContent: 'center' }]}>
        Survei Berhasil Dikirim
      </Text>
    );
  }
  /**
   * === RENDER CAPTION ===
   * @returns {ReactElement} render caption.
   */

  renderCaption() {
    const { surveyName } = this.props.navigation.state.params;
    return (
      <Text
        style={[
          Fonts.type25,
          { marginTop: '3%', marginBottom: '5%', textAlign: 'center' }
        ]}
      >
        {`${this.state.caption}`}
      </Text>
    );
  }
  /**
   * === RENDER CONTENT ===
   * @returns {ReactElement} render content.
   */
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
  /**
   * === RENDER BACKGROUND ===
   * @returns {ReactElement} render background.
   */
  renderBackground() {
    return (
      <ImageBackground
        source={require('../../assets/images/background/bg_confirm.png')}
        style={styles.boxImage}
      >
        <View style={styles.contentView}>{this.renderContent()}</View>
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
    width: '100%',
    height: '100%'
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

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: nada
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 28092021
 * updatedFunction:
 * -> add backhandler.
 */
