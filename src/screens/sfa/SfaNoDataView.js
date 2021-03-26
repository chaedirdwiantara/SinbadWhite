import {
    React,
    View,
    Image,
    Text
} from '../../library/reactPackage';
import { Fonts} from '../../helpers';

const SfaNoDataView = (props) => {
    return (
      <View style={{  justifyContent: 'center' }}>
        <View style={{ alignSelf: 'center' }}>
          <View style={{ alignSelf: 'center' }}>
            <Image
              source={require('../../assets/images/sinbad_image/cry_sinbad.png')}
              style={{ height: 141, width: 190 }}
            />
          </View>
          <View style={{ marginTop: 21 }}>
            <Text
              style={[Fonts.type7, { textAlign: 'center', marginBottom: 10 }]}
            >
              {
                props.topText === undefined || props.topText === null 
                ? 'Hasil Pencarian Tidak Ditemukan' 
                : props.topText
              }
            </Text>
            <Text style={[Fonts.type17, { textAlign: 'center' }]}>
              {
                props.midText === undefined || props.midText === null 
                ? 'Hasil yang anda cari tidak ditemukan,' 
                : props.midText
              }  
            </Text>
            <Text style={[Fonts.type17, { textAlign: 'center' }]}>
              {
                props.bottomText === undefined || props.bottomText === null 
                ? 'silahkan coba kembali' 
                : props.bottomText
              }        
            </Text>
          </View>
        </View>
      </View>
    );
  };

  export default SfaNoDataView