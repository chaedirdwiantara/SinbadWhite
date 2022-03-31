import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard
} from '../../library/reactPackage';
import { MaterialIcon } from '../../library/thirdPartyPackage';
import { Color } from '../../config';
import { debounce } from '../../functions/debounce';
import { Fonts } from '../../helpers';

class SeacrhBarType8 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
    this.fetchHistory = debounce(this.fetchHistory, 500);
  }

  fetchHistory = () => {
    Keyboard.dismiss();
    this.props.fetchFn(this.state.keyword);
  };

  handleKeywordChange = text => {
    this.setState({ keyword: text }, () => {
      if (this.state.keyword.length >= 3) {
        this.fetchHistory();
      }
    });
  };

  clearSearch = () => {
    this.setState({ keyword: '' }, () => {
      Keyboard.dismiss();
      this.props.fetchFn(this.state.keyword);
    });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View
          style={[
            styles.boxSearchBar,
            { borderColor: Color.fontBlack40, borderWidth: 1 }
          ]}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <MaterialIcon color={Color.fontBlack60} name="search" size={24} />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              maxLength={this.props.maxLength}
              selectionColor={Color.mainColor}
              onEndEditing={() => {
                Keyboard.dismiss();
                this.props.fetchFn(this.state.keyword);
              }}
              value={this.state.keyword}
              returnKeyType="search"
              placeholder={this.props.placeholder ? this.props.placeholder : ''}
              onChangeText={text => this.handleKeywordChange(text)}
              style={[Fonts.textInputSearch, styles.inputBox]}
            />
          </View>
          {this.state.keyword !== '' && (
            <TouchableOpacity
              style={{ paddingHorizontal: 8 }}
              onPress={this.clearSearch}
            >
              <MaterialIcon color={Color.fontBlack60} name="cancel" size={24} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
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
    // backgroundColor: Color.fontBlack05,
    flexDirection: 'row',
    borderColor: Color.fontBlack40,
    borderWidth: 5
  },
  inputBox: {
    paddingVertical: 0
  }
});

export default SeacrhBarType8;
