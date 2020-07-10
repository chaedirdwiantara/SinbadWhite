import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions
} from '../../library/reactPackage'
import {
  SkeletonPlaceholder
} from '../../library/thirdPartyPackage'
import { Color } from '../../config'
import { GlobalStyle } from '../../helpers'

const { width, height } = Dimensions.get('window');

/**
 * =============================
 * NOTE
 * =============================
 * this skeleton for "PDP ORDER VIEW"
 */

class SkeletonType18 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /** === RENDER SKELETON === */
  renderSkuSkeleton() {
    return (
      <View>
        <View style={styles.boxSkuContent}>
          <SkeletonPlaceholder>
            <View style={styles.boxImageSkeleton} />
          </SkeletonPlaceholder>
          <View
            style={{
              paddingHorizontal: 16,
              flex: 1
            }}
          >
            <SkeletonPlaceholder>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    width: '80%',
                    height: 12,
                    marginBottom: 5,
                    borderRadius: 10
                  }}
                />
                <View style={{ width: '50%', height: 12, borderRadius: 10 }} />
              </View>
              <View style={{ flex: 1, marginTop: 10 }}>
                <View
                  style={{
                    width: '50%',
                    height: 10,
                    borderRadius: 10,
                    marginBottom: 5
                  }}
                />
                <View style={{ width: '80%', height: 10, borderRadius: 10 }} />
              </View>
            </SkeletonPlaceholder>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 30,
            paddingHorizontal: 16
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <SkeletonPlaceholder>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    width: '80%',
                    height: 12,
                    borderRadius: 10
                  }}
                />
              </View>
            </SkeletonPlaceholder>
          </View>
          <View style={{ flex: 1 }}>
            <SkeletonPlaceholder>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 28
                  }}
                />
                <View
                  style={{
                    width: '20%',
                    marginHorizontal: 5,
                    height: 13
                  }}
                />
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 28
                  }}
                />
              </View>
            </SkeletonPlaceholder>
          </View>
        </View>
      </View>
    );
  }
  /** === RENDER TOTAL VALUE SKELETON === */
  renderBottomValueSkeleton() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ marginBottom: 5 }}>
          <SkeletonPlaceholder>
            <View style={{ height: 13, width: '70%', borderRadius: 12 }} />
          </SkeletonPlaceholder>
        </View>
        <View>
          <SkeletonPlaceholder>
            <View style={{ height: 12, width: '90%', borderRadius: 12 }} />
          </SkeletonPlaceholder>
        </View>
      </View>
    );
  }
  /** === RENDER BUTTON SKELETON === */
  renderButtonSkeleton() {
    return (
      <View style={{ alignItems: 'flex-end' }}>
        <View style={{ width: '90%' }}>
          <SkeletonPlaceholder>
            <View
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 4
              }}
            />
          </SkeletonPlaceholder>
        </View>
      </View>
    );
  }
  /** === RENDER TOTAL SKELETON === */
  renderTotalSkeleton() {
    return (
      <View style={[styles.boxTotalPriceSkeleton, GlobalStyle.shadowForBox10]}>
        <View style={{ flex: 1 }}>{this.renderBottomValueSkeleton()}</View>
        <View style={{ flex: 1 }}>{this.renderButtonSkeleton()}</View>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderSkuSkeleton()}
        {this.renderTotalSkeleton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  boxSkeleton: {
    width: '100%',
    height: width
  },
  boxTotalPriceSkeleton: {
    marginTop: 0.12 * height,
    flexDirection: 'row',
    paddingVertical: 11,
    paddingHorizontal: 16,
    height: 63
  },
  boxSkuContent: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderRadius: 4
  },
  boxImageSkeleton: {
    height: 70,
    width: 70,
    borderRadius: 10
  }
});

export default SkeletonType18;

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 08072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/

