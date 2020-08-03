import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const ShadowComponent = ({ children, radius }) => {
  return (
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 6,
        borderWidth: 0,
        borderRadius: radius
      }}
    >
      {children}
    </View>
  );
};

ShadowComponent.propTypes = {
  children: PropTypes.node,
  radius: PropTypes.number
};

ShadowComponent.defaultProps = {
  children: <View />,
  radius: 0
};

export default ShadowComponent;
