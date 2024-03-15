import React from 'react';
import { View, Text } from '../../../library/reactPackage';
import { GlobalStyle, Fonts } from '../../../helpers';
import { Color } from '../../../config';
import { TextInputMask } from 'react-native-masked-text';

/**
 * CARD HEADER
 * @param {string} title string | Component
 * @param {string} value string
 * @param {error} error boolean
 * @param {any} onChange function
 * @returns
 */
const InputAmountBox = props => {
  const value = props?.value;
  const error = props?.error;
  const placeholder = props?.placeholder;

  return (
    <>
      <Text style={[Fonts.type10]}>{props?.title}</Text>
      <View
        style={[
          GlobalStyle.boxInput,
          {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 4,
            borderColor: Color.fontBlack20,
            marginTop: 4
          }
        ]}
      >
        <TextInputMask
          placeholder={placeholder}
          type={'money'}
          options={{
            precision: 0,
            separator: ',',
            delimiter: '.',
            unit: 'Rp ',
            suffixUnit: ''
          }}
          value={value}
          onChangeText={val => props?.onChange(val)}
          style={[
            Fonts.type17,
            {
              width: '95%'
            }
          ]}
        />
      </View>

      {error ? (
        <View
          style={{
            justifyContent: 'center',
            marginBottom: 16
          }}
        >
          <Text
            style={[
              Fonts.type13,
              {
                color: error ? Color.fontRed50 : Color.fontBlack40
              }
            ]}
          >
            {props?.errorText}
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default InputAmountBox;
