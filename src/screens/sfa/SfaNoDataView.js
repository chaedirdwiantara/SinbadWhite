import {
    React,
    View,
    Image,
    Text
} from '../../library/reactPackage';
import { Fonts} from '../../helpers';

const SfaNoDataView = () => {
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
              Hasil Pencarian Tidak Ditemukan
            </Text>
            <Text style={[Fonts.type17, { textAlign: 'center' }]}>
              Hasil yang anda cari tidak ditemukan,
            </Text>
            <Text style={[Fonts.type17, { textAlign: 'center' }]}>
              silahkan coba kembali
            </Text>
          </View>
        </View>
      </View>
    );
  };

  export default SfaNoDataView