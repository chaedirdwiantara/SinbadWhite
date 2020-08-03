import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Dimensions } from 'react-native';
import { Fonts } from '../../helpers';
import { Button } from 'react-native-elements';
import { Color } from '../../config';

const TabsLightHorizontal = ({ listMenu, onChange, value }) => {
  const [active, setActive] = useState(value);

  const { width } = Dimensions.get('screen');

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      legacyImplementation={false}
      data={listMenu}
      renderItem={({ item }) => {
        const row = item;
        return (
          <Button
            type={'clear'}
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
                    ? Color.buttonActiveColorRed
                    : Color.fontBlack100
              }
            ]}
            buttonStyle={{
              backgroundColor: Color.backgroundWhite,
              borderRadius: 0,
              borderBottomWidth: active === row.value ? 4 : 2,
              borderColor:
                active === row.value
                  ? Color.buttonActiveColorRed
                  : Color.fontBlack10,
              paddingHorizontal: 30,
              paddingTop: 20,
              paddingBottom: active === row.value ? 18 : 20
            }}
          />
        );
      }}
      keyExtractor={row => row.value}
      style={{ width: width, padding: 0, maxHeight: 100 }}
    />
  );
};

TabsLightHorizontal.propTypes = {
  value: PropTypes.string,
  listMenu: PropTypes.array,
  onChange: PropTypes.func
};

TabsLightHorizontal.defaultProps = {
  listMenu: [],
  value: '',
  onChange: () => {
    console.log('update');
  }
};

export default TabsLightHorizontal;
