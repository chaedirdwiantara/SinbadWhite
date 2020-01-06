import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import * as ActionCreators from '../../state/actions';

/**
 * ===============================================
 * - this search bar for header (navigation option)
 * - save search text to props global
 * ===============================================
 */

class SearchBarType3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * ======================
   */
  searchText() {
    this.props.saveSearch(this.state.search);
  }
  /** === CLEAR SEARCH INPUT === */
  clearSearch() {
    this.props.saveSearch('');
    this.setState({ search: '' });
    Keyboard.dismiss();
  }
  /**
   * =======================
   * RENDER VIEW
   * ======================
   */
  /** === SEARCH ICON === */
  renderSearchIcon() {
    return (
      <View style={{ paddingHorizontal: 11 }}>
        <MaterialIcon
          color={masterColor.fontBlack60}
          name={'search'}
          size={24}
        />
      </View>
    );
  }
  /** === DELELE ICON === */
  renderDeleteIcon() {
    return this.state.search !== '' ? (
      <TouchableOpacity
        style={{ paddingHorizontal: 11 }}
        onPress={() => this.clearSearch()}
      >
        <MaterialIcon
          color={masterColor.fontBlack60}
          name={'cancel'}
          size={24}
        />
      </TouchableOpacity>
    ) : (
      <View />
    );
  }
  /** === INPUT ==== */
  renderInput() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          selectionColor={masterColor.mainColor}
          onEndEditing={() => this.searchText()}
          value={this.state.search}
          returnKeyType={'search'}
          placeholder={this.props.placeholder}
          onChangeText={search => this.setState({ search })}
          style={[Fonts.type8, styles.inputBox]}
        />
      </View>
    );
  }
  /** === SEARCH BAR === */
  renderSearchBar() {
    return (
      <View style={styles.boxSearchBar}>
        {this.renderSearchIcon()}
        {this.renderInput()}
        {this.renderDeleteIcon()}
      </View>
    );
  }
  /** === MAIN VIEW === */
  render() {
    return <View style={styles.mainContainer}>{this.renderSearchBar()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 6,
    paddingHorizontal: 16
  },
  boxSearchBar: {
    height: 32,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'row'
  },
  inputBox: {
    paddingVertical: 0
  }
});

const mapStateToProps = ({ global }) => {
  return { global };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(SearchBarType3);
