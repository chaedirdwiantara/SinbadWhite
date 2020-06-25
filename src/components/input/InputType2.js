import {
  React,
  Component,
  View,
  Text,
  TextInput,
  StyleSheet
} from '../../library/reactPackage';
import { Fonts } from '../../helpers';
import { Color } from '../../config';

class InputType2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ======================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER TITLE === */
  renderTitle() {
    return (
      <View style={styles.boxTitle}>
        <Text style={Fonts.type32}>{this.props.title}</Text>
      </View>
    );
  }
  /** === RENDER BAR === */
  inputText() {
    return (
      <View style={styles.boxInput}>
        <TextInput
          editable={this.props.editable}
          selectionColor={Color.mainColor}
          placeholder={this.props.placeholder}
          value={this.props.value}
          placeholderTextColor={Color.fontBlack40}
          onChangeText={this.props.text}
          keyboardType={this.props.keyboardType}
          multiline={true}
          numberOfLines={3}
          style={[
            this.props.editable === false
              ? Fonts.textInputFieldDisabled
              : Fonts.textInputField,
            styles.input,
            {
              borderBottomColor: this.props.error
                ? Color.fontRed50
                : Color.fontBlack40,
              textAlignVertical: 'top'
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
        {this.renderTitle()}
        {this.inputText()}
        {this.inputTextError()}
        <View
          style={{
            marginBottom: this.props.marginBottom ? this.props.marginBottom : 16
          }}
        />
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
  contentContainer: {
    paddingHorizontal: 16
  },
  boxTitle: {
    paddingBottom: 8
  },
  boxInputError: {
    paddingTop: 8
  },
  input: {
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    paddingBottom: 8,
    borderBottomColor: Color.fontBlack40
  }
});

export default InputType2;
