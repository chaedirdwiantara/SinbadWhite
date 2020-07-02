import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect
} from '../../../library/thirdPartyPackage';
import {
  InputMapsType1,
  InputType2,
  InputType4
} from '../../../library/component';
import { Fonts } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import ToastSuccessUpdate from '../reusable-view/ToastSuccessUpdate';

class MerchantDetailAddressView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshLocation: false
    };
  }
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 16, alignItems: 'center' }}
          onPress={() =>
            NavigationService.navigate('MerchantEditView', {
              title: 'Alamat Toko',
              type: 'merchantAddress'
            })
          }
        >
          <Text style={Fonts.type29}>Ubah</Text>
        </TouchableOpacity>
      )
    };
  };
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  componentDidMount() {
    this.props.saveLongLatForEdit({
      latitude: this.props.merchant.dataMerchantVolatile.latitude,
      longitude: this.props.merchant.dataMerchantVolatile.longitude
    });
    this.setState({ refreshLocation: true });
    setTimeout(() => {
      this.setState({ refreshLocation: false });
    }, 100);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.global.latitude !== this.props.global.latitude ||
      prevProps.global.longitude !== this.props.global.longitude
    ) {
      this.setState({ refreshLocation: true });
      setTimeout(() => {
        this.setState({ refreshLocation: false });
      }, 100);
    }
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <ScrollView>
        <View style={{ paddingTop: 16, paddingBottom: 50 }}>
          <InputMapsType1
            title={'Koordinat Lokasi'}
            selectedMapLong={this.props.merchant.dataMerchantVolatile.longitude}
            selectedMapLat={this.props.merchant.dataMerchantVolatile.latitude}
            refresh={this.state.refreshLocation}
          />
          <InputType4
            title={'Provinsi'}
            editable={false}
            value={this.props.merchant.dataMerchantVolatile.province}
            placeholder={'-'}
            marginBottom={16}
          />
          <InputType4
            title={'Kota'}
            editable={false}
            value={this.props.merchant.dataMerchantVolatile.city}
            placeholder={'-'}
            marginBottom={16}
          />
          <InputType4
            title={'Kecamatan'}
            editable={false}
            value={this.props.merchant.dataMerchantVolatile.district}
            placeholder={'-'}
            marginBottom={16}
          />
          <InputType4
            title={'Kelurahan'}
            editable={false}
            value={this.props.merchant.dataMerchantVolatile.urban}
            placeholder={'-'}
            marginBottom={16}
          />
          <InputType4
            title={'Kodepos'}
            editable={false}
            value={this.props.merchant.dataMerchantVolatile.zipCode}
            placeholder={'-'}
            marginBottom={16}
          />
          <InputType2
            title={'Alamat'}
            editable={false}
            value={this.props.merchant.dataMerchantVolatile.address}
            placeholder={'-'}
          />
          <InputType2
            title={'Catatan Alamat'}
            editable={false}
            value={this.props.merchant.dataMerchantVolatile.noteAddress}
            placeholder={'-'}
          />
        </View>
      </ScrollView>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <ToastSuccessUpdate />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  }
});

const mapStateToProps = ({ merchant, global }) => {
  return { merchant, global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantDetailAddressView);
