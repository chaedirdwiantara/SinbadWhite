import React from 'react';
import { View, StyleSheet, Text } from '../../library/reactPackage';
import masterColor from '../../config/masterColor.json';
import { Fonts } from '../../helpers';
import ShadowComponent from '../../components/card/shadow';
import PropTypes from 'prop-types';
import moment from 'moment';
// import { Color } from '../../config';

const TargetCard = ({
  data: { target, achieved, date },
  type,
  tabsTimeTarget
}) => {
  const parseDate = ({ day, month, year }) => {
    if (tabsTimeTarget === 'monthly') {
      return month;
    }
    return moment(new Date(year, month - 1, day, 0, 0, 0, 0)).format(
      'DD/MM/YYYY'
    );
  };

  return (
    <ShadowComponent radius={12}>
      <View
        style={[
          styles.targetHeader,
          {
            backgroundColor: masterColor.backgroundWhite,
            marginBottom: 0,
            padding: 20,
            borderRadius: 12
          }
        ]}
      >
        <View>
          <Text
            style={[
              Fonts.textHeaderPage,
              type === 'prev' ? styles.textContentPrev : styles.textContent
            ]}
          >
            Target
          </Text>
          <Text
            style={[
              Fonts.textHeaderPage,
              type === 'prev' ? styles.textContentPrev : styles.textContent
            ]}
          >
            {tabsTimeTarget === 'monthly' ? 'Bulan' : 'Tanggal'}
          </Text>
          <Text
            style={[
              Fonts.textHeaderPage,
              type === 'prev' ? styles.textContentPrev : styles.textContent
            ]}
          >
            Pencapaian
          </Text>
          {type === 'prev' ? (
            <Text
              style={[
                Fonts.textHeaderPage,
                type === 'prev' ? styles.textContentPrev : styles.textContent
              ]}
            >
              Target Status
            </Text>
          ) : null}
        </View>
        <View
          style={{
            width: 110
          }}
        >
          <Text
            style={[
              Fonts.type13,
              type === 'prev' ? styles.textContentPrev : styles.textContent
            ]}
          >
            {target}
          </Text>
          <Text
            style={[
              Fonts.type13,
              type === 'prev' ? styles.textContentPrev : styles.textContent
            ]}
          >
            {parseDate(date)}
          </Text>
          <Text
            style={[
              Fonts.type13,
              type === 'prev' ? styles.textContentPrev : styles.textContent
            ]}
          >
            {achieved}
          </Text>
          <Text
            style={[
              Fonts.type13,
              type === 'prev' ? styles.textContentPrev : styles.textContent,
              {
                color: achieved >= target ? '#81C784' : '#ef9a9a'
              }
            ]}
          >
            {achieved >= target ? 'Achieved' : 'Not Achieved'}
          </Text>
        </View>
      </View>
    </ShadowComponent>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  containerList: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  sparator: {
    height: 15,
    width: '100%',
    backgroundColor: masterColor.fontBlack10
  },
  chartContainer: {
    width: '100%',
    height: 300,
    backgroundColor: masterColor.backgroundWhite,
    borderRadius: 7
  },
  targetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  textContent: {
    fontSize: 16,
    marginVertical: 5,
    color: '#000',
    lineHeight: 16
  },
  textContentPrev: {
    fontSize: 16,
    marginVertical: 5,
    color: '#BDBDBD',
    lineHeight: 16
  }
});

TargetCard.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
  tabsTimeTarget: PropTypes.string
};

TargetCard.defaultProps = {
  data: {
    date: 'loading',
    target: 0,
    achieve: 0
  },
  type: 'prev',
  tabsTimeTarget: 'daily'
};

export default TargetCard;
