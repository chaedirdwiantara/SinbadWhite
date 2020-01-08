import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import HTMLView from 'react-native-htmlview';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Fonts } from '../../utils/Fonts';

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
        titleStyle={styles.titleButton}
        buttonStyle={styles.button}
        disabledStyle={styles.buttonDisabled}
        disabledTitleStyle={styles.titleButton}
      />
    );
  }

  render() {
    return (
      <Modal
        visible={this.props.open}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <StatusBar
          backgroundColor="rgba(94, 28, 30, 1)"
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={styles.boxModal}>
            <View style={{ height: 60 }}>
              <View style={styles.closeContainer}>
                <TouchableOpacity
                  onPress={this.props.close}
                  style={styles.closeBox}
                >
                  <Image
                    source={require('../../assets/icons/close.png')}
                    style={styles.icons}
                  />
                </TouchableOpacity>
                <Text style={styles.titleModalBottom}>
                  {this.props.data.paymentType.name}
                </Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <HTMLView
                value={this.props.data.paymentType.terms}
                stylesheet={stylesHTML}
              />
            </View>
            <View style={styles.tAndRContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({ tAndRCheck: !this.state.tAndRCheck })
                }
              >
                {this.state.tAndRCheck ? (
                  <Icons color="#f1414c" name="checkbox-marked" size={24} />
                ) : (
                  <Icons
                    color="rgba(1,1,1,0.54)"
                    name="checkbox-blank-outline"
                    size={24}
                  />
                )}
              </TouchableOpacity>
              <View style={{ marginLeft: 5, marginRight: 5 }}>
                <Text style={styles.textTAndR}>
                  Dengan ini saya menyetujui{' '}
                  <Text style={styles.textTAndRred}>Syarat & Ketentuan</Text>{' '}
                  yang berlaku
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>{this.renderButton()}</View>
          </View>
        </View>
      </Modal>
    );
  }
}

const stylesHTML = StyleSheet.create({
  li: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.5),
    color: '#333333'
  },
  ul: {
    color: '#f0444c'
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    borderRadius: 20,
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
  icons: {
    width: 24,
    height: 24
  },
  titleModalBottom: {
    marginTop: 0.03 * height,
    marginBottom: 0.03 * height,
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(1.8),
    color: '#333333'
  },
  textTAndR: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.4),
    color: '#575757',
    flexWrap: 'wrap',
    lineHeight: 14
  },
  textTAndRred: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.4),
    flexWrap: 'wrap',
    color: '#f0444c',
    lineHeight: 14
  },
  /** for button */
  titleButton: {
    fontFamily: Fonts.MontserratExtraBold,
    fontSize: 12,
    color: '#ffffff'
  },
  button: {
    backgroundColor: '#f0444c',
    borderRadius: 10,
    width: 258,
    height: 41
  },
  buttonDisabled: {
    backgroundColor: '#bdbdbd',
    borderRadius: 10,
    width: 258,
    height: 41
  }
});

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {})(ModalTAndR);
