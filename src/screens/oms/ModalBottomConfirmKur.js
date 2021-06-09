import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
  ModalPopUp,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';

import {
  Button,
  MaterialIcon,
  MaterialCommunityIcons,
  HTMLView
} from '../../library/thirdPartyPackage';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import masterColor from '../../config/masterColor.json';
import { StatusBarRedOP50 } from '../../library/component';
import { Fonts, GlobalStyle, GlobalStyleHtml } from '../../helpers';
import ModalBottomType4 from '../../components/modal_bottom/ModalBottomType4';
import ButtonSingle from '../../components/button/ButtonSingle';

const { width, height } = Dimensions.get('window');

class ModalBottomConfirmKur extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkList: false
    };
  }

  
  /** RENDER TEXT CONTENT */
  renderTextContent() {
    return (
      <>
        <View style={styles.backgroundDetail}>
          <Text style={[Fonts.type8]}>
            Anda mengetahui, bersedia, dan mengizinkan Kami memberikan data-data
            Anda kepada perusahaan afiliasi kami (PT. Aman Cermat Cepat -
            KlikACC dengan ijin OJK nomor KEP-87/D.05/2019) yang merupakan pihak
            ketiga dalam penyaluran kredit.
          </Text>
          <Text style={[Fonts.type8, { marginTop: 16 }]}>
            KlikACC akan menggunakan data tersebut untuk melakukan pemeriksaan
            latar belakang kredit pada data Biro Kredit, maupun pemeriksaan
            dengan pihak ketiga lainnya dengan tujuan untuk menentukan kelayakan
            Anda sebagai calon Peminjam.
          </Text>
          <Text style={[Fonts.type8, { marginTop: 16 }]}>
            Anda akan diarahkan ke halaman KlikACC untuk melanjutkan proses
          </Text>
        </View>
      </>
    );
  }

  /** RENDER CHECKBOX */
  renderCheckBox() {
    const checkList = this.state.checkList;
    return (
      <View style={styles.checkBox}>
        <TouchableOpacity
          onPress={() => this.setState({ checkList: !checkList })}
        >
          {this.state.checkList ? (
            <MaterialCommunityIcons
              color={masterColor.mainColor}
              name="checkbox-marked"
              size={24}
            />
          ) : (
            <MaterialCommunityIcons
              color={masterColor.fontBlack40}
              name="checkbox-blank-outline"
              size={24}
            />
          )}
        </TouchableOpacity>
        <Text style={[Fonts.type10,{marginLeft: 8}]}>
            Saya menyetujui Syarat & Ketentuan yang berlaku
        </Text>
      </View>
    );
  }

  /** RENDER CONTENT */
  renderContent() {
    return (
      <View>
        <StatusBarRedOP50 />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <ScrollView>{this.renderTextContent()}</ScrollView>
            <View>{this.renderCheckBox()}</View>
            <View>
              <ButtonSingle
                loadingPadding={33}
                disabled={!this.state.checkList}
                onPress={this.props.confirmKur}
                title={'Setuju'}
                borderRadius={4}
                style={{ width: '50%' }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ModalBottomType4
        open={this.props.open}
        onPress={this.props.close}
        close={this.props.close}
        typeClose={'close'}
        title={'S & K KUR KlikACC'}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    width: '100%',
    paddingBottom: 0.01 * height
  },
  contentContainer: {
    flex: 1
  },
  backgroundDetail: {
    padding: 16,
    marginTop: 10,
    backgroundColor: 'rgba(232,232,232, 0.4)'
  },
  checkBox: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems:'center'
  }
});

export default ModalBottomConfirmKur;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: Ayu
 * createdDate: 19/03/2021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 *
 *
 */
