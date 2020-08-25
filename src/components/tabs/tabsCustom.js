import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Fonts } from '../../helpers';
import { Button } from 'react-native-elements';
import { Color } from '../../config';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';

export const typeCustomTabs = {
  default: 'default',
  redScroll: 'redScroll',
  whiteScroll: 'whiteScroll',
  round: 'round'
};

const TabsCustom = ({ listMenu, onChange, value, type }) => {
  const [active, setActive] = useState(value);
  const { width } = Dimensions.get('screen');

  if (type === typeCustomTabs.redScroll) {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        data={listMenu}
        renderItem={({ item, index }) => {
          const row = item;
          return (
            <Button
              containerStyle={{
                marginLeft: index === 0 ? 40 : 5,
                marginRight: index === listMenu.length - 1 ? 50 : 5
              }}
              onPress={() => {
                setActive(row.value);
                onChange(row.value);
              }}
              title={row.title}
              titleStyle={[
                Fonts.type16,
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
                paddingHorizontal: 15
              }}
            />
          );
        }}
        keyExtractor={row => row.value}
        style={{ width: width, paddingVertical: 20, maxHeight: 100 }}
      />
    );
  } else if (type === typeCustomTabs.whiteScroll) {
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
                Fonts.type16,
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
                paddingHorizontal: 15,
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
  } else if (type === typeCustomTabs.round) {
    return (
      <View style={styles.tabsContainerRound}>
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
            titleStyle={[Fonts.type16]}
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
  }

  return (
    <View style={styles.tabsContainer}>
      {listMenu.map((row, i) => (
        <Button
          key={i.toString()}
          containerStyle={{
            margin: 5,
            flex: 1
          }}
          onPress={() => {
            setActive(row.value);
            onChange(row.value);
          }}
          title={row.title}
          titleStyle={[
            Fonts.type11,
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
            borderColor:
              active === row.value ? 'transparent' : Color.fontBlack40,
            borderRadius: 7,
            borderWidth: 1
          }}
        />
      ))}
    </View>
  );
};

TabsCustom.propTypes = {
  value: PropTypes.string,
  listMenu: PropTypes.array,
  onChange: PropTypes.func,
  type: PropTypes.string
};

TabsCustom.defaultProps = {
  listMenu: [],
  value: '',
  onChange: () => {
    console.log('update');
  },
  type: 'default'
};

const styles = StyleSheet.create({
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  tabsContainerRound: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Color.fontBlack10,
    borderRadius: 15
  }
});

export default TabsCustom;
