import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import GlobalStyle from '../../helpers/GlobalStyle';

class ButtonMenuType1 extends Component {
  /**
   * === CONTENT ===
   */
  renderContent() {
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.contentContainer,
            { paddingLeft: this.props.child ? 20 : 16 }
          ]}
          onPress={this.props.onPress}
        >
          <Text style={Fonts.type8}>{this.props.title}</Text>
          <View style={styles.boxArrow}>
            <MaterialIcon
              name="chevron-right"
              color={masterColor.fontBlack40}
              size={24}
            />
          </View>
        </TouchableOpacity>
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
      </View>
    );
  }
  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%'
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16
  },
  boxArrow: {
    position: 'absolute',
    right: 10
  }
});

const mapStateToProps = ({}) => {
  return {};
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(ButtonMenuType1);
