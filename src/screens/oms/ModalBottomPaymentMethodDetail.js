import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Fonts from '../../utils/Fonts';
import masterColor from '../../config/masterColor.json';

const { height } = Dimensions.get('window');

class ModalBottomPaymentMethodDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openCollapse: false
    };
  }

  renderButton() {
    return (
      <Button
        onPress={() =>
          this.props.selectedPayment(this.props.paymentMethodDetail)
        }
        title="Pilih Metode"
        titleStyle={styles.titleButton}
        buttonStyle={styles.button}
      />
    );
  }

  renderContentCollapse() {
    return this.state.openCollapse ? (
      <View style={{ paddingHorizontal: 25, paddingVertical: 10 }}>
        <HTMLView
          value={this.props.paymentMethodDetail.paymentMethod.description}
          stylesheet={stylesHTML}
        />
      </View>
    ) : (
      <View />
    );
  }

  renderDetails() {
    return (
      <View>
        <View
          style={[
            styles.boxTitle,
            { flexDirection: 'row', justifyContent: 'space-between' }
          ]}
        >
          <View>
            <Text style={styles.title}>
              {this.props.paymentMethodDetail.paymentMethod.paymentGroup
                .name === 'Tunai'
                ? 'Syarat dan Ketentuan'
                : this.props.paymentMethodDetail.paymentMethod.name}
            </Text>
          </View>
          <View>
            {this.props.paymentMethodDetail.paymentMethod.iconUrl !== null ? (
              <View style={{ width: '17%', justifyContent: 'center' }}>
                <Image
                  source={{
                    uri: this.props.paymentMethodDetail.paymentMethod.iconUrl
                  }}
                  style={styles.Imageicons}
                />
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
        <View style={styles.lines} />
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 20,
            paddingTop: 5,
            marginTop: 10,
            backgroundColor: '#fafbfd'
          }}
        >
          <HTMLView
            value={this.props.paymentMethodDetail.paymentMethod.terms}
            stylesheet={stylesHTML}
          />
        </View>
      </View>
    );
  }

  renderPanduanPembayaran() {
    return (
      <View>
        <View style={styles.boxTitle}>
          <Text style={styles.title}>Panduan Pembayaran</Text>
        </View>
        <View style={styles.lines} />
        <TouchableOpacity
          style={styles.boxCollapse}
          onPress={() =>
            this.setState({ openCollapse: !this.state.openCollapse })
          }
        >
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.subTitle}>
              {this.props.paymentMethodDetail.paymentMethod.name}
            </Text>
          </View>
          <View>
            {!this.state.openCollapse ? (
              <Icons name="keyboard-arrow-down" size={24} />
            ) : (
              <Icons name="keyboard-arrow-up" size={24} />
            )}
          </View>
        </TouchableOpacity>
        {this.renderContentCollapse()}
        <View style={styles.lines} />
      </View>
    );
  }

  render() {
    return (
      <Modal
        isVisible={this.props.open}
        useNativeDriver={true}
        hasBackdrop={true}
        coverScreen={true}
        backdropColor="black"
        deviceHeight={height}
        backdropOpacity={0.4}
        style={styles.modalPosition}
      >
        <StatusBar
          backgroundColor="rgba(144, 39, 44, 1)"
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={{ height: 60 }}>
            <View style={styles.closeContainer}>
              <TouchableOpacity
                onPress={this.props.close}
                style={styles.closeBox}
              >
                <Ionicons
                  name="ios-arrow-back"
                  size={24}
                  color={masterColor.fontBlack50}
                />
              </TouchableOpacity>
              {this.props.paymentMethodDetail !== null ? (
                <View>
                  <Text style={styles.titleModalBottom}>
                    {
                      this.props.paymentMethodDetail.paymentMethod.paymentGroup
                        .name
                    }
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
          <View style={styles.contentContainer}>
            <ScrollView>
              {this.renderDetails()}
              {this.renderPanduanPembayaran()}
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>{this.renderButton()}</View>
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
  p: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.5),
    color: '#333333',
    marginBottom: -20
  },
  ul: {
    color: '#f0444c'
  },
  ol: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.5),
    color: '#333333'
  }
});

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 0.7 * height,
    backgroundColor: 'white',
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000,
    paddingBottom: 0.01 * height
  },
  modalPosition: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },
  contentContainer: {
    flex: 1,
    marginTop: -20
  },
  boxTitle: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  boxCollapse: {
    paddingLeft: 20,
    paddingRight: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  lines: {
    marginLeft: 10,
    borderTopWidth: 1,
    borderColor: '#f2f2f2'
  },
  /**close */
  titleModalBottom: {
    marginTop: 0.03 * height,
    marginBottom: 0.03 * height,
    fontFamily: Fonts.MontserratBold,
    fontSize: RFPercentage(1.8),
    color: '#333333'
  },
  title: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: RFPercentage(1.7),
    color: '#333333'
  },
  subTitle: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: RFPercentage(1.6),
    color: '#333333',
    lineHeight: 16
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
    left: 0,
    width: '15%',
    height: '100%'
  },
  Imageicons: {
    width: 50,
    height: 20
  },
  /** for button */
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ffffff'
  },
  titleButton: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 13,
    color: '#ffffff'
  },
  button: {
    backgroundColor: '#f0444c',
    borderRadius: 10,
    width: 282,
    height: 41
  }
});

export default ModalBottomPaymentMethodDetail;
