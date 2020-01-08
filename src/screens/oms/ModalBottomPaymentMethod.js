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
import Modal from 'react-native-modal';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Fonts from '../../utils/Fonts';
import masterColor from '../../config/masterColor.json';

const { height } = Dimensions.get('window');

class ModalBottomPaymentMethod extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderListPaymentMethodContent(item) {
    return item.paymentMethods.map((itemPaymnetMethod, index) => {
      return itemPaymnetMethod.paymentMethod.status === 'active' ? (
        <View key={index}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              height: 48
            }}
            onPress={() => this.props.selectPaymentMethod(itemPaymnetMethod)}
          >
            {itemPaymnetMethod.paymentMethod.iconUrl !== null ? (
              <View style={{ width: '17%', justifyContent: 'center' }}>
                <Image
                  source={{
                    uri: itemPaymnetMethod.paymentMethod.iconUrl
                  }}
                  style={styles.Imageicons}
                />
              </View>
            ) : (
              <View />
            )}

            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.subTitle}>
                {itemPaymnetMethod.paymentMethod.name}
              </Text>
            </View>
            <View style={{ width: '5%', justifyContent: 'center' }}>
              <Icons name="navigate-next" size={24} />
            </View>
          </TouchableOpacity>
          <View style={styles.lines} />
        </View>
      ) : (
        <View key={index} />
      );
    });
  }

  renderListPaymentMethod() {
    return this.props.paymentType.paymentType.paymentGroups.map(
      (item, index) => {
        return item.paymentMethods.length > 0 ? (
          <View key={index}>
            <ScrollView>
              <View
                style={{ paddingLeft: 10, marginBottom: 10, marginTop: 20 }}
              >
                <Text style={styles.title}>{item.name}</Text>
              </View>
              <View style={styles.lines} />
              <View>{this.renderListPaymentMethodContent(item)}</View>
            </ScrollView>
          </View>
        ) : (
          <View key={index} />
        );
      }
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
              <Text style={styles.titleModalBottom}>Metode Pembayaran</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            {this.props.paymentType !== null ? (
              this.renderListPaymentMethod()
            ) : (
              <View />
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

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
  }
});

export default ModalBottomPaymentMethod;
