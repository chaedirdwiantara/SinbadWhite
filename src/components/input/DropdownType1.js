import {
  React,
  Component,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from '../../library/reactPackage';
import { MaterialIcon } from '../../library/thirdPartyPackage';
import { Fonts } from '../../helpers';
import { Color } from '../../config'

class DropdownType1 extends Component {
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
  /** === RENDER INPUT === */
  selectedDropdown() {
    return (
      <TouchableOpacity
        style={styles.boxInput}
        onPress={this.props.openDropdown}
      >
        {this.props.prefixes ? (
          <View style={styles.boxPrefixes}>{this.props.prefixes}</View>
        ) : (
          <View />
        )}
        <View style={{ marginLeft: this.props.prefixes ? 40 : 0 }}>
          {this.props.selectedDropdownText !== '' &&
          this.props.selectedDropdownText !== null ? (
            <Text style={Fonts.type24}>{this.props.selectedDropdownText}</Text>
          ) : (
            <Text style={Fonts.type33}>{this.props.placeholder}</Text>
          )}
        </View>
        <View style={styles.boxArrow}>
          <MaterialIcon
            name="chevron-right"
            color={Color.fontBlack60}
            size={24}
          />
        </View>
      </TouchableOpacity>
    );
  }
  /** === RENDER INPUT DISABLED === */
  selectedDropdownDisabled() {
    return (
      <View style={styles.boxInput}>
        {this.props.prefixes ? (
          <View style={styles.boxPrefixes}>{this.props.prefixes}</View>
        ) : (
          <View />
        )}
        <View style={{ marginLeft: this.props.prefixes ? 40 : 0 }}>
          {this.props.selectedDropdownText !== '' &&
          this.props.selectedDropdownText !== null ? (
            <Text style={Fonts.type33}>{this.props.selectedDropdownText}</Text>
          ) : (
            <Text style={Fonts.type33}>{this.props.placeholder}</Text>
          )}
        </View>
      </View>
    );
  }
  /** === RENDER CONTENT === */
  renderContent() {
    return (
      <View style={styles.contentContainer}>
        {this.renderTitle()}
        {this.props.disabled
          ? this.selectedDropdownDisabled()
          : this.selectedDropdown()}
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
    paddingBottom: 16
  },
  boxInput: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomColor: Color.fontBlack40
  },
  boxArrow: {
    position: 'absolute',
    right: 0,
    bottom: 4
  },
  boxPrefixes: {
    position: 'absolute',
    left: 0,
    bottom: 4
  },
  spacing: {
    marginBottom: 12
  }
});

export default DropdownType1;

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
