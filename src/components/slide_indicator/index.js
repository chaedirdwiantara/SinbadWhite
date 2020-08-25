import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Color } from '../../config';

const styles = StyleSheet.create({
  miniCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5
  }
});

// prettier-ignore
const SlideIndicator = ({
  totalItem,
  activeIndex,
  activeColor,
  disactiveColor
}) => {

  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    let newIndicator = [];
    for (let i = 0; i < totalItem; i++){
      newIndicator.push(i);
    }
    setIndicators(newIndicator);
  }, [totalItem]);

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        {
          indicators.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.miniCircle,
                  {
                    backgroundColor: activeIndex === index ? activeColor : disactiveColor
                  }
                ]}
              />
            );
          })
        }
      </View>
    </View>
  );
};

SlideIndicator.propTypes = {
  totalItem: PropTypes.number,
  activeIndex: PropTypes.number,
  activeColor: PropTypes.string,
  disactiveColor: PropTypes.string
};

SlideIndicator.defaultProps = {
  totalItem: 0,
  activeIndex: 0,
  activeColor: Color.mainColor,
  disactiveColor: Color.fontBlack60
};

export default SlideIndicator;
