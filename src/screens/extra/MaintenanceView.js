import {
  React,
  Component,
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView
} from '../../library/reactPackage';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import { Fonts } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import { StatusBarTransparentBlack } from '../../library/component';

class MaintenanceView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ===============================
   * FUNCTIONAL
   * ==============================
   */
  /** => DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (
      prevProps.permanent.appMaintenance !== this.props.permanent.appMaintenance
    ) {
      if (!this.props.permanent.appMaintenance) {
        if (this.props.user !== null) {
          NavigationService.navigate('HomeView');
        } else {
          NavigationService.navigate('Auth');
        }
      }
    }
  }
  /** === MAIN === */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarTransparentBlack />
        <View
          style={{
            paddingHorizontal: 30,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1
          }}
        >
          <Image
            source={require('../../assets/images/sinbad_image/maintenance_sinbad.png')}
            style={{
              height: undefined,
              aspectRatio: 1 / 1,
              width: '100%'
            }}
          />
          <Text style={Fonts.type7}>Sinbad Segera Kembali</Text>
          <Text
            style={[Fonts.type109, { textAlign: 'center', paddingTop: 20 }]}
          >
            Kami sedang melakukan sedikit perbaikan,
          </Text>
          <Text style={[Fonts.type109, { textAlign: 'center', paddingTop: 5 }]}>
            silakan coba beberapa saat lagi.
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  }
});

const mapStateToProps = ({ permanent, user }) => {
  return { permanent, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaintenanceView);
