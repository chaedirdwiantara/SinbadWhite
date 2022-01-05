import { React, Component, Image } from '../library/reactPackage';
import { DeviceInfo } from '../library/thirdPartyPackage';

const isTab = DeviceInfo.isTablet();

class ImageKit extends Component {
  /**
   * ====================
   * FUNCTIONAL
   * ====================
   */
  /**
   * ====================
   * RENDER VIEW
   * ====================
   */
  render() {
    return (
      <Image
        defaultSource={this.props.defaultSource}
        source={{
          uri: this.props.uri + `?tr=w-${isTab ? 250 : 150}`
        }}
        style={this.props.style}
      />
    );
  }
}

export default ImageKit;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: tatas
 * updatedDate: 24062020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
