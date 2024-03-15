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
const InputAmount = props => {
  const value = props?.value;
  const error = props?.error;

  return (
    <>
      <Text style={[Fonts.type10]}>{props?.title}</Text>
      <View
        style={[
          GlobalStyle.boxInput,
          {
            flexDirection: 'row',
            alignItems: 'center'
          }
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
      <View
        style={[
          GlobalStyle.lines,
          {
            marginBottom: 8,
            borderColor: error ? Color.fontRed50 : Color.fontBlack40
          }
        ]}
      />
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

export default InputAmount;
