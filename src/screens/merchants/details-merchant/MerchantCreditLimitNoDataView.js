import {
  React,
  Component,
  View,
  Image,
  Text
} from '../../../library/reactPackage';
import { Fonts } from '../../../helpers';
class MerchantCreditLimitNoDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshLocation: false
    };
  }
  render() {
    return (
      <>
        <View style={{ justifyContent: 'center' }}>
          <View style={{ alignSelf: 'center' }}>
            <View style={{ alignSelf: 'center' }}>
              <Image
                source={require('../../../assets/images/sinbad_image/no_balance_sinbad.png')}
                style={{ width: 230 }}
              />
            </View>
            <View style={{ marginTop: 21 }}>
              <Text
                style={[Fonts.type7, { textAlign: 'center', marginBottom: 10 }]}
              >
                {this.props.topText === undefined || this.props.topText === null
                  ? 'Toko Belum Memiliki Batas Kredit'
                  : this.props.topText}
              </Text>
              <Text style={[Fonts.type17, { textAlign: 'center' }]}>
                {this.props.midText === undefined || this.props.midText === null
                  ? 'Batas kredit toko yang sudah aktif akan '
                  : this.props.midText}
              </Text>
              <Text style={[Fonts.type17, { textAlign: 'center' }]}>
                {this.props.bottomText === undefined ||
                this.props.bottomText === null
                  ? 'otomatis muncul di sini.'
                  : this.props.bottomText}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  }
}
export default MerchantCreditLimitNoDataView;
