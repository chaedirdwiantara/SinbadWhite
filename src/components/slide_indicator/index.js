import React from 'react';
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
class SlideIndicator extends React.Component {
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          {
            this.props.indicators.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.miniCircle,
                    {
                      backgroundColor: this.props.activeIndex === index ? this.props.activeColor : this.props.disactiveColor
                    }
                  ]}
                />
              );
            })
          }
        </View>
      </View>
    );
  }
}

SlideIndicator.propTypes = {
  // node, array, func, bool, object, string, oneOfType([x,y,z])
  indicators: PropTypes.array,
  activeIndex: PropTypes.number,
  activeColor: PropTypes.string,
  disactiveColor: PropTypes.string
};

SlideIndicator.defaultProps = {
  indicators: [],
  activeIndex: 0,
  activeColor: Color.mainColor,
  disactiveColor: Color.fontBlack60
};

export default SlideIndicator;
