import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';

/**
 * =====================
 * Props:
 * - shadow
 * - data
 * =====================
 */

class SearchBarType2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: this.props.searchText
    };
  }
  /**
   * =======================
   * FUNCTIONAL
   * ======================
   */
  searchText() {
    this.props.parentFunction({ type: 'search', data: this.state.search });
  }
  /** === CLEART SEARCH INPUT === */
  clearSearch() {
    this.setState({ search: '' });
    this.props.parentFunction({ type: 'search', data: '' });
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
          placeholder={'Cari nama / id toko disini'}
          onChangeText={search => this.setState({ search })}
          style={[Fonts.type8, styles.inputBox]}
        />
      </View>
    );
  }
  /** === SEARCH BAR === */
  renderSearchBar() {
    return (
      <View style={[styles.boxSearchBar, GlobalStyle.shadow]}>
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
    paddingTop: 16,
    paddingHorizontal: 16
  },
  boxSearchBar: {
    height: 41,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'row'
  },
  inputBox: {
    paddingVertical: 0
  }
});

const mapStateToProps = ({}) => {
  return {};
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(SearchBarType2);