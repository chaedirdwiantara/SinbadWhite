import {
  React,
  Component,
  StyleSheet,
  View,
  TextInput
} from '../../library/reactPackage'
import {
  connect
} from '../../library/thirdPartyPackage'
import { Color } from '../../config'
import { Fonts } from '../../helpers'

class OtpInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: ''
    };
  }
  /**
   * ======================
   * FUNCTIONAL
   * ======================
   */
  sendToOTPViewPage(data, digit) {
    this.props.fromOTPInput({ data, digit });
  }
  /**
   * =======================
   * RENDER VIEW
   * =======================
   */
  /** === input 1 */
  renderInput1() {
    return (
      <View style={styles.boxInputPartial}>
        <View style={styles.boxInput}>
          <TextInput
            accessible={true}
            accessibilityLabel={'txtOtpInput1'}
            selectionColor={Color.mainColor}
            autoFocus={this.state.input1 === ''}
            ref={ref => {
              this.input1 = ref;
            }}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={input1 => {
              if (input1 !== '') {
                this.setState({ input1 });
                this.input2 && this.input2.focus();
                this.sendToOTPViewPage(input1, 0);
              } else {
                this.setState({ input1 });
                this.sendToOTPViewPage('', 0);
              }
            }}
            style={[Fonts.type4, { textAlign: 'center' }]}
          />
        </View>
      </View>
    );
  }
  /** === input 2 */
  renderInput2() {
    return (
      <View style={styles.boxInputPartial}>
        <View style={styles.boxInput}>
          <TextInput
            accessible={true}
            accessibilityLabel={'txtOtpInput2'}
            selectionColor={Color.mainColor}
            ref={ref => {
              this.input2 = ref;
            }}
            maxLength={1}
            onKeyPress={() => {
              if (this.state.input2 === '') {
                this.input1 && this.input1.focus();
              }
            }}
            keyboardType="numeric"
            onChangeText={input2 => {
              if (input2 === '') {
                this.input1 && this.input1.focus();
                this.setState({ input2 });
                this.sendToOTPViewPage(input2, 1);
              } else {
                this.setState({ input2 });
                this.input3 && this.input3.focus();
                this.sendToOTPViewPage(input2, 1);
              }
            }}
            style={[Fonts.type4, { textAlign: 'center' }]}
          />
        </View>
      </View>
    );
  }
  /** === input 3 */
  renderInput3() {
    return (
      <View style={styles.boxInputPartial}>
        <View style={styles.boxInput}>
          <TextInput
            accessible={true}
            accessibilityLabel={'txtOtpInput3'}
            selectionColor={Color.mainColor}
            ref={ref => {
              this.input3 = ref;
            }}
            maxLength={1}
            keyboardType="numeric"
            onKeyPress={() => {
              if (this.state.input3 === '') {
                this.input2 && this.input2.focus();
              }
            }}
            onChangeText={input3 => {
              if (input3 === '') {
                this.input2 && this.input2.focus();
                this.setState({ input3 });
                this.sendToOTPViewPage(input3, 2);
              } else {
                this.setState({ input3 });
                this.input4 && this.input4.focus();
                this.sendToOTPViewPage(input3, 2);
              }
            }}
            style={[Fonts.type4, { textAlign: 'center' }]}
          />
        </View>
      </View>
    );
  }
  /** === input 4 */
  renderInput4() {
    return (
      <View style={styles.boxInputPartial}>
        <View style={styles.boxInput}>
          <TextInput
            accessible={true}
            accessibilityLabel={'txtOtpInput4'}
            selectionColor={Color.mainColor}
            ref={ref => {
              this.input4 = ref;
            }}
            maxLength={1}
            keyboardType="numeric"
            onKeyPress={() => {
              if (this.state.input4 === '') {
                this.input3 && this.input3.focus();
              }
            }}
            onChangeText={input4 => {
              if (input4 === '') {
                this.input3 && this.input3.focus();
                this.setState({ input4 });
                this.sendToOTPViewPage(input4, 3);
              } else {
                this.setState({ input4 });
                this.input5 && this.input5.focus();
                this.sendToOTPViewPage(input4, 3);
              }
            }}
            style={[Fonts.type4, { textAlign: 'center' }]}
          />
        </View>
      </View>
    );
  }
  /** === input 5 */
  renderInput5() {
    return (
      <View style={styles.boxInputPartial}>
        <View style={styles.boxInput}>
          <TextInput
            accessible={true}
            accessibilityLabel={'txtOtpInput5'}
            selectionColor={Color.mainColor}
            ref={ref => {
              this.input5 = ref;
            }}
            onKeyPress={() => {
              if (this.state.input5 === '') {
                this.input4 && this.input4.focus();
              }
            }}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={input5 => {
              if (input5 === '') {
                this.input4 && this.input4.focus();
                this.setState({ input5 });
                this.sendToOTPViewPage(input5, 4);
              } else {
                this.setState({ input5 });
                this.sendToOTPViewPage(input5, 4);
              }
            }}
            style={[Fonts.type4, { textAlign: 'center' }]}
          />
        </View>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.boxMainInput}>
          {this.renderInput1()}
          {this.renderInput2()}
          {this.renderInput3()}
          {this.renderInput4()}
          {this.renderInput5()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 46,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  boxMainInput: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    height: '100%'
  },
  boxInputPartial: {
    width: '20%'
  },
  boxInput: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Color.fontBlack10,
    width: '80%'
  }
});

const mapStateToProps = ({}) => {
  return {};
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(OtpInput);

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

