import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  ModalPopUp,
  TouchableOpacity,
  Text
} from '../../library/reactPackage'
import {
  Button,
  MaterialIcon,
  MaterialCommunityIcons,
  HTMLView,
} from '../../library/thirdPartyPackage'
import {
  StatusBarRedOP50
} from '../../library/component'
import { Fonts, GlobalStyleHtml } from '../../helpers'
import { Color } from '../../config'

const { width, height } = Dimensions.get('window');

class ModalTAndR extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tAndRCheck: false
    };
  }

  renderButton() {
    return (
      <Button
        disabled={!this.state.tAndRCheck}
        onPress={() => this.props.agreeTAndR(this.props.data)}
        title="Lanjutkan"
        titleStyle={Fonts.textButtonSmallRedActive}
        buttonStyle={styles.button}
        disabledStyle={styles.buttonDisabled}
        disabledTitleStyle={Fonts.textButtonSmallRedActive}
      />
    );
  }

  render() {
    return (
      <ModalPopUp
        visible={this.props.open}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBarRedOP50 />
        <View style={styles.container}>
          <View style={styles.boxModal}>
            <View style={{ height: 60 }}>
              <View style={styles.closeContainer}>
                <TouchableOpacity
                  onPress={this.props.close}
                  style={styles.closeBox}
                >
                  <MaterialIcon
                    name="close"
                    color={Color.fontBlack50}
                    size={24}
                  />
                </TouchableOpacity>
                <Text style={Fonts.type30}>
                  {this.props.data.paymentType.name}
                </Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <HTMLView
                value={this.props.data.paymentType.terms}
                stylesheet={GlobalStyleHtml}
              />
            </View>
            <View style={styles.tAndRContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({ tAndRCheck: !this.state.tAndRCheck })
                }
              >
                {this.state.tAndRCheck ? (
                  <MaterialCommunityIcons
                    color={Color.mainColor}
                    name="checkbox-marked"
                    size={24}
                  />
                ) : (
                  <MaterialCommunityIcons
                    color={Color.fontBlack40}
                    name="checkbox-blank-outline"
                    size={24}
                  />
                )}
              </TouchableOpacity>
              <View style={{ marginLeft: 5, marginRight: 5 }}>
                <Text style={Fonts.type38}>
                  Dengan ini saya menyetujui{' '}
                  <Text style={Fonts.type28}>Syarat & Ketentuan</Text> yang
                  berlaku
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>{this.renderButton()}</View>
          </View>
        </View>
      </ModalPopUp>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.fontBlack100OP40,
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    paddingHorizontal: 15,
    flex: 1
  },
  tAndRContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  buttonContainer: {
    height: 60,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  boxModal: {
    backgroundColor: '#ffffff',
    height: 0.46 * height,
    borderRadius: 12,
    width: 0.86 * width
  },
  closeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    width: '15%',
    height: '100%'
  },
  /** for button */
  button: {
    backgroundColor: Color.mainColor,
    borderRadius: 8,
    width: 258,
    height: 41
  },
  buttonDisabled: {
    backgroundColor: Color.fontBlack40,
    borderRadius: 8,
    width: 258,
    height: 41
  }
});

export default ModalTAndR;

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

