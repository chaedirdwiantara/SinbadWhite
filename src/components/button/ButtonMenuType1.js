import {
  React,
  Component,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import { MaterialIcon } from '../../library/thirdPartyPackage';
import { Fonts, GlobalStyle } from '../../helpers';
import masterColor from '../../config/masterColor.json';

class ButtonMenuType1 extends Component {
  /**
   * === CONTENT ===
   */
  renderContent() {
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.contentContainer,
            { paddingLeft: this.props.child ? 20 : 16 }
          ]}
          onPress={this.props.onPress}
        >
          <Text style={Fonts.type8}>{this.props.title}</Text>

          <View style={styles.boxArrow}>
            {this.props.notification ? (
              <View style={styles.cirleRed} />
            ) : (
              <View />
            )}
            <MaterialIcon
              name="chevron-right"
              color={masterColor.fontBlack40}
              size={24}
            />
          </View>
        </TouchableOpacity>
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
      </View>
    );
  }
  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%'
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16
  },
  boxArrow: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 10
  },
  cirleRed: {
    marginRight: 8,
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: masterColor.mainColor
  }
});

export default ButtonMenuType1;
