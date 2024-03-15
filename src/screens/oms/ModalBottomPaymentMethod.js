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
import { MaterialIcon } from '../../library/thirdPartyPackage';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {
  StatusBarRedOP50,
  ModalBottomType4,
  SkeletonType8
} from '../../library/component';
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';

const { height } = Dimensions.get('window');

class ModalBottomPaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * ====================
   * RENDER
   * ====================
   */
  /** RENDER PAYMENT LIST CONTENT */
  renderListPaymentMethodContent(item) {
    return item.map((itemPaymnetMethod, index) => {
      return itemPaymnetMethod.status !== 'disabled' ? (
        <View key={index}>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'btnCheckoutMetodePembayaran'}
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              height: 48
            }}
            onPress={() => this.props.selectPaymentMethod(itemPaymnetMethod)}
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
            onPress={() => this.props.selectPaymentMethod(itemPaymnetMethod)}
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
              <Text style={[Fonts.type8, { opacity: 0.5 }]}>
                {itemPaymnetMethod.name}
              </Text>
              <Text style={[Fonts.type28, { opacity: 0.5 }]}>
                {itemPaymnetMethod.message}
                {/* Tidak tersedia untuk transaksi ini */}
              </Text>
            </View>
            <View style={{ width: '5%', justifyContent: 'center' }}>
              <Icons style={{ opacity: 0.5 }} name="navigate-next" size={24} />
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
        </View>
      );
    });
  }
  /** RENDER PAYMENT TYPE */
  renderPaymentType() {
    return (
      <View>
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={Fonts.type48}>Tipe Pembayaran</Text>
            <TouchableOpacity onPress={this.props.close}>
              <Text style={Fonts.type11}>Ubah</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginRight: 20,
              paddingVertical: 16,
              flexDirection: 'row'
            }}
          >
            <Image
              source={{ uri: this.props.paymentType.paymentType.iconUrl }}
              style={{ height: 24, width: 24 }}
            />
            <Text
              style={(Fonts.type8, { marginLeft: 10, alignSelf: 'center' })}
            >
                {this.props.paymentType.paymentType.name} 
              {
                this.props.selectedPaylaterType === null 
                ? null
                : ` - ${this.props.selectedPaylaterType.name}`
              }
             
            </Text>
          </View>
        </View>
        <View style={GlobalStyle.boxPaddingOms} />
      </View>
    );
  }
  /** RENDER PAYMENT LIST */
  renderListPaymentMethod() {
    return this.props.paymentMethod !== null ? (
      this.props.paymentMethod.paymentChannels.map((item, index) => {
        return (
          <View key={index} style={{marginBottom: 16}}>
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

  /**RENDER PAYMENT METHOD*/
  renderPaymentMethod() {
    return (
      <View>
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Text style={Fonts.type48}>Pilih Metode Pembayaran</Text>
        </View>
        {this.renderListPaymentMethod()}
      </View>
    );
  }
  renderSkeleton() {
    return <SkeletonType8 />;
  }
  /** RENDER CONTENT */
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRedOP50 />
        <View style={styles.container}>
          <View>{this.renderPaymentType()}</View>
          {/* {this.renderPaymentType()} */}
          {!this.props.loading && this.props.paymentType !== null ? (
            <ScrollView>{this.renderPaymentMethod()}</ScrollView>
          ) : (
            this.renderSkeleton()
          )}
        </View>
      </View>
    );
  }
  /** MAIN */
  render() {
    return (
      <ModalBottomType4
        typeClose={'close'}
        open={this.props.open}
        onPress={this.props.close}
        close={this.props.close}
        title={'Metode Pembayaran'}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  container: {
    height: 0.6 * height
  }
});

export default ModalBottomPaymentMethod;

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Tatas
 * updatedDate: 06072020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
