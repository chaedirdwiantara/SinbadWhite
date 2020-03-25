import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from 'react-native-text';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';

class DropdownType1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ======================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER TITLE === */
  renderTitle() {
    return (
      <View style={styles.boxTitle}>
        <Text style={Fonts.type32}>{this.props.title}</Text>
      </View>
    );
  }
  /** === RENDER BAR === */
  selectedDropdown() {
    return (
      <TouchableOpacity
        style={styles.boxInput}
        onPress={this.props.openDropdown}
      >
        <View>
          {this.props.selectedDropdownText !== '' ? (
            <Text style={Fonts.type24}>{this.props.selectedDropdownText}</Text>
          ) : (
            <Text style={Fonts.type33}>{this.props.placeholder}</Text>
          )}
        </View>
        <View style={styles.boxArrow}>
          <MaterialIcon
            name="chevron-right"
            color={masterColor.fontBlack60}
            size={24}
          />
        </View>
      </TouchableOpacity>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        {this.renderTitle()}
        {this.selectedDropdown()}
        <View style={styles.spacing} />
      </View>
    );
  }
  /** === MAIN VIEW === */
  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: masterColor.backgroundWhite
  },
  contentContainer: {
    paddingHorizontal: 16
  },
  boxTitle: {
    paddingBottom: 16
  },
  boxInput: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomColor: masterColor.fontBlack40
  },
  boxArrow: {
    position: 'absolute',
    right: 0,
    bottom: 4
  },
  spacing: {
    marginBottom: 12
  }
});

export default DropdownType1;
