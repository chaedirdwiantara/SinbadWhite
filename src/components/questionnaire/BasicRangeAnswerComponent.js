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
    this.state = {
      errorA: false,
      errorB: false
    };
    this.inputValueA = React.createRef(null);
    this.inputValueB = React.createRef(null);
  }

  /** === CHECK VALIDATION === */
  checkValidation = (text, order) => {
    const { inputValueA, inputValueB } = this;
    let valueA = inputValueA.current.state.text;
    let valueB = inputValueB.current.state.text;

    if (order === 1) {
      /** === CONDITION WHEN INPUT THE FIRST VALUE (VALUE A) === */
      // update errorB when valueB is empty
      if (valueB.length === 0) {
        valueB = '';
        this.setState({ errorB: true });
      }
      // update errorA when valueB is less than valueA
      if (valueB.length !== 0 && parseInt(valueB) < parseInt(text)) {
        valueA = '';
        if (!this.state.errorB) this.setState({ errorA: true });
      }
      // set error false when valueB already more than valueA
      if (parseInt(valueB) >= parseInt(text)) {
        valueA = text;
        this.setState({ errorA: false, errorB: false });
      }
    } else {
      /** === CONDITION WHEN INPUT THE SECOND VALUE (VALUE B) === */
      // update errorA when valueA is empty
      if (valueA.length === 0) {
        valueA = '';
        this.setState({ errorA: true });
      }
      // update errorB when valueA is more than valueB
      if (parseInt(valueA) > parseInt(text)) {
        valueB = '';
        if (!this.state.errorA) this.setState({ errorB: true });
      }
      // set error false when valueA already less than valueB
      if (parseInt(valueA) <= parseInt(text)) {
        this.setState({ errorA: false, errorB: false });
        valueB = text;
      }
    }

    return { valueA, valueB };
  };

  /** === ON CHANGE TEXT === */
  _onChange = (text, item) => {
    const { valueA, valueB } = this.checkValidation(text, item.order);
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
              error={this.state.errorA}
              errorText="Nilai input tidak valid"
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
              error={this.state.errorB}
              errorText="Nilai input tidak valid"
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
 * updatedDate: 30092021
 * updatedFunction:
 * -> update validation for basic range answer component.
 */
