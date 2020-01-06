import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';

class InputMapsType1 extends Component {
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
  selectedMaps() {
    return this.props.selectedMapText !== '' ? (
      <View style={styles.boxInput}>
        <Text>{this.props.selectedMapText}</Text>
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER MAP VIEW === */
  renderMapView() {
    return (
      <TouchableOpacity
        style={styles.boxMapsEmpty}
        onPress={this.props.openMaps}
      >
        <Text style={Fonts.type34}>Pin Lokasi Anda</Text>
      </TouchableOpacity>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        {this.renderTitle()}
        {this.renderMapView()}
        {this.selectedMaps()}
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
  boxMapsEmpty: {
    borderWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: masterColor.fontBlack05,
    height: 90,
    borderRadius: 10,
    borderColor: masterColor.fontBlack60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spacing: {
    marginBottom: 12
  }
});

export default InputMapsType1;
