import {
  React,
  Component,
  View,
  StyleSheet,
  Dimensions,
  Modal,
  ScrollView,
  ModalPopUp,
  TouchableOpacity,
  Text
} from '../../library/reactPackage'

import {
  Button,
  MaterialIcon,
  MaterialCommunityIcons,
  HTMLView
} from '../../library/thirdPartyPackage'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import masterColor from '../../config/masterColor.json';
import {
  StatusBarRedOP50
} from '../../library/component';
import { Fonts, GlobalStyle, GlobalStyleHtml } from '../../helpers'
import ModalBottomType4 from '../../components/modal_bottom/ModalBottomType4';
import ButtonSingle from '../../components/button/ButtonSingle';

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
        accessible={true}
        accessibilityLabel={'btnCheckoutLanjutkanTandC'}
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
  /** RENDER TAndR Payment Type */
  renderTAndRPaymentType(item) {
    return item !== null ? (
      item.paymentTypes !== null ? (
        item.paymentTypes.map((item, index) => {
          return (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={Fonts.type50}>{item.name}</Text>
              <HTMLView value={item.term} stylesheet={GlobalStyleHtml} />
            </View>
          );
        })
      ) : (
        <View />
      )
    ) : (
      <View />
    );
  }

 /** RENDER TAndR Paylater Type */
 renderTAndRPaylaterType(item) {
  return item !== null ? (
    item.paylaterTypes !== null ? (
      item.paylaterTypes.map((item, index) => {
        return (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={Fonts.type50}>{item.name}</Text>
            <HTMLView value={item.term} stylesheet={GlobalStyleHtml} />
          </View>
        );
      })
    ) : (
      <View />
    )
  ) : (
    <View />
  );
}

  /** RENDER TAndR Payment Channel */
  renderTAndRPaymentChannel(item) {
    return item !== null ? (
      item.paymentChannels !== null ? (
        item.paymentChannels.map((item, index) => {
          return (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={Fonts.type50}>{item.name}</Text>
              <HTMLView value={item.term} stylesheet={GlobalStyleHtml} />
            </View>
          );
        })
      ) : (
        <View />
      )
    ) : (
      <View />
    );
  }
  /** RENDER TAndR Item */
  renderTAndRItem() {
    return this.props.data !== null ? (
      this.props.data.map((item, index) => {
        return (
          <View key={index} style={styles.mainContainer}>
            {this.renderTAndRPaylaterType(item)}
            {this.renderTAndRPaymentType(item)}
            <View style={[GlobalStyle.lines, { marginVertical: 10 }]} />
            {this.renderTAndRPaymentChannel(item)}
          </View>
        );
      })
    ) : (
      <View />
    );
  }

  /** RENDER CONTENT */
  renderContent() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarRedOP50 />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <ScrollView>
              <Text
                style={[
                  Fonts.type91,
                  { alignSelf: 'center', paddingVertical: 16 }
                ]}
              >
                Dengan ini saya menyetujui syarat & ketentuan yang berlaku
              </Text>
              <View style={styles.backgroundDetail}>
                {this.renderTAndRItem()}
              </View>
              </ScrollView>
              <View>
                <ButtonSingle
                  loading={this.props.loadingConfirmOrder}
                  loadingPadding={33}
                  onPress={() => this.props.confirmOrder()}
                  title={'Buat Pesanan'}
                  borderRadius={4}
                  style={{ width: '50%' }}
                />
              </View>
            
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ModalBottomType4
        open={this.props.open}
        onPress={this.props.close}
        close={this.props.close}
        typeClose={'cancel'}
        title={'Syarat & Ketentuan'}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 0.7 * height,
    backgroundColor: masterColor.backgroundWhite,
    flexDirection: 'column',
    width: '100%',
    paddingBottom: 0.01 * height
  },
  contentContainer: {
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
    backgroundColor: masterColor.mainColor,
    borderRadius: 8,
    width: 258,
    height: 41
  },
  buttonDisabled: {
    backgroundColor: masterColor.fontBlack40,
    borderRadius: 8,
    width: 258,
    height: 41
  },
  backgroundDetail: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 5,
    marginTop: 10,
    backgroundColor: masterColor.fontBlack05
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
 * updatedDate: 15072020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
