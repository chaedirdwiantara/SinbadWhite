import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import GlobalStyle from '../helpers/GlobalStyle';
import masterColor from '../config/masterColor.json';
import Fonts from '../helpers/GlobalFont';

/**
 * =====================
 * Props:
 * - shadow
 * - data
 * =====================
 */

class TagList extends Component {
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
    this.props.parentFunction({ type: 'portfolio', data: index });
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
          { backgroundColor: masterColor.mainColor },
          GlobalStyle.shadow
        ]
      : [styles.boxChip, { backgroundColor: masterColor.mainColor }];
  }
  /** === ACTIVE TAG VIEW === */
  renderTagActive(item) {
    return (
      <View style={this.tagActiveStyle()}>
        <Text style={Fonts.type2}>{item}</Text>
      </View>
    );
  }
  /** === INACTIVE TAG VIEW (STYLE)=== */
  tagInactiveStyle() {
    return this.props.shadow
      ? [
          styles.boxChip,
          {
            backgroundColor: masterColor.backgroundWhite,
            borderColor: masterColor.fontBlack60
          },
          GlobalStyle.shadow
        ]
      : [
          styles.boxChip,
          {
            backgroundColor: masterColor.backgroundWhite,
            borderWidth: 1,
            borderColor: masterColor.fontBlack60
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
        <Text style={Fonts.type9}>{item}</Text>
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

const mapStateToProps = ({}) => {
  return {};
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(TagList);
