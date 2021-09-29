import {
  React,
  Component,
  View,
  StyleSheet,
  Text
} from '../../library/reactPackage';
import { InputType7 } from '../../library/component';
import { Fonts } from '../../helpers';
import { Color } from '../../config';
import { parseInt } from 'lodash';

class BasicRangeAnswerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.inputValueA = React.createRef(null);
    this.inputValueB = React.createRef(null);
  }

  _onChange = (text, item) => {
    const { inputValueA, inputValueB } = this;
    let valueA = inputValueA.current.state.text;
    let valueB = inputValueB.current.state.text;

    if (item.order === 1) {
      // update valueB when valueB is empty or less than valueA
      if (valueB.length === 0 || parseInt(valueB) < parseInt(text)) {
        inputValueB.current.setText(text);
        valueB = text;
      }
      inputValueA.current.setText(text);
    } else {
      // update valueA when valueA is empty or more than valueB
      if (valueA.length === 0 || parseInt(valueA) > parseInt(text)) {
        inputValueA.current.setText(text);
        valueA = text;
      }
      inputValueB.current.setText(text);
    }

    this.props.onChange({ valueA, valueB });
  };

  /** === RENDER MAIN === */
  render() {
    const { item } = this.props;
    return (
      <View>
        <View style={styles.boxContentItem}>
          <Text style={Fonts.type23}>{item[0].title}</Text>
          <View style={{ width: '40%' }}>
            <InputType7
              ref={this.inputValueA}
              defaultValue={item[0].answersResponse?.inputValue}
              editable={!this.props.disabled}
              placeholder="Input disini"
              max={1000000}
              min={0}
              keyboardType="numeric"
              text={inputValue => this._onChange(inputValue, item[0])}
            />
          </View>
        </View>
        <View style={styles.boxContentItem}>
          <Text style={Fonts.type23}>{item[1].title}</Text>
          <View style={{ width: '40%' }}>
            <InputType7
              ref={this.inputValueB}
              defaultValue={item[1].answersResponse?.inputValue}
              editable={!this.props.disabled}
              placeholder="Input disini"
              max={1000000}
              min={0}
              keyboardType="numeric"
              text={inputValue => this._onChange(inputValue, item[1])}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxContentItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.backgroundWhite,
    paddingTop: 12
  }
});

export default BasicRangeAnswerComponent;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 13092021
 * updatedBy: dyah
 * updatedDate: 29092021
 * updatedFunction:
 * -> add validation for basic range answer component.
 */
