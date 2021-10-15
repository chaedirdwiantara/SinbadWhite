import {
  React,
  Component,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import { MaterialIcon } from '../../library/thirdPartyPackage';
import { Fonts } from '../../helpers';
import { Color } from '../../config';

class RadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * RENDER
   * =======================
   */
  /** === RENDER RADIO BUTTON === */
  renderRadioButton = item => {
    return (
      <TouchableOpacity
        key={item.id.toString()}
        onPress={() => this.props.onSelect(item)}
        disabled={this.props.disabled}
      >
        <View style={styles.radioButtonContainer}>
          <MaterialIcon
            name={
              this.props.selected === item.id
                ? 'radio-button-checked'
                : 'radio-button-unchecked'
            }
            color={
              this.props.selected === item.id
                ? Color.mainColor
                : Color.fontBlack40
            }
            size={20}
            style={{ marginRight: 6 }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={
                this.props.selected === item.id ? Fonts.type8 : Fonts.type9
              }
            >
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /** === RENDER MAIN === */
  render() {
    return (
      <View>{this.props.data.map(item => this.renderRadioButton(item))}</View>
    );
  }
}

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.backgroundWhite,
    paddingTop: 12
  }
});

export default RadioButton;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 06092021
 * updatedBy: dyah
 * updatedDate: 09092021
 * updatedFunction:
 * -> add props disable radio button component.
 */
