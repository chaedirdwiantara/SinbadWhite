/**
 * THIS COMPONENT FOR HOME RECOMMEDATION
 */
import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList
} from '../../library/reactPackage';
import { SkeletonType21, PdpGrid } from '../../library/component';
import { MoneyFormat } from '../../helpers';
import Price from '../../functions/Price';

class ProductListType3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ===========================
   * FUNCTION
   * ==========================
   */
  toParentFunction(item) {
    this.props.parentFunction(item);
  }
  /** === CHECK PRICE ==== */
  checkPrice(item) {
    return MoneyFormat(Price(item));
  }
  /**
   * =======================
   * RENDER VIEW
   * ======================
   */
  /** === ITEM DATA === */
  renderItem({ item, index }) {
    return (
      <View key={index} style={{ width: 147 }}>
        <PdpGrid
          flex
          // promo={item.isBundle}
          image={item.catalogueImages}
          name={item.name}
          price={this.checkPrice(item)}
          orderButton={true}
          onPressOrder={() => this.toParentFunction({ type: 'order', item })}
          onPressCard={() => this.toParentFunction({ type: 'detail', item })}
        />
      </View>
    );
  }
  /** === SEPARATOR FLATLIST === */
  renderSeparator() {
    return <View style={styles.marginPerContent} />;
  }
  /** === DATA VIEW === */
  renderData() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.boxContent}
          initialScrollIndex={0}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={this.props.data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
  /** RENDER SKELETON */
  renderSkeleton() {
    return <SkeletonType21 />;
  }
  /** === MAIN ==== */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.loading ? this.renderSkeleton() : this.renderData()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  boxContent: {
    paddingHorizontal: 11
  },
  marginPerContent: {
    width: 5
  }
});

export default ProductListType3;

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
