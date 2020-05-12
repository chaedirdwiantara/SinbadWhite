import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from 'react-native-text';
import { connect } from 'react-redux';
import masterColor from '../../config/masterColor';
import Fonts from '../../helpers/GlobalFont';

class MerchantTabView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'list'
    };
  }
  /**
   * ======================
   * FUNCTIONAL
   * ======================
   */
  /** SEND DATA TO PARENT */
  toParentChangeTab(section) {
    this.props.parentFunction({ type: 'section', data: section });
  }
  /** SAVE DATA TO STATE */
  changeTabs(section) {
    this.setState({ activeTab: section });
    this.toParentChangeTab(section);
  }
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /** === STYLE === */
  styleTabs(section) {
    return this.state.activeTab === section
      ? [
          styles.boxTabItem,
          {
            borderBottomWidth: 2,
            borderBottomColor: masterColor.mainColor
          }
        ]
      : [
          styles.boxTabItem,
          {
            borderBottomWidth: 1,
            borderBottomColor: masterColor.fontBlack10
          }
        ];
  }
  /** === SECTION LIST === */
  renderSectionList() {
    return this.state.activeTab === 'list' ? (
      <View style={this.styleTabs('list')}>
        <Text
          style={
            this.state.activeTab === 'list'
              ? [Fonts.type11, { marginBottom: -1 }]
              : Fonts.type10
          }
        >
          List
        </Text>
      </View>
    ) : (
      <TouchableOpacity
        style={this.styleTabs('list')}
        onPress={() => this.changeTabs('list')}
      >
        <Text
          style={
            this.state.activeTab === 'list'
              ? [Fonts.type11, { marginBottom: -1 }]
              : Fonts.type10
          }
        >
          List
        </Text>
      </TouchableOpacity>
    );
  }
  /** === SECTION MAP === */
  renderSectionMap() {
    return this.state.activeTab === 'map' ? (
      <View style={this.styleTabs('map')}>
        <Text
          style={
            this.state.activeTab === 'map'
              ? [Fonts.type11, { marginBottom: -1 }]
              : Fonts.type10
          }
        >
          Map
        </Text>
      </View>
    ) : (
      <TouchableOpacity
        style={this.styleTabs('map')}
        onPress={() => this.changeTabs('map')}
      >
        <Text
          style={
            this.state.activeTab === 'map'
              ? [Fonts.type11, { marginBottom: -1 }]
              : Fonts.type10
          }
        >
          Map
        </Text>
      </TouchableOpacity>
    );
  }
  /** === MAIN VIEW === */
  render() {
    return (
      <View style={styles.boxTabs}>
        {this.renderSectionList()}
        {this.renderSectionMap()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxTabs: {
    height: 44,
    flexDirection: 'row'
  },
  boxTabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(MerchantTabView);
