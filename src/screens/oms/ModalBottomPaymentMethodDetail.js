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
  MaterialIcon,
  HTMLView
} from '../../library/thirdPartyPackage'
import {
  ButtonSingle,
  StatusBarRedOP50,
  ModalBottomType4
} from '../../library/component'
import { GlobalStyle, Fonts, GlobalStyleHtml } from '../../helpers'
import masterColor from '../../config/masterColor.json';

const { height } = Dimensions.get('window');

class ModalBottomPaymentMethodDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCollapse: false
    };
  }
  /**
   * ======================
   * RENDER
   * ======================
   */
  /** RENDER BUTTON */
  renderButton() {
    return (
      <ButtonSingle
        onPress={() =>
          this.props.selectedPayment(this.props.paymentMethodDetail)
        }
        disabled={false}
        loading={false}
        borderRadius={4}
        title={'Pilih Metode'}
      />
    );
  }
  /** RENDER DETAIL CONTENT COLAPSE */
  renderContentCollapse() {
    return this.state.openCollapse ? (
      <View style={{ paddingHorizontal: 25, paddingVertical: 10 }}>
        <HTMLView
          value={this.props.paymentMethodDetail.paymentMethod.description}
          stylesheet={GlobalStyleHtml}
        />
      </View>
    ) : (
      <View />
    );
  }
  /** RENDER DETAIL */
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
            <Text style={Fonts.type16}>
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
                  style={{ width: 50, height: 20 }}
                />
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
        <View style={styles.backgroundDetail}>
          <HTMLView
            value={this.props.paymentMethodDetail.paymentMethod.terms}
            stylesheet={GlobalStyleHtml}
          />
        </View>
      </View>
    );
  }
  /** RENDER PANDUAN PEMBAYARAN */
  renderPanduanPembayaran() {
    return (
      <View>
        <View style={styles.boxTitle}>
          <Text style={Fonts.type16}>Panduan Pembayaran</Text>
        </View>
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
        <TouchableOpacity
          style={styles.boxCollapse}
          onPress={() =>
            this.setState({ openCollapse: !this.state.openCollapse })
          }
        >
          <View style={{ justifyContent: 'center' }}>
            <Text style={Fonts.type8}>
              {this.props.paymentMethodDetail.paymentMethod.name}
            </Text>
          </View>
          <View>
            {!this.state.openCollapse ? (
              <MaterialIcon name="keyboard-arrow-down" size={24} />
            ) : (
              <MaterialIcon name="keyboard-arrow-up" size={24} />
            )}
          </View>
        </TouchableOpacity>
        {this.renderContentCollapse()}
        <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
      </View>
    );
  }
  /** MAIN */
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRedOP50 />
        <View style={styles.container}>
          <ScrollView>
            {this.renderDetails()}
            {this.renderPanduanPembayaran()}
          </ScrollView>
          <View>{this.renderButton()}</View>
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
        title={this.props.title}
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
  },
  boxTitle: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  backgroundDetail: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 5,
    marginTop: 10,
    backgroundColor: masterColor.fontBlack05
  },
  boxCollapse: {
    paddingLeft: 20,
    paddingRight: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});

export default ModalBottomPaymentMethodDetail;

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
