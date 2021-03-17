import {
    React,
    Component,
    View,
    Text,
    Image
  } from '../../library/reactPackage';
  import {
    ModalBottomType3,
    ButtonSingle,
    StatusBarRedOP50,
    StatusBarBlackOP40
  } from '../../library/component';
  import { Fonts } from '../../helpers';
  import NavigationService from '../../navigation/NavigationService';

  class ModalOmsErrorOtpKur extends Component {
   
    modalText(){
      return(
        <View style={{ alignItems: 'center', flex: 1, width: '100%' }}>
          <Text style={[Fonts.type7, { paddingVertical: 8 }]}>
            Tidak Dapat Mengirim Kode Ulang
          </Text>
          <Text style={[Fonts.type17, {marginTop: 8, marginBottom: 4}]}>
          Maaf, Anda sudah melewati batas maksimum  
          </Text>
          <Text style={[Fonts.type17, {marginBottom: 4}]}>
          percobaan verifikasi OTP. Anda dapat mencoba
          </Text>
          <Text style={[Fonts.type17, {marginBottom: 4}]}>
          kembali dalam 1 x 24 jam atau gunakan Tipe
          </Text>
          <Text style={[Fonts.type17]}>
          Pembayaran lainnya. Hubungi Customer Service
          </Text>
          <Text style={[Fonts.type17, {marginBottom: 4}]}>
         untuk informasi lebih lanjut.
          </Text>
         
  
          <View style={{ width: '100%', paddingTop: 32 }}>
            <ButtonSingle
              borderRadius={4}
              title={'Oke, Saya Mengerti'}
              onPress={this.props.onPress
              }
            />
          </View>
        </View>
      )
    }
   
    /** === RENDER MODAL === */
    renderModal() {
      return (
        <ModalBottomType3
          title={this.props.title || ''}
          open={this.props.open}
          close={this.props.close}
          typeClose={'cancel'}
          content={this.renderModalContent()}
          onPress={this.props.onPress}
        />
      );
    }
    /** === RENDER MODAL CONTENT === */
    renderModalContent() {
      return (
        <View style={{ alignItems: 'center' }}>
          {this.props.white ? <StatusBarBlackOP40 /> : <StatusBarRedOP50 />}
          <Image
            source={require('../../assets/images/sinbad_image/cry_sinbad.png')}
            style={{ width: 208, height: 156 }}
          />
          {this.modalText()}
        </View>
      );
    }
    /** === RENDER CONTENT === */
    render() {
      return <View>{this.renderModal()}</View>;
    }
  }
  
  export default ModalOmsErrorOtpKur;
  
  /**
   * ============================
   * NOTES
   * ============================
   * createdBy: ayu
   * createdDate: 16032021
   * updateBy: 
   * updatedDate: 
   * updatedFunction:
   */
  