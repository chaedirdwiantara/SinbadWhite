import {
  React,
  Component,
  View,
  StyleSheet,
  ModalPopUp,
  TouchableOpacity,
  Text
} from '../../library/reactPackage';
import { connect } from '../../library/thirdPartyPackage';
import { StatusBarRedOP50, StatusBarBlackOP40 } from '../../library/component';
import { Fonts } from '../../helpers';
import { Color } from '../../config';

class ModalConfirmationType5 extends Component {
  constructor(props) {
    super(props);
  }
  /** MAIN RENDER */
  render() {
    return (
      <ModalPopUp
        visible={this.props.open}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        {this.props.statusBarWhite ? (
          <StatusBarBlackOP40 />
        ) : (
          <StatusBarRedOP50 />
        )}
        <View style={styles.mainContainer}>
          <View style={styles.card}>
            <View style={styles.boxCard}>
              <View style={styles.containerTitle}>
                <Text style={[Fonts.type43, { textAlign: 'center' }]}>
                  {this.props.title}
                </Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={[Fonts.type17, { textAlign: 'center' }]}>
                  {this.props.content}
                </Text>
              </View>
              {this.props.subContent ? (
                <View style={styles.contentSubContainer}>
                  <Text style={Fonts.type44}>{this.props.subContent}</Text>
                </View>
              ) : (
                <View />
              )}
              {this.props.type === 'okeNotRed' ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.boxWhite}
                    onPress={this.props.ok}
                  >
                    <Text style={Fonts.type29}>{this.props.okText}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.boxRed}
                    onPress={this.props.cancel}
                  >
                    <Text style={Fonts.type25}>{this.props.cancelText}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.boxRed}
                    onPress={this.props.ok}
                  >
                    <Text style={Fonts.type25}>{this.props.okText}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.boxWhite}
                    onPress={this.props.cancel}
                  >
                    <Text style={Fonts.type29}>{this.props.cancelText}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </ModalPopUp>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Color.fontBlack100OP40,
    position: 'relative',
    height: '100%',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: Color.backgroundWhite,
    borderRadius: 12,
    marginHorizontal: '18%'
  },
  boxCard: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  contentSubContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  boxRed: {
    width: '47%',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: Color.mainColor
  },
  boxWhite: {
    width: '47%',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.mainColor,
    paddingVertical: 12
  }
});

export default connect()(ModalConfirmationType5);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: dyah
 * createdDate: 13092021
 * updatedBy:
 * updatedDate:
 * updatedFunction:
 * -> add new modal confirmation type. (type 5)
 *
 */
