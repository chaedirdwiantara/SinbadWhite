import {
  React,
  Component,
  View,
  TextInput,
  StyleSheet,
  Text
} from '../../library/reactPackage'
import { Fonts } from '../../helpers'
import { Color } from '../../config'
import masterColor from '../../config/masterColor.json';

class InputType1 extends Component {
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
        <Text>
          <Text style={Fonts.type32}>{this.props.title}</Text>
          {this.props.optional ? (
            <Text style={Fonts.type71}> (opsional)</Text>
          ) : (
            <Text>{''}</Text>
          )}
        </Text>
      </View>
    );
  }
  /** === RENDER BAR === */
  inputText() {
    return (
      <View style={styles.boxInput}>
        <View style={{ flex: 1 }}>
          <TextInput
            editable={this.props.editable}
            value={this.props.value}
            selectionColor={Color.mainColor}
            placeholder={this.props.placeholder}
            placeholderTextColor={Color.fontBlack40}
            onChangeText={this.props.text}
            keyboardType={this.props.keyboardType}
            maxLength={this.props.maxLength}
            style={[
              Fonts.type24,
              styles.input,
              {
                borderBottomColor: this.props.error
                  ? Color.fontRed50
                  : Color.fontBlack40
              }
            ]}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderBottomColor: this.props.error
              ? Color.fontRed50
              : Color.fontBlack40
          }}
        >
          <Text style={Fonts.type24}>{this.props.rightText}</Text>
        </View>
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
        <View style={styles.spacing} />
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
    paddingBottom: 10
  },
  boxInput: {
    width: '100%',
    flexDirection: 'row'
  },
  boxInputError: {
    paddingTop: 8
  },
  input: {
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderBottomColor: Color.fontBlack40
  },
  spacing: {
    marginBottom: 12
  }
});

export default InputType1;

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 07072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/
