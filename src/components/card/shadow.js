import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const ShadowComponent = ({ children, radius, elevation, style, margin }) => {
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
        elevation: elevation,
        borderWidth: 0,
        borderRadius: radius,
        margin: margin
      }}
    >
      <View style={{ ...style, borderRadius: radius }}>{children}</View>
    </View>
  );
};

ShadowComponent.propTypes = {
  children: PropTypes.node,
  radius: PropTypes.number,
  margin: PropTypes.number,
  elevation: PropTypes.number,
  style: PropTypes.object
};

ShadowComponent.defaultProps = {
  children: <View />,
  radius: 0,
  margin: 0,
  elevation: 4,
  style: {}
};

export default ShadowComponent;
/**
 * ============================
 * NOTES
 * ============================
 * createdBy: Erik
 * createdDate: 03082020
 * updatedBy: Dyah
 * updatedDate: 04082020
 * updatedFunction:
 * -> Add view & margin
 *
 */
