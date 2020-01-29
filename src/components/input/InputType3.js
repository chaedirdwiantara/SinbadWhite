import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';

class InputType3 extends Component {
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
        <Text style={Fonts.type8}>{this.props.title}</Text>
      </View>
    );
  }
  /** === RENDER BAR === */
  inputText() {
    return (
      <View style={styles.boxInput}>
        <TextInput
          editable={this.props.editable}
          selectionColor={masterColor.mainColor}
          placeholder={this.props.placeholder}
          value={this.props.value}
          placeholderTextColor={masterColor.fontBlack40}
          onChangeText={this.props.text}
          keyboardType={this.props.keyboardType}
          multiline={true}
          numberOfLines={4}
          style={[
            Fonts.type24,
            styles.input,
            {
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
    backgroundColor: masterColor.backgroundWhite
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
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: masterColor.fontBlack05,
    paddingBottom: 8,
    borderColor: masterColor.fontBlack10
  },
  spacing: {
    marginBottom: 12
  }
});

export default InputType3;
