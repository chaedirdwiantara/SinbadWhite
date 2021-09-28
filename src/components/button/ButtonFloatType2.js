import {
  React,
  Component,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import { connect, AntDesignIcon } from '../../library/thirdPartyPackage';
import { Color } from '../../config';
import { Fonts } from '../../helpers';

/**
 * props
 * title: ''
 */

class ButtonFloatType2 extends Component {
  /**
   * === CONTENT ===
   */
  renderContent() {
    return (
      <TouchableOpacity style={styles.boxContent} onPress={this.props.push}>
        {this.props.icon}
        <View style={{ marginLeft: 6 }}>
          <Text style={Fonts.type25}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxContent: {
    backgroundColor: Color.fontBlack80OP90,
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 16,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = ({}) => {
  return {};
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(ButtonFloatType2);

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
