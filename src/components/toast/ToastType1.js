import {
  React,
  Component,
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from '../../library/reactPackage';
import { OcticonsIcon, Toast, DURATION } from '../../library/thirdPartyPackage';
import { Fonts } from '../../helpers';
import { Color } from '../../config';

class ToastType1 extends Component {
  componentDidMount() {
    this.refs.toast.show(this.renderNotification(), DURATION.LENGTH_LONG);
  }

  renderNotification() {
    return (
      <View style={styles.contentRow}>
        <View style={styles.circleNotif}>
          <TouchableOpacity>
            <OcticonsIcon name="check" size={12} color={Color.fontWhite} />
          </TouchableOpacity>
        </View>
        <Text style={Fonts.type25}>{this.props.content}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Toast
          ref="toast"
          style={styles.containerCard}
          position="top"
          positionValue={this.props.margin ? this.props.margin : 10}
          fadeInDuration={1000}
          fadeOutDuration={5000}
          opacity={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    width: '100%'
  },
  containerCard: {
    backgroundColor: Color.fontBlack80OP90,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    zIndex: 9999,
    borderRadius: 20
  },
  contentRow: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  circleNotif: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: Color.fontGreen50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  }
});

export default ToastType1;
