import {
  React,
  View,
  Component,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  StyleSheet,
  Text,
  Image
} from '../../library/reactPackage';
import {
  MaterialIcon,
  Modal,
  bindActionCreators,
  connect
} from '../../library/thirdPartyPackage';
import { LoadingPage, ButtonSingle } from '../../library/component';
import { WebView } from 'react-native-webview';
import masterColor from '../../config/masterColor.json';
import { Fonts } from '../../helpers';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
class ModalOmsKurAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async renderBack() {
    this.props.close;
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={[styles.headerContent]}>
          <View style={[styles.headerBody]}>
            <TouchableOpacity onPress={() => this.props.close()}>
              <View>
                <MaterialIcon
                  name="arrow-back"
                  size={24}
                  color={masterColor.backButtonWhite}
                  style={{
                    marginBottom: 8,
                    marginLeft: 8,
                    alignContent: 'flex-start'
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignSelf: 'center', marginLeft: '25%' }}>
            <Text style={Fonts.type35}>KUR KlikAcc</Text>
          </View>
        </View>
      </View>
    );
  }
  renderTitle() {
    return (
      <View style={styles.title}>
        <Text style={[Fonts.type7]}>Fasilitas Kredit Baru!</Text>
      </View>
    );
  }

  renderImage() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../assets/images/kur/kur.png')}
          style={styles.imageKUR}
        />
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/images/kur/klikAcc.png')}
            style={styles.imageKlikAcc}
          />
          <Image
            source={require('../../assets/images/sinbad_image/logo_sinbad.png')}
            style={styles.imageSinbad}
          />
        </View>
      </View>
    );
  }

  renderIntro() {
    return (
      <View style={styles.introText}>
        <Text style={[Fonts.type48, {marginBottom: 8}]}>Melalui Supplier dengan Kredit Usaha Rakyat</Text>
        <Text style={[Fonts.type8]}>
          Kredit Usaha Rakyat (KUR) merupakan sebuah layanan yang diberikan oleh
          Pemerintah. PT. Sinbad Karya Perdagangan (Sinbad) bersama dengan
          Supplier yang terkait bekerja sama dengan PT. Aman Cerman Cepat
          (KlikACC) sebagai penyalur pendanaan.
        </Text>
      </View>
    );
  }

  renderTandC(){
    return (
      <View style={styles.tandcText}>
        <Text style={[Fonts.type8]}>
        Persyaratan mendapatkan fasilitas Kredit Usaha Rakyat:
        </Text>
        <View>
              <View style={{flexDirection:"row"}}>
                <View style={styles.circle} />
                <Text style={[Fonts.type8, {marginLeft: 8, marginTop: 8}]}>Upload Selfie & e-KTP</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <View style={styles.circle} />
                <Text style={[Fonts.type8, {marginLeft: 8, marginTop: 8}]}>Verifikasi Email</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <View style={styles.circle} />
                <Text style={[Fonts.type8, {marginLeft: 8, marginTop: 8}]}>Verifikasi melalui Video Call</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <View style={styles.circle} />
                <Text style={[Fonts.type8, {marginLeft: 8, marginTop: 8}]}>Menyetujui Syarat & Ketentuan melalui Tanda Tangan Digital</Text>
              </View>
            </View>
            <View>
                <Text style={[Fonts.type8, {marginTop: 8}]} >Proses verikasi maksimal 1 x 24 jam, terhitung setelah pembaruan data</Text>
            </View>
      </View>
    )
  }

  renderButtonProcess() {
    return (
      <View >
        <ButtonSingle
          borderRadius={5}
          title={'Hubungi Customer Service'}
          onPress={() =>  NavigationService.navigate('ProfileView')}
        />
      </View>
    );
  }

  renderContent() {
    return (
      <ScrollView>
<View style={{ flex: 1, backgroundColor: masterColor.backgroundWhite }}>
        {this.renderTitle()}
        {this.renderImage()}
        {this.renderIntro()}
        {this.renderTandC()}
        {this.renderButtonProcess()}
      </View>
      </ScrollView>
      
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          style={{ flex: 1 }}
          isVisible={this.props.open}
          coverScreen={true}
          useNativeDriver={true}
          style={styles.mainContainer}
          onPress={this.props.close}
          onRequestClose={() => this.renderBack()}
        >
          {this.renderHeader()}
          {this.renderContent()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0
  },
  contentContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    maxHeight: 0.8 * height,
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000
  },
  boxContentBody: {
    flex: 1,
    paddingTop: 20
  },
  boxContentTitle: {
    marginTop: 18,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boxClose: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    left: 16
  },
  headerContainer: {
    backgroundColor: '#F0444C',
    height: 56,
    justifyContent: 'center'
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row'
  },
  headerBody: {
    marginHorizontal: 8,
    marginVertical: 16
  },
  title: {
    alignItems: 'center',
    marginTop: 24
  },
  imageKUR: {
    height: 144,
    width: 240,
    marginTop: 16,
    resizeMode:'contain'
  },
  imageKlikAcc: {
    height: 25,
    width: 118,
    resizeMode:'contain'
  },
  imageSinbad: {
    marginLeft: 8,
    height: 20,
    width: 69.6,
    resizeMode:'contain'
  },
  introText:{
    paddingHorizontal:17,
    marginTop: 16,
    marginBottom: 8
  },
  tandcText:{
    paddingHorizontal: 17
  },
  circle: {
    backgroundColor: masterColor.mainColor, 
    height: 8, 
    width: 8, 
    marginTop: 11,
    borderRadius: 4
  },
});

const mapStateToProps = ({ oms, merchant, user, permanent }) => {
  return { oms, merchant, user, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalOmsKurAnnouncement);
