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

class ModalFailedCreateStore extends Component {
  /** SEND TO PARENT */
  toParentFunction(data) {
    this.props.parentFunction(data);
  }
  modalSinbad(){
    return(
      <View style={{ alignItems: 'center', flex: 1, width: '100%' }}>
        <Text style={[Fonts.type7, { paddingVertical: 8 }]}>
          Toko gagal terbuat
        </Text>
        <Text style={Fonts.type17}>
          Alamat toko yang anda pilih di luar
        </Text>
        <Text style={Fonts.type17}>
          area mapping anda, silahkan ulangi pendaftaran atau
        </Text>
        <Text style={Fonts.type17}>
          cek area mapping anda
        </Text>

        <View style={{ width: '100%', paddingTop: 40 }}>
          <ButtonSingle
            borderRadius={4}
            title={'Area Mapping'}
            onPress={() =>
              this.toParentFunction({
                type: 'goToAreaMapping'
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
        {this.modalSinbad()}
      </View>
    );
  }
  /** === RENDER CONTENT === */
  render() {
    return <View>{this.renderModal()}</View>;
  }
}

export default ModalFailedCreateStore;