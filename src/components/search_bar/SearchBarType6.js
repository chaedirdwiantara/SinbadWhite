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
import { GlobalStyle, Fonts } from '../../helpers';
import { Color } from '../../config';

/**
 * =====================
 * Props:
 * - shadow
 * - data
 * =====================
 */

class SearchBarType6 extends Component {
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
          color={
            this.props.blackSearchIcon ? Color.fontBlack100 : Color.fontBlack60
          }
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
          maxLength={this.props.maxLength}
          selectionColor={Color.mainColor}
          onEndEditing={() => this.searchText()}
          value={this.state.search}
          returnKeyType={'search'}
          placeholder={'Cari nama / id toko disini'}
          onChangeText={search => this.setState({ search })}
          style={[Fonts.textInputSearch, styles.inputBox]}
        />
      </View>
    );
  }
  /** === SEARCH BAR === */
  renderSearchBar() {
    return (
      <View
        style={[
          styles.boxSearchBar,
          {
            borderColor: Color.fontBlack40,
            borderWidth: 1
          }
        ]}
      >
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
    backgroundColor: Color.fontBlack05,
    flexDirection: 'row',
    borderColor: Color.fontBlack40,
    borderWidth: 5
  },
  inputBox: {
    paddingVertical: 0
  }
});

const mapStateToProps = ({}) => {
  return {};
};

// eslint-disable-next-line prettier/prettier
  export default connect(mapStateToProps, {})(SearchBarType6);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: dyah
 * updatedDate: 24082021
 * updatedFunction:
 * -> adding new props 'maxlength' to maximize the character.
 *
 */
