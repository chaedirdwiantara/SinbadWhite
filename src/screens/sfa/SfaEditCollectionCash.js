import { React, View, Text, StyleSheet } from '../../library/reactPackage';
import { useState } from 'react';
  import { TextInputMask } from 'react-native-masked-text';
  import { Fonts } from '../../helpers';
  import masterColor from '../../config/masterColor.json';
const SfaEditCollectionCash = (props) => {
  //DATA PAYMENT CASH
  const [cash, setCash] = useState(props.data.paymentCollection.paidAmount);
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  const textBillingCash = text => {
    if (
      parseInt(text.replace(/[Rp.]+/g, '')) >
      parseInt(props.data.outstanding)
    ) {
      setCash(parseInt(props.data.outstanding))
      props.onChangePaidAmount(parseInt(props.data.outstanding))
      props.isChanged(true);
    } else {
      setCash(parseInt(text.replace(/[Rp.]+/g, '')));
      props.onChangePaidAmount(parseInt(text.replace(/[Rp.]+/g, '')))
      props.isChanged(true);
    }
  };

  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */

  return (
    <View style={{ marginTop: 16 }}>
      <View>
        <Text style={Fonts.type10}>*Jumlah Penagihan</Text>
      </View>
      <View
        style={[
          styles.boxInput,
          { flexDirection: 'row', alignItems: 'center' }
        ]}
      >
        <TextInputMask
          type={'money'}
          options={{
            precision: 0,
            separator: ',',
            delimiter: '.',
            unit: 'Rp ',
            suffixUnit: ''
          }}
          value={cash}
          onChangeText={text => textBillingCash(text)}
          style={[
            Fonts.type17,
            {
              width: '95%',
              borderBottomColor: masterColor.fontBlack10
            }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    boxInput: {
      borderBottomWidth: 1,
      paddingHorizontal: 0,
      paddingVertical: 0,
      borderBottomColor: masterColor.fontBlack10
    }
  });
export default SfaEditCollectionCash;
