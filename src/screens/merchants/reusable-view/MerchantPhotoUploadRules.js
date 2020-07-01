import {
  React,
  Component,
  View,
  StyleSheet,
  Text,
  Image
} from '../../../library/reactPackage';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';

class MerchantPhotoUploadRules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesList: [
        '1. Siapkan Kamera',
        '2. Hindari tangan menutupi Kamera',
        '3. Pastikan Foto Toko Terlihat dengan jelas'
      ]
    };
  }
  /**
   * ==============================
   * RENDER VIEW
   * ==============================
   */
  /** === RENDER TITLE ==== */
  renderImageExample() {
    return (
      <View style={{ paddingHorizontal: 16, flexDirection: 'row' }}>
        <Image
          source={require('../../../assets/images/merchant/merchant_rule.png')}
          style={styles.image}
        />
      </View>
    );
  }
  /*** === RENDER RULES LIST === */
  renderRulesList() {
    return (
      <View style={{ padding: 16 }}>
        <Text style={Fonts.type42}>Tata Cara Foto :</Text>
        {this.state.rulesList.map((rule, index) => {
          return (
            <View key={index}>
              <Text style={[Fonts.type23, { marginTop: 10 }]}>{rule}</Text>
            </View>
          );
        })}
      </View>
    );
  }
  /** === RENDER MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderImageExample()}
        {this.renderRulesList()}
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
    aspectRatio: 5 / 2
  }
});

export default MerchantPhotoUploadRules;
