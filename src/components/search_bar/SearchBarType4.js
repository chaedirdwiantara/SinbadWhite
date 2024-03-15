import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../library/thirdPartyPackage';
import { Fonts } from '../../helpers';
import { Color } from '../../config'
import * as ActionCreators from '../../state/actions';

/**
 * ===============================================
 * - this search bar for header (navigation option)
 * - save search text to props global
 * ===============================================
 */

class SearchBarType4 extends Component {
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
  /** === CLEAR SAVE SEARCH IF BACK === */
  componentWillUnmount() {
    this.props.saveSearch('');
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
          color={Color.fontBlack60}
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
          color={Color.fontBlack60}
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
          autoFocus={this.props.focus}
          selectionColor={Color.mainColor}
          value={this.state.search}
          placeholder={this.props.placeholder}
          onChangeText={search => {
            this.setState({search})
            this.props.saveSearch(search)
          }}
          style={[Fonts.textInputSearch, styles.inputBox]}
        />
      </View>
    );
  }
  /** === SEARCH BAR === */
  renderSearchBar() {
    return this.props.hide ? (
      <View />
    ) : (
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
    paddingVertical: 6
  },
  boxSearchBar: {
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Color.backgroundWhite,
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchBarType4);

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

