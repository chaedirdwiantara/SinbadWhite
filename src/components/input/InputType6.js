import {
  React,
  Component,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from '../../library/reactPackage';
import { Fonts } from '../../helpers';
import masterColor from '../../config/masterColor.json';

class InputType6 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ======================
   * RENDER VIEW
   * =======================
   */
  /** === RENDER PREFIX CONTENT === */
  renderSuffixContent() {
    return this.props.suffixContent ? (
      <View>{this.props.suffixContent}</View>
    ) : (
      <View />
    );
  }
  /** === RENDER PREFIX FOR PUSH OR NOT === */
  renderCheckSuffix() {
    return this.props.suffixForPush ? (
      <TouchableOpacity onPress={this.props.suffixPush}>
        {this.renderSuffixContent()}
      </TouchableOpacity>
    ) : (
      this.renderSuffixContent()
    );
  }
  /** === RENDER TITLE === */
  renderTitle() {
    return (
      <View style={{ ...styles.boxTitle, marginTop: this.props.info ? 8 : 0 }}>
        <Text>
          <Text style={Fonts.type32}>{this.props.title} </Text>
          <Text style={Fonts.type71}>
            {this.props.additionalTitle ? this.props.additionalTitle : ''}
          </Text>
        </Text>
      </View>
    );
  }
  /** === RENDER INPUT === */
  renderInput() {
    return (
      <View style={styles.contentInput}>
        <View style={{ flex: 1 }}>
          <TextInput
            editable={this.props.editable}
            onKeyPress={this.props.onKeyPress}
            returnKeyType="done"
            maxLength={this.props.maxLength}
            secureTextEntry={this.props.secureTextEntry}
            selectionColor={masterColor.mainColor}
            autoCapitalize={this.props.autoCapitalize}
            placeholder={this.props.placeholder}
            onEndEditing={this.props.enter}
            placeholderTextColor={masterColor.fontBlack40}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            keyboardType={this.props.keyboardType}
            style={[
              this.props.editable === false
                ? Fonts.textInputFieldDisabled
                : Fonts.textInputField,
              styles.boxInput,
              {
                borderBottomColor: this.props.error
                  ? masterColor.fontRed50
                  : masterColor.fontBlack40
              }
            ]}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginLeft: -1,
            borderBottomWidth: 1,
            borderBottomColor: this.props.error
              ? masterColor.fontRed50
              : masterColor.fontBlack40
          }}
        >
          {this.props.suffix ? this.renderCheckSuffix() : <View />}
        </View>
      </View>
    );
  }
  /** === RENDER ERROR === */
  renderError() {
    if (this.props.info) {
      return (
        <View style={styles.boxError}>
          <Text style={Fonts.type60}>{this.props.info}</Text>
        </View>
      );
    }

    if (this.props.error && this.props.errorText) {
      return (
        <View style={styles.boxError}>
          <Text style={Fonts.type13}>{this.props.errorText}</Text>
        </View>
      );
    }

    return <View />;
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        {this.renderTitle()}
        {this.renderInput()}
        {this.renderError()}
        <View style={{ marginBottom: this.props.marginBottom }} />
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
    backgroundColor: masterColor.backgroundWhite
  },
  contentContainer: {
    paddingHorizontal: 16
  },
  contentInput: {
    width: '100%',
    flexDirection: 'row'
  },
  boxTitle: {
    paddingBottom: 10
  },
  boxInput: {
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderBottomColor: masterColor.fontBlack40
  },
  boxError: {
    paddingTop: 8
  }
});

export default InputType6;