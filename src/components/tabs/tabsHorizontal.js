import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Dimensions } from 'react-native';
import { Fonts } from '../../helpers';
import { Button } from 'react-native-elements';
import { Color } from '../../config';

const TabsHorizontal = ({ listMenu, onChange, value }) => {
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
            containerStyle={{
              margin: 10
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
              paddingHorizontal: 30
            }}
          />
        );
      }}
      keyExtractor={row => row.value}
      style={{ width: width, padding: 20, maxHeight: 100 }}
    />
  );
};

TabsHorizontal.propTypes = {
  value: PropTypes.string,
  listMenu: PropTypes.array,
  onChange: PropTypes.func
};

TabsHorizontal.defaultProps = {
  listMenu: [],
  value: '',
  onChange: () => {
    console.log('update');
  }
};

export default TabsHorizontal;
