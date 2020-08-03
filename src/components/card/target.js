import React from 'react';
import { View, StyleSheet, Text } from '../../library/reactPackage';
import masterColor from '../../config/masterColor.json';
import { Fonts } from '../../helpers';
import ShadowComponent from '../../components/card/shadow';
import PropTypes from 'prop-types';
import { Color } from '../../config';

const TargetCard = ({ data: { target, achieve, date, status } }) => {
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
          <Text style={[Fonts.textHeaderPage, styles.textContent]}>Target</Text>
          <Text style={[Fonts.textHeaderPage, styles.textContent]}>
            Tanggal
          </Text>
          <Text style={[Fonts.textHeaderPage, styles.textContent]}>
            Pencapaian
          </Text>
          <Text style={[Fonts.textHeaderPage, styles.textContent]}>
            Target Status
          </Text>
        </View>
        <View>
          <Text style={[Fonts.type13, styles.textContent]}>{target}</Text>
          <Text style={[Fonts.type13, styles.textContent]}>{date}</Text>
          <Text style={[Fonts.type13, styles.textContent]}>{achieve}</Text>
          <Text
            style={[
              Fonts.type13,
              styles.textContent,
              {
                color: status ? Color.fontGreen60 : Color.fontRed60
              }
            ]}
          >
            {status ? 'Achieved' : 'Not Achieved'}
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
    color: '#757575'
  }
});

TargetCard.propTypes = {
  data: PropTypes.object
};

TargetCard.defaultProps = {
  data: {
    date: 'loading',
    target: 0,
    achieve: 0,
    status: true
  }
};

export default TargetCard;
