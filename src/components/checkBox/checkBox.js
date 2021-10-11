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

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === RENDER CHECK BOX === */
  renderCheckBox = () => {
    return (
      <TouchableOpacity
        onPress={this.props.onSelect}
        disabled={this.props.disabled}
      >
        <View style={styles.checkBoxContainer}>
          <MaterialIcon
            name={this.props.selected ? 'check-box' : 'check-box-outline-blank'}
            color={this.props.selected ? Color.mainColor : Color.fontBlack40}
            size={20}
            style={{ marginRight: 6 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={this.props.selected ? Fonts.type8 : Fonts.type9}>
              {this.props.label}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /** === RENDER MAIN === */
  render() {
    return <View>{this.renderCheckBox()}</View>;
  }
}

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.backgroundWhite,
    paddingTop: 12
  }
});

export default CheckBox;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 06092021
 * updatedBy: dyah
 * updatedDate: 09092021
 * updatedFunction:
 * -> add props disable checkbox component.
 */
