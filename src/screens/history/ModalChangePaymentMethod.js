import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Text
} from '../../library/reactPackage';
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers';
import {
  StatusBarRedOP50,
  ModalBottomType4,
  SkeletonType8
} from '../../library/component';
import { MaterialIcon } from '../../library/thirdPartyPackage';
const { height } = Dimensions.get('window');
import masterColor from '../../config/masterColor.json';
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
              <MaterialIcon name="navigate-next" size={24} />
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
                Dalam Perbaikan
                {/* Tidak tersedia untuk transaksi ini */}
              </Text>
            </View>
            <View style={{ width: '5%', justifyContent: 'center' }}>
              <MaterialIcon name="navigate-next" size={24} />
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
        </View>
      );
    });
  }

  /**RENDER PAYMENT METHOD*/
  renderPaymentMethod() {
    return (
      <View>
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <Text style={Fonts.type48}>Pilih Metode Pembayaran</Text>
        </View>
        {this.renderListPaymentMethod()}
      </View>
    );
  }

  renderListPaymentMethod() {
    return this.props.paymentMethod.data !== null ? (
      this.props.paymentMethod.data.paymentChannels.map((item, index) => {
        return (
          <View key={index}>
            <ScrollView>
              <View
                style={{ paddingLeft: 16, marginBottom: 10, marginTop: 20 }}
              >
                <Text style={Fonts.type16}>{item.name}</Text>
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
  renderSkeleton() {
    return <SkeletonType8 />;
  }
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRedOP50 />
        <View style={styles.container}>
          {/* <ScrollView> */}
          <View>{this.renderPaymentType()}</View>
          {this.props.paymentMethod !== null ? (
            <ScrollView>{this.renderPaymentMethod()}</ScrollView>
          ) : (
            this.renderSkeleton()
          )}
          {/* </ScrollView> */}
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
