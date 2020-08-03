import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Fonts } from '../../helpers';
import { Button } from 'react-native-elements';
import { Color } from '../../config';
import { View } from 'react-native';

const TabsCustom = ({ listMenu, onChange, value }) => {
  const [active, setActive] = useState(value);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
      }}
    >
      {listMenu.map((row, i) => (
        <Button
          key={i.toString()}
          containerStyle={{
            margin: 5
          }}
          onPress={() => {
            setActive(row.value);
            onChange(row.value);
          }}
          title={row.title}
          titleStyle={[
            Fonts.textButtonRedActive,
            {
              color:
                active === row.value
                  ? Color.buttonActiveColorWhite
                  : Color.fontBlack100
            }
          ]}
          buttonStyle={{
            backgroundColor:
              active === row.value
                ? Color.buttonActiveColorRed
                : Color.backgroundWhite,
            borderRadius: 7,
            borderWidth: 1,
            borderColor:
              active === row.value ? 'transparent' : Color.fontBlack40,
            paddingHorizontal: 10
          }}
        />
      ))}
    </View>
  );
};

TabsCustom.propTypes = {
  value: PropTypes.string,
  listMenu: PropTypes.array,
  onChange: PropTypes.func
};

TabsCustom.defaultProps = {
  listMenu: [],
  value: '',
  onChange: () => {
    console.log('update');
  }
};

export default TabsCustom;
