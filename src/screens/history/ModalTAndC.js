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
  // import { ScrollView } from 'react-native-gesture-handler';
  // import GlobalStyle from '../../helpers/GlobalStyle';
  import ButtonSingle from '../../components/button/ButtonSingle';

const { width, height } = Dimensions.get('window');

class ModalTAndC extends Component {
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
      ) : <View />
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
      ) : <View />

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
              <View>
                <ButtonSingle
                  loading={this.props.loadingConfirmOrder}
                  loadingPadding={33}
                  onPress={() => this.props.confirmOrder()}
                  title={'Ubah'}
                  borderRadius={4}
                  style={{ width: '50%' }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
        {/* <View style={styles.container}>
          {!this.props.oms.loadingOmsGetPayment &&
          this.props.oms.dataOmsGetPayment !== null ? (
            <ScrollView>{this.renderListPaymentType()}</ScrollView>
          ) : (
            this.renderSkeleton()
          )}
        </View> */}
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
      // <Modal
      //   visible={this.props.open}
      //   transparent
      //   animationType="fade"
      //   onRequestClose={() => {}}
      // >
      //   <StatusBarRedOP50 />
      //   <View style={styles.container}>
      //     <View style={styles.boxModal}>
      //       <View style={{ height: 60 }}>
      //         <View style={styles.closeContainer}>
      //           <TouchableOpacity
      //             onPress={this.props.close}
      //             style={styles.closeBox}
      //           >
      //             <MaterialIcon
      //               name="close"
      //               color={masterColor.fontBlack50}
      //               size={24}
      //             />
      //           </TouchableOpacity>
      //           <Text style={Fonts.type30}>
      //             {this.props.data.paymentType.name}
      //           </Text>
      //         </View>
      //       </View>
      //       <View style={styles.contentContainer}>
      //         <HTMLView
      //           value={this.props.data.paymentType.terms}
      //           stylesheet={GlobalStyleHtml}
      //         />
      //       </View>
      //       <View style={styles.tAndRContainer}>
      //         <TouchableOpacity
      //           onPress={() =>
      //             this.setState({ tAndRCheck: !this.state.tAndRCheck })
      //           }
      //         >
      //           {this.state.tAndRCheck ? (
      //             <Icons
      //               color={masterColor.mainColor}
      //               name="checkbox-marked"
      //               size={24}
      //             />
      //           ) : (
      //             <Icons
      //               color={masterColor.fontBlack40}
      //               name="checkbox-blank-outline"
      //               size={24}
      //             />
      //           )}
      //         </TouchableOpacity>
      //         <View style={{ marginLeft: 5, marginRight: 5 }}>
      //           <Text style={Fonts.type38}>
      //             Dengan ini saya menyetujui{' '}
      //             <Text style={Fonts.type28}>Syarat & Ketentuan</Text> yang
      //             berlaku
      //           </Text>
      //         </View>
      //       </View>
      //       <View style={styles.buttonContainer}>{this.renderButton()}</View>
      //     </View>
      //   </View>
      // </Modal>
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

export default ModalTAndC;
