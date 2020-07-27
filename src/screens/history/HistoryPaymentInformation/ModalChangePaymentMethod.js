import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Text
} from 'react-native';
import Fonts from '../../../helpers/GlobalFont';
import GlobalStyle from '../../../helpers/GlobalStyle';
import Icons from 'react-native-vector-icons/MaterialIcons';
const { height } = Dimensions.get('window');
import ModalBottomType4 from '../../../components/modal_bottom/ModalBottomType4';
import { StatusBarRedOP50 } from '../../../components/StatusBarGlobal';
import masterColor from '../../../config/masterColor.json';
import { MoneyFormat } from '../../../helpers/NumberFormater';
class ModalChangePaymentMethod extends Component {
  renderPaymentType() {
    return (
      <View>
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={Fonts.type48}>Tipe Pembayaran</Text>
          </View>
          <View
            style={{
              marginRight: 20,
              paddingVertical: 16,
              flexDirection: 'row'
            }}
          >
            <Image
              source={{ uri: this.props.paymentType.iconUrl }}
              style={{ height: 24, width: 24 }}
            />
            <Text
              style={(Fonts.type8, { marginLeft: 10, alignSelf: 'center' })}
            >
              {this.props.paymentType.name}
            </Text>
          </View>
        </View>
        <View style={GlobalStyle.boxPaddingOms} />
      </View>
    );
  }
  renderListPaymentMethodContent(item) {
    return item.map((itemPaymnetMethod, index) => {
      return itemPaymnetMethod.status === 'enabled' ? (
        <View key={index}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              height: 48
            }}
            onPress={() => this.props.actionChange(itemPaymnetMethod.id)}
          >
            {itemPaymnetMethod.image !== null ? (
              <View style={{ width: '17%', justifyContent: 'center' }}>
                <Image
                  source={{
                    uri: itemPaymnetMethod.image
                  }}
                  style={{ width: 50, height: 20 }}
                />
              </View>
            ) : (
                <View />
              )}
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={Fonts.type8}>{itemPaymnetMethod.name}</Text>
              <Text style={Fonts.type28}>
                Total Biaya {MoneyFormat(itemPaymnetMethod.totalPayment)}
              </Text>
            </View>
            <View style={{ width: '5%', justifyContent: 'center' }}>
              <Icons name="navigate-next" size={24} />
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
        </View>
      ) : (
          <View key={index} style={{ backgroundColor: masterColor.fontBlack10 }}>
            <TouchableOpacity
              disabled={true}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                height: 48
              }}
            // onPress={() => this.props.selectPaymentMethod(itemPaymnetMethod)}
            >
              {itemPaymnetMethod.image !== null ? (
                <View style={{ width: '17%', justifyContent: 'center' }}>
                  <View style={{ opacity: 0.5 }}>
                    <Image
                      source={{
                        uri: itemPaymnetMethod.image
                      }}
                      style={{ width: 50, height: 20 }}
                    />
                  </View>
                </View>
              ) : (
                  <View />
                )}
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={[Fonts.type8, { opacity: 0.5 }]}>{itemPaymnetMethod.name}</Text>
                <Text style={[Fonts.type28, { opacity: 0.5 }]}>
                  Tidak tersedia untuk transaksi ini
              </Text>
              </View>
              <View style={{ width: '5%', justifyContent: 'center' }}>
                <Icons name="navigate-next" size={24} />
              </View>
            </TouchableOpacity>
            <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
          </View>
        );
    });
  }

  renderListPaymentMethod() {
    return this.props.paymentMethod.data !== null ? (
      this.props.paymentMethod.data.paymentChannels.map((item, index) => {
        return (
          <View key={index}>
            <ScrollView>
              <View
                style={{ paddingLeft: 16, marginBottom: 10}}
              >
              </View>
              <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
              <View>{this.renderListPaymentMethodContent(item.type)}</View>
            </ScrollView>
          </View>
        );
      })
    ) : (
        <View />
      );
  }

  renderContent() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRedOP50 />
        <View style={styles.container}>
          <ScrollView>
            <View>{this.renderPaymentType()}</View>
            
              <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                <Text style={Fonts.type48}>Pilih Metode Pembayaran</Text>
              </View>
            {this.props.paymentMethod !== null ? (
              this.renderListPaymentMethod()
            ) : (
                <View />
              )}
          </ScrollView>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ModalBottomType4
        typeClose={'cancel'}
        open={this.props.open}
        onPress={this.props.close}
        close={this.props.close}
        title={'Metode Pembayaran'}
        content={this.renderContent()}
      />
    );
  }
}

export default ModalChangePaymentMethod;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  container: {
    height: 0.6 * height
  }
});
