import {
  React,
  Component,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler
} from '../../../library/reactPackage';
import { StatusBarWhite } from '../../../library/component';
import {
  connect,
  bindActionCreators
} from '../../../library/thirdPartyPackage';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import { GlobalStyle, Fonts } from '../../../helpers';
import { Color } from '../../../config';

class ReturnRequestDoneView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.navigationFunction();
  }

  /** === WILL UNMOUNT === */
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleHardwareBackPress
    );
  }

  /**
   * =======================
   * NAVIGATION FUNCTION
   * ======================
   */
  navigationFunction() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleHardwareBackPress
    );
  }

  /** === BACK BUTTON HARDWARE PRESS HANDLING === */
  handleHardwareBackPress = () => {
    NavigationService.customizeReset(1, ['JourneyView', 'MerchantHomeView'], {
      storeName: this.props.merchant.selectedMerchant.storeName
    });
    return true;
  };

  renderImage() {
    return (
      <View style={[styles.boxEmpty]}>
        <Image
          source={require('../../../assets/images/sinbad_image/happy_sinbad.png')}
          style={GlobalStyle.fullImage}
        />
        <View style={styles.boxTitle}>
          <Text style={[Fonts.type7, { textAlign: 'center' }]}>
            Retur Berhasil Dibuat
          </Text>
        </View>
        <View style={styles.boxDescription}>
          <Text style={[Fonts.fontH12Medium, { textAlign: 'center' }]}>
            Admin akan melakukan peninjauan terhadap retur, untuk memantau
            status retur ada di profil toko pada bagian pesanan
          </Text>
        </View>
      </View>
    );
  }

  renderButton() {
    return (
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: Color.fontRed50,
            marginVertical: 12,
            marginHorizontal: 24,
            paddingVertical: 16,
            borderRadius: 8,
            alignItems: 'center',
            borderColor: Color.fontRed50,
            borderWidth: 1
          }}
          onPress={() =>
            NavigationService.customizeReset(
              2,
              ['JourneyView', 'MerchantHomeView', 'ReturnOrderView'],
              { storeName: this.props.merchant.selectedMerchant.storeName }
            )
          }
        >
          <Text style={Fonts.textButtonRedActive}>
            Kembali ke Daftar Faktur
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: Color.fontRed50,
            borderWidth: 1,
            marginHorizontal: 24,
            paddingVertical: 16,
            borderRadius: 8,
            alignItems: 'center'
          }}
          onPress={() =>
            NavigationService.customizeReset(
              1,
              ['JourneyView', 'MerchantHomeView'],
              { storeName: this.props.merchant.selectedMerchant.storeName }
            )
          }
        >
          <Text style={Fonts.textButtonWhiteActive}>Kembali ke Task List</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderContent() {
    return (
      <View
        style={[
          styles.mainContainer,
          {
            alignContent: 'center',
            justifyContent: 'center'
          }
        ]}
      >
        {this.renderImage()}
        {this.renderButton()}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarWhite />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  boxEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  boxTitle: {
    width: '100%',
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 35
  },
  boxDescription: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 12
  }
});

const maptStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  maptStateToProps,
  mapDispatchToProps
)(ReturnRequestDoneView);
