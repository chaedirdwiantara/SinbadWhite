import {
  React,
  Component,
  View,
  TextInput,
  StyleSheet
} from '../../library/reactPackage';
import { Fonts } from '../../helpers';
import { Color } from '../../config';

/**
 * =============================
 * NOTE
 * =============================
 * this input for "QUESTIONNAIRE"
 */
class InputType7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.defaultValue || '',
      typing: false,
      typingTimeout: 0,
      isFocused: false
    };
  }
  /**
   * ======================
   * FUNCTIONAL
   * =======================
   */
  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });
  changeText = text => {
    const parsedQty = parseInt(text, 10);
    let newText = '';

    if (Number.isNaN(parsedQty)) {
      newText = '0';
    } else if (parsedQty < this.props.min) {
      newText = this.props.min.toString();
    } else if (parsedQty > this.props.max) {
      newText = this.props.max.toString();
    } else {
      newText = text;
    }

    const self = this;

    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }

    self.setState({
      text: newText,
      typing: false,
      typingTimeout: setTimeout(function() {
        self.sendToParent(self.state.text);
      }, 1000)
    });
  };
  sendToParent = () => {
    this.props.text(this.state.text);
  };
  /**
   * ======================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER BAR === */
  inputText() {
    let backgroundColor = Color.fontBlack05;
    if (this.props.backgroundColor)
      backgroundColor = this.props.backgroundColor;

    return (
      <View>
        <TextInput
          editable={this.props.editable}
          selectionColor={Color.mainColor}
          placeholder={this.props.placeholder}
          value={this.state.text}
          placeholderTextColor={Color.fontBlack40}
          onChangeText={this.changeText}
          keyboardType={this.props.keyboardType}
          maxLength={this.props.maxLength}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          style={[
            Fonts.type9,
            styles.input,
            {
              backgroundColor,
              borderColor: this.state.isFocused
                ? Color.fontBlack50
                : Color.fontBlack10
            }
          ]}
        />
      </View>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return <View style={styles.contentContainer}>{this.inputText()}</View>;
  }
  /** === MAIN VIEW === */
  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Color.backgroundWhite
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    flex: 1,
    padding: 2,
    textAlign: 'center'
  }
});

export default InputType7;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 06092021
 * updatedBy: dyah
 * updatedDate: 16092021
 * updatedFunction:
 * -> add prop defaultValue.
 */
