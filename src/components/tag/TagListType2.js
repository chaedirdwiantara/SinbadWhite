import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text
} from '../../library/reactPackage'
import { GlobalStyle, Fonts } from '../../helpers'
import { Color } from '../../config'

/**
 * =====================
 * Props:
 * - shadow
 * - data
 * =====================
 */

class TagListType2 extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.state = {
      activeTag: this.props.selected
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * ======================
   */
  /** === SEND DATA TO PARENT === */
  selectTag(index) {
    this.setState({ activeTag: index });
    this.props.parentFunction({ type: 'status', data: index });
  }
  /**
   * =======================
   * RENDER VIEW
   * ======================
   */
  /** === ACTIVE TAG VIEW (STYLE)=== */
  tagActiveStyle() {
    return this.props.shadow
      ? [
          styles.boxChip,
          { backgroundColor: Color.mainColor },
          GlobalStyle.shadow
        ]
      : [styles.boxChip, { backgroundColor: Color.mainColor }];
  }
  /** === ACTIVE TAG VIEW === */
  renderTagActive(item) {
    return (
      <View style={this.tagActiveStyle()}>
        <Text style={Fonts.type2}>{item.title}</Text>
      </View>
    );
  }
  /** === INACTIVE TAG VIEW (STYLE)=== */
  tagInactiveStyle() {
    return this.props.shadow
      ? [
          styles.boxChip,
          {
            backgroundColor: Color.backgroundWhite,
            borderColor: Color.fontBlack60
          },
          GlobalStyle.shadow
        ]
      : [
          styles.boxChip,
          {
            backgroundColor: Color.backgroundWhite,
            borderWidth: 1,
            borderColor: Color.fontBlack60
          }
        ];
  }
  /** === INACTIVE TAG VIEW === */
  renderTagInactive(item, index) {
    return (
      <TouchableOpacity
        onPress={() => this.selectTag(index)}
        style={this.tagInactiveStyle()}
      >
        <Text style={Fonts.type9}>{item.title}</Text>
      </TouchableOpacity>
    );
  }
  /** === ITEM DATA === */
  renderItem({ item, index }) {
    return (
      <View key={index}>
        {this.state.activeTag === index
          ? this.renderTagActive(item)
          : this.renderTagInactive(item, index)}
      </View>
    );
  }
  /** === SEPARATOR FLATLIST === */
  renderSeparator() {
    return <View style={styles.marginPerTag} />;
  }
  /** === DATA VIEW === */
  renderData() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.boxTag}
          initialScrollIndex={0}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={this.props.data}
          extraData={this.props}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
  /** === MAIN VIEW === */
  render() {
    return <View>{this.renderData()}</View>;
  }
}

const styles = StyleSheet.create({
  boxTag: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  boxChip: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 20
  },
  marginPerTag: {
    width: 16
  }
});

export default TagListType2;

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

