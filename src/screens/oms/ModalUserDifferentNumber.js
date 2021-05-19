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

  class ModalUserDifferentNumber extends Component {
   
    modalText(){
      return(
        <View style={{ alignItems: 'center', flex: 1, width: '100%' }}>
          <Text style={[Fonts.type7, { paddingVertical: 8 }]}>
            Bukan Nomor Anda ?
          </Text>
          <Text style={[Fonts.type17, {marginTop: 8, marginBottom: 4}]}>
          Apabila nomor yang tertera bukan milik Anda, silakan 
          </Text>
          <Text style={Fonts.type17}>
          menghubungi Customer Service untuk merubahnya
          </Text>
  
          <View style={{ width: '100%', paddingTop: 40 }}>
            <ButtonSingle
              borderRadius={4}
              title={'Hubungi Customer Service'}
              onPress={() =>  NavigationService.navigate('ProfileView')
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
            source={require('../../assets/images/sinbad_image/failed_error.png')}
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
  
  export default ModalUserDifferentNumber;
  
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
  