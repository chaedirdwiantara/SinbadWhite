import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Text from 'react-native-text';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';

/**
 * props
 * title: ''
 */

class ButtonFloatType1 extends Component {
  /**
   * === CONTENT ===
   */
  renderContent() {
    return (
      <TouchableOpacity style={styles.boxContent} onPress={this.props.push}>
        <AntDesignIcon
          color={masterColor.fontGreen50}
          name={'pluscircle'}
          size={24}
        />
        <View style={{ marginLeft: 6 }}>
          <Text style={Fonts.type25}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxContent: {
    backgroundColor: masterColor.fontBlack80OP90,
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 16,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = ({}) => {
  return {};
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(ButtonFloatType1);
