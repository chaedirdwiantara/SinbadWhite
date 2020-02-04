import React, { Component } from 'react';
import { View } from 'react-native';
import Text from 'react-native-text';

/**
 * ===================
 * PROPS
 * ===================
 * - font
 * - address
 * - urban
 * - province
 */

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    };
  }
  /**
   * =================
   * FUNCTIONAL
   * =================
   */
  /** === COMBINE ADDRESS === */
  combineAddress() {
    let address = '';
    let urban = '';
    let province = '';
    if (this.props.address) {
      address = this.props.address ? this.props.address : '';
    }
    if (this.props.urban) {
      urban =
        (this.props.urban.urban ? `, ${this.props.urban.urban}` : '') +
        (this.props.urban.district ? `, ${this.props.urban.district}` : '') +
        (this.props.urban.city ? `, ${this.props.urban.city}` : '');
    }
    if (this.props.urban) {
      province = this.props.urban.province
        ? `, ${this.props.urban.province.name}`
        : '';
    }
    return address + urban + province;
  }
  /**
   * =================
   * RENDER VIEW
   * =================
   */
  /** === IF TEXT SUBSTRING === */
  renderSubstring() {
    return (
      <View>
        {this.combineAddress().length >= 55 ? (
          <Text
            style={[
              this.props.font,
              { textTransform: 'capitalize', textAlign: this.props.position }
            ]}
          >
            {this.combineAddress().substring(0, 55)}...
          </Text>
        ) : (
          <Text
            style={[
              this.props.font,
              { textTransform: 'capitalize', textAlign: this.props.position }
            ]}
          >
            {this.combineAddress()}
          </Text>
        )}
      </View>
    );
  }
  /** === IF FULL TEXT === */
  renderNotSubstring() {
    return (
      <View>
        <Text
          style={[
            this.props.font,
            { textTransform: 'capitalize', textAlign: this.props.position }
          ]}
        >
          {this.combineAddress()}
        </Text>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.props.substring
          ? this.renderSubstring()
          : this.renderNotSubstring()}
      </View>
    );
  }
}

export default Address;
