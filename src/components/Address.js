import {
  React,
  Component,
  View,
  Text
} from '../library/reactPackage'

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
    let maxLength = 55;
    if (this.props.maxLength) {
      maxLength = this.props.maxLength;
    }
    return (
      <View>
        {this.combineAddress().length >= maxLength ? (
          <Text
            style={[
              this.props.font,
              { textTransform: 'capitalize', textAlign: this.props.position }
            ]}
          >
            {this.combineAddress().substring(0, maxLength)}...
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

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 02072021
 * updatedFunction:
 * -> add maximal character for address.
 *
 */
