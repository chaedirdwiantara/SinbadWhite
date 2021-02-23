import React, { useState } from 'react';
import styles from '../../helpers/GlobalFont';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput
} from '../../library/reactPackage';
import { TextInputMask } from 'react-native-masked-text';
import { InputType5 } from '../../library/component'
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
const SfaAddTagihanCheque = props => {
  const status = props.status;
  const [text, setText] = useState('')
  return (
    <>
      <View>
        <View style={{marginHorizontal: -16, marginTop: 16}}>
          {/* <Text>
            {status === 'available' ? 'Nomor Cek' : '*Nomor Referensi'}
          </Text> */}
          <InputType5
          title={status === 'available' ? 'Nomor Cek' : '*Nomor Referensi'}
          value={text}
          placeholder={status === 'available' ? 'Nomor Cek' : '*Nomor Referensi'}
          keyboardType={'default'}
          text={text => setText(text)}
        />
        </View>
        <View>
          <Text>{status === 'available' ? 'Sumber Bank' : '*Sumber Bank'}</Text>
        </View>
        <TouchableOpacity
          onPress={status === 'available' ? null : console.log('pressed')}
        >
          <Text>
            {status === 'available' ? 'Tanggal Terbit' : '*Tanggal Terbit'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={status === 'available' ? null : console.log('pressed')}
        >
          <Text>
            {status === 'available'
              ? 'Tanggal Jatuh Tempo'
              : '*Tanggal Jatuh Tempo'}
          </Text>
        </TouchableOpacity>
        <View>
          <Text>{status === 'available' ? 'Nilai Cek' : '*Nilai Cek'}</Text>
        </View>
        <View>
          <Text>
            {status === 'available' ? 'Jumlah Penagihan' : '*Jumlah Penagihan'}
          </Text>
        </View>
      </View>
    </>
  );
};

export default SfaAddTagihanCheque;

const style = StyleSheet.create({});
