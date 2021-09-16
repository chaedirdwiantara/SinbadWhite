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

class BasicRangeAnswerComponent extends Component {
  constructor(props) {
    super(props);
  }

  /** === RENDER MAIN === */
  render() {
    return (
      <View>
        <View style={styles.boxContentItem}>
          <Text style={Fonts.type23}>{this.props.item.title}</Text>
          <View style={{ width: '40%' }}>
            <InputType7
              defaultValue={this.props.defaultValue}
              editable={!this.props.disabled}
              placeholder="Input disini"
              max={1000000}
              min={0}
              keyboardType="numeric"
              text={inputValue => this.props.onChange(inputValue)}
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
 * updatedDate: 16092021
 * updatedFunction:
 * -> add props default value.
 * -> update min & max.
 */
