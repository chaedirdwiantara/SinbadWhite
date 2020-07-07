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
} from '../../library/reactPackage'
import {
  MaterialIcon
} from '../../library/thirdPartyPackage'
import {
  StatusBarRedOP50,
  ModalBottomType4
} from '../../library/component'
import { GlobalStyle, Fonts } from '../../helpers'
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
                  style={{ width: 50, height: 20 }}
                />
              </View>
            ) : (
              <View />
            )}

            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={Fonts.type8}>
                {itemPaymnetMethod.paymentMethod.name}
              </Text>
            </View>
            <View style={{ width: '5%', justifyContent: 'center' }}>
              <MaterialIcon name="navigate-next" size={24} />
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
        </View>
      ) : (
        <View key={index} />
      );
    });
  }
  /** RENDER PAYMENT LIST */
  renderListPaymentMethod() {
    return this.props.paymentType.paymentType.paymentGroups.map(
      (item, index) => {
        return item.paymentMethods.length > 0 ? (
          <View key={index}>
            <ScrollView>
              <View
                style={{ paddingLeft: 16, marginBottom: 10, marginTop: 20 }}
              >
                <Text style={Fonts.type16}>{item.name}</Text>
              </View>
              <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
              <View>{this.renderListPaymentMethodContent(item)}</View>
            </ScrollView>
          </View>
        ) : (
          <View key={index} />
        );
      }
    );
  }
  /** RENDER CONTENT */
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRedOP50 />
        <View style={styles.container}>
          <ScrollView>
            {this.props.paymentType !== null ? (
              this.renderListPaymentMethod()
            ) : (
              <View />
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
  /** MAIN */
  render() {
    return (
      <ModalBottomType4
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
