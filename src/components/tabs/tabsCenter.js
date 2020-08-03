import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Fonts } from '../../helpers';
import { Button } from 'react-native-elements';
import { Color } from '../../config';
import { View } from 'react-native';

const TabsCenter = ({ listMenu, onChange, value }) => {
  const [active, setActive] = useState(value);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Color.fontBlack10,
        borderRadius: 15
      }}
    >
      {listMenu.map((row, i) => (
        <Button
          key={i.toString()}
          containerStyle={{
            flex: 1,
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
                active === row.value ? Color.fontBlack100 : Color.fontBlack60
            }
          ]}
          buttonStyle={{
            backgroundColor:
              active === row.value ? Color.backgroundWhite : 'transparent',
            borderRadius: 15,
            paddingHorizontal: 10
          }}
        />
      ))}
    </View>
  );
};

TabsCenter.propTypes = {
  value: PropTypes.string,
  listMenu: PropTypes.array,
  onChange: PropTypes.func
};

TabsCenter.defaultProps = {
  listMenu: [],
  value: '',
  onChange: () => {
    console.log('update');
  }
};

export default TabsCenter;
