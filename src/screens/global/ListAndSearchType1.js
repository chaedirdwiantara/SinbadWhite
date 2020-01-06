import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import ComingSoon from '../../components/empty_state/ComingSoon';
import masterColor from '../../config/masterColor.json';
import { StatusBarRed } from '../../components/StatusBarGlobal';
import SearchBarType3 from '../../components/search_bar/SearchBarType3';

class ListAndSearchType1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =====================
   * FUNCTIONAL
   * ======================
   */
  /** === DID UPDATE === */
  componentDidUpdate(prevProps) {
    if (prevProps.global.search !== this.props.global.search) {
      console.log('call api');
    }
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /**
   * ========================
   * HEADER MODIFY
   * ========================
   */
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: () => (
        <View style={{ width: '100%' }}>
          <SearchBarType3 placeholder={params ? params.placeholder : ''} />
        </View>
      )
    };
  };
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRed />
        <ComingSoon />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  }
});

const mapStateToProps = ({ global }) => {
  return { global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ListAndSearchType1);
