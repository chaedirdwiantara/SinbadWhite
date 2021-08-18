import { React, Component, View, StyleSheet } from '../../library/reactPackage';
import { SkeletonPlaceholder } from '../../library/thirdPartyPackage';
import masterColor from '../../config/masterColor';

/**
 * =============================
 * NOTE
 * =============================
 * this skeleton for "MerchantNoVisitReasonDetailView" (photo)
 */

class SkeletonType25 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /** === RENDER SKELETON === */
  renderSkeleton() {
    return (
      <View>
        <SkeletonPlaceholder>
          <View
            style={{
              height: 300,
              borderRadius: 8
            }}
          />
        </SkeletonPlaceholder>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return <View style={styles.mainContainer}>{this.renderSkeleton()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: masterColor.backgroundWhite
  }
});

export default SkeletonType25;