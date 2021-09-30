import {
  React,
  Component,
  View,
  TextInput,
  Text,
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
    let newText = parseInt(text || this.props.min, 10);

    if (newText > this.props.max) newText = this.props.max;
    newText = newText.toString();

    const self = this;

    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }

    self.setState({
      text: newText,
      typing: false,
      typingTimeout: setTimeout(function() {
        self.sendToParent(self.state.text);
      }, 500)
    });
  };
  setText = text => {
    this.setState({ text });
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
    let borderColor = Color.fontBlack10;
    if (this.props.backgroundColor)
      backgroundColor = this.props.backgroundColor;
    if (this.state.isFocused) borderColor = Color.fontBlack50;
    if (this.props.error) borderColor = Color.mainColor;

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
              borderColor
            }
          ]}
        />
      </View>
    );
  }
  /** === RENDER ERROR INPUT === */
  inputTextError() {
    return this.props.error ? (
      <View style={styles.boxInputError}>
        <Text style={Fonts.type13}>{this.props.errorText}</Text>
      </View>
    ) : (
      <View />
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        {this.inputText()}
        {this.inputTextError()}
      </View>
    );
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
  },
  boxInputError: {
    paddingTop: 5
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
 * updatedDate: 30092021
 * updatedFunction:
 * -> add props for error message.
 */
