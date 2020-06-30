import {
  React,
  Component,
  View,
  Text,
  Image
} from '../../../library/reactPackage';
import {
  ModalBottomType3,
  ButtonSingle,
  StatusBarRedOP50,
  StatusBarBlackOP40
} from '../../../library/component';
import { Fonts } from '../../../helpers';

class ModalUserRejected extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      subtitle: ''
    }
  }
  /** SEND TO PARENT */
  toParentFunction(data) {
    this.props.parentFunction(data);
  }
  modalSupplier(){
    return(
      <View style={{ alignItems: 'center', flex: 1, width: '100%' }}>
        <Text style={[Fonts.type7, { paddingVertical: 8 }]}>
          Akun kamu gagal ter-verifikasi
        </Text>
        <Text style={Fonts.type17}>
          Data pada akun kamu gagal terverifikasi nih,
        </Text>
        <Text style={Fonts.type17}>
          Yuk, Periksa halaman profile dan lengkapi data Anda
        </Text>

        <View style={{ width: '100%', paddingTop: 40 }}>
          <ButtonSingle
            borderRadius={4}
            title={'Lengkapi Data Diri'}
            onPress={() =>
              this.toParentFunction({
                type: 'goToProfile'
              })
            }
          />
        </View>
      </View>
    )
  }
  modalSinbad(){
    return(
      <View style={{ alignItems: 'center', flex: 1, width: '100%' }}>
        <Text style={[Fonts.type7, { paddingVertical: 8 }]}>
          Akun kamu gagal verifikasi nih
        </Text>
        <Text style={Fonts.type17}>
          Maaf ya, akun kamu gagal diverifikasi oleh kami.
        </Text>
        <Text style={Fonts.type17}>
          Kirim data ulang atau jika ada pertanyaan
        </Text>
        <Text style={Fonts.type17}>
          telfon CS kami ya!
        </Text>

        <View style={{ width: '100%', paddingTop: 40 }}>
          <ButtonSingle
            borderRadius={4}
            title={'Hubungi CS'}
            onPress={() =>
              this.toParentFunction({
                type: 'goToProfile'
              })
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
          source={require('../../../assets/images/sinbad_image/failed_error.png')}
          style={{ width: 208, height: 156 }}
        />
        {this.props.ModalType === 'sinbad' ? this.modalSinbad() : this.modalSupplier()}
      </View>
    );
  }
  /** === RENDER CONTENT === */
  render() {
    return <View>{this.renderModal()}</View>;
  }
}

export default ModalUserRejected;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: tatas
 * createdDate: 17062020
 * updateBy: tatas
 * updatedDate: 22062020
 * updatedFunction:
 * -> Add function to return data to parent
 * updatedBy: sakti
 * updatedDate: 19062020
 * updatedFunction:
 * -> change 'close' to 'goToProfile' in onPress props
 * -> add status bar white
 * updatedBy: tatas
 * updatedDate: 30062020
 * updatedFunction:
 * -> Modal information rejected from User Sinbad or Supplier
 *
 */
