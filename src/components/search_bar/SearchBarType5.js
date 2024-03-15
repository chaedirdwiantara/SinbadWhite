import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard
} from '../../library/reactPackage';
import { connect, MaterialIcon } from '../../library/thirdPartyPackage';
import { Fonts } from '../../helpers';
import { Color } from '../../config';

/**
 * =====================
 * Props:
 * - shadow
 * - data
 * =====================
 */

class SearchBarType5 extends Component {
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
  /** === CLEAR SEARCH INPUT === */
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
        <MaterialIcon color={Color.fontBlack60} name={'search'} size={24} />
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
        <MaterialIcon color={Color.fontBlack60} name={'cancel'} size={24} />
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
          selectionColor={Color.mainColor}
          onEndEditing={() => this.searchText()}
          value={this.state.search}
          returnKeyType={'search'}
          placeholder={this.props.placeholder}
          onChangeText={search => this.setState({ search })}
          style={[Fonts.textInputSearch, styles.inputBox]}
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
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: Color.fontBlack10OP50,
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
  export default connect(mapStateToProps, {})(SearchBarType5);

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
