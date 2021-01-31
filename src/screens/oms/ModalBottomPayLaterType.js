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
  import {
    StatusBarRedOP50,
    ModalBottomType3,
    SkeletonType24
  } from '../../library/component';
  import { GlobalStyle, Fonts } from '../../helpers';
  import masterColor from '../../config/masterColor.json';
  import { MoneyFormat } from '../../helpers/NumberFormater';


  const { height } = Dimensions.get('window');

  class ModalBottomPaylaterType extends Component {
    constructor(props) {
      super(props);
      this.state = {
          dataPaylaterType: {
            paymentTypeId: 3,
            orderParcelId: 24,
            paylaterType : [
                {
                    id: 1,
                    name: "Supplier",
                    image: "https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_method_icon/bca.png",
                    status: "disabled",
                    description: "Layanan Bayar Nanti yang langsung disediakan oleh supplier",
                    isRedirect: true,
                    redirectUrl: "https://google.co.id"

                },
                {
                    id: 2,
                    name: "KUR KlikACC",
                    image: "https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_method_icon/bca.png",
                    status: "enabled",
                    description: "Kredit Usaha Rakyat (KUR) merupakan sebuah layanan yang diberikan oleh pemerintah",
                    isRedirect: true,
                    redirectUrl: "https://google.co.id"

                },
            ]
          }
      };
    }
    /**
     * ====================
     * RENDER
     * ====================
     */
    /** RENDER PAYMENT TYPE */
    renderPaylaterType() {
        return this.state.dataPaylaterType.paylaterType.map((item, index) => {
      return (
        <View>
            <TouchableOpacity
                disabled={item.status === "disabled"}
                style={{
                    backgroundColor: item.status === "disabled" 
                    ? masterColor.fontBlack10
                    : null,
                    opacity: item.status === "disabled" 
                    ? 0.5
                    : null,
                }}
                onPress={() => this.props.selectPaylaterType(item)}
            >
                <View
                    style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    marginVertical: 16
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ marginBottom: 4 }}>
                            <Text style={Fonts.type42}>
                                {item.name}
                            </Text>
                        </View>
                        <View>
                            <Text style={Fonts.type8}>
                                {item.description}
                            </Text>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center' }}>
                        <MaterialIcon
                        name="navigate-next"
                        size={24}
                        // style={!item.availableStatus ? { opacity: 0.5 } : {}}
                    />
                </View>
            </View>
            <View
                style={[GlobalStyle.lines, { marginLeft: 16 }]}
            />
        </TouchableOpacity>
      </View>
      );
    })
    }

    /** RENDER CONTENT */
    renderContent() {
      return (
        <View style={styles.mainContainer}>
          <StatusBarRedOP50 />
          <View style={styles.container}>
            <View>{this.renderPaylaterType()}</View>
          </View>
        </View>
      );
    }
    /** MAIN */
    render() {
      return (
        <ModalBottomType3
          typeClose={'close'}
          open={this.props.open}
          onPress={this.props.close}
          close={this.props.close}
          title={'Tipe Bayar Nanti'}
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

  export default ModalBottomPaylaterType;