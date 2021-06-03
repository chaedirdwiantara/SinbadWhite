import {
    React,
    Component,
    View,
    StyleSheet,
    Text,
    Dimensions,
    Image
  } from '../../library/reactPackage'
  import {
    ModalBottomType1,
    StatusBarBlackOP40
  } from '../../library/component'
  import { GlobalStyle, Fonts } from '../../helpers'
  
  const { height, width } = Dimensions.get('window');
  
  class ModalBottomFailPayment extends Component {
    /**
     * RENDER CONTENT
     */
    renderContent() {
      return (
        <View>
          <StatusBarBlackOP40 />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              source={require('../../assets/images/sinbad_image/cry_sinbad.png')}
              style={GlobalStyle.fullImage}
            />
            <View style={{ marginBottom: 20 }}>
              <Text
                style={[Fonts.type7, { textAlign: 'center', marginBottom: 10 }]}
              >
               {this.props.errorTittle? this.props.errorTittle :'Terjadi Kesalahan'} 
              </Text>
              <Text style={[Fonts.type17, { textAlign: 'center', marginHorizontal: 20 }]}>
                {this.props.text? this.props.text : 'Silahkan Mencoba Kembali'}
              </Text>
            </View>
          </View>
        </View>
      );
    }
    render() {
      return (
        <ModalBottomType1
          open={this.props.open}
          content={this.renderContent()}
          onPress={this.props.onPress}
          title={''}
          buttonTitle={this.props.buttonTitle? this.props.buttonTitle :'Kembali'}
        />
      );
    }
  }
  
  const styles = StyleSheet.create({});
  
  export default ModalBottomFailPayment;
  
  /**
  * ============================
  * NOTES
  * ============================
  * createdBy: 
  * createdDate: 
  * updatedBy: Tatas
  * updatedDate: 07072020
  * updatedFunction:
  * -> Refactoring Module Import
  * 
  */
  
  