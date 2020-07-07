import {
  React,
  Component,
  View,
  StyleSheet,
  Image,
  Text
} from '../../library/reactPackage'
import { GlobalStyle, Fonts } from '../../helpers'
import {
  StatusBarRedOP50,
  ButtonSingleSmall,
  ModalBottomType1
} from '../../library/component'
import masterColor from '../../config/masterColor.json';

class ModalBottomErrorNoUrban extends Component {
  /**
   * ========================
   * RENDER VIEW
   * ========================
   */
  /** === RENDER DATA ==== */
  renderData() {
    return (
      <View style={{ paddingHorizontal: 16 }}>
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
              Alamat Tidak Terdaftar
            </Text>
            <Text style={[Fonts.type17, { textAlign: 'center' }]}>
              Sepertinya alamat Anda tidak terdaftar, Silahkan coba beberapa
              saat lagi atau hubungi CS Sinbad
            </Text>
          </View>
        </View>
      </View>
    );
  }
  /** === RENDER BUTTON === */
  renderButton() {
    return (
      <View style={styles.buttonContainer}>
        <View style={{ padding: 16, flex: 1 }}>
          <ButtonSingleSmall
            flex
            white
            disabled={false}
            loading={false}
            onPress={this.props.backToHome}
            title={'Kembali'}
            borderRadius={4}
          />
        </View>
        <View style={{ padding: 16, flex: 1 }}>
          <ButtonSingleSmall
            flex
            disabled={false}
            loading={false}
            onPress={this.props.callCS}
            title={'Hubungi CS'}
            borderRadius={4}
          />
        </View>
      </View>
    );
  }
  /** === RENDER MAIN CONTENT === */
  renderContent() {
    return (
      <View style={styles.container}>
        <StatusBarRedOP50 />
        <View style={styles.contentContainer}>
          {this.renderData()}
          {this.renderButton()}
        </View>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <ModalBottomType1
        open={this.props.open}
        title={''}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    width: '100%'
  },
  contentContainer: {
    marginTop: -30,
    flex: 1
  },
  /** for button */
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default ModalBottomErrorNoUrban;

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
