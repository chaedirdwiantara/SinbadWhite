import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList
} from '../../library/reactPackage';
import { SkeletonPlaceholder } from '../../library/thirdPartyPackage';
import masterColor from '../../config/masterColor';
import { GlobalStyle } from '../../helpers';

/**
 * =============================
 * NOTE
 * =============================
 * this skeleton for "MerchantSurveyDisplayPhotoView" (display photo survey)
 */

class SkeletonType26 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4, 5]
    };
  }
  /** === RENDER ITEM SKELETON === */
  renderItem({ item, index }) {
    return (
      <View key={index} style={styles.boxContainer}>
        <SkeletonPlaceholder>
          <View style={{ flex: 1 }}>
            <View style={styles.box} />
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }
  /** === RENDER SKELETON === */
  renderSkeleton() {
    return (
      <View style={[styles.flatlistContainer, GlobalStyle.shadowForBox5]}>
        <SkeletonPlaceholder>
          <View style={{ flex: 1 }}>
            <View style={styles.textSkeleton} />
          </View>
        </SkeletonPlaceholder>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={this.state.data}
          scrollEnabled={false}
          horizontal={true}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
        />
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
    backgroundColor: masterColor.backgroundWhite
  },
  flatlistContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: masterColor.backgroundWhite
  },
  boxContainer: {
    flexDirection: 'row',
    flex: 1
  },
  box: {
    borderRadius: 4,
    width: 51,
    height: 51,
    marginRight: 10,
    marginTop: 12
  },
  textSkeleton: {
    width: '50%',
    height: 12,
    borderRadius: 10
  }
});

export default SkeletonType26;
