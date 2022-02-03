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
import {
  connect,
  MaterialIcon,
  bindActionCreators
} from '../../library/thirdPartyPackage';
import {
  StatusBarRedOP50,
  SkeletonType8,
  ModalBottomType3
} from '../../library/component';
import { Color } from '../../config';
import { GlobalStyle, Fonts } from '../../helpers';
import * as ActionCreators from '../../state/actions';

const { height } = Dimensions.get('window');

class ModalBottomPaymentType extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.omsGetPaymentProcess({
      parcelId: this.props.parcelId
    });
  }

  renderListPaymentTypeContent(item) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          height: 0.09 * height
        }}
      >
        <View style={{ width: '10%', justifyContent: 'center' }}>
          <Image
            source={{
              uri: item.paymentType.iconUrl
            }}
            style={
              !item.availableStatus
                ? [styles.icons, { opacity: 0.5 }]
                : styles.icons
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 5 }}>
            <Text
              style={
                !item.availableStatus
                  ? [Fonts.type16, { opacity: 0.5 }]
                  : Fonts.type16
              }
            >
              {item.paymentType.name}
            </Text>
          </View>
          <View>
            <Text
              style={
                !item.availableStatus
                  ? [Fonts.type17, { opacity: 0.5 }]
                  : Fonts.type17
              }
            >
              {item.paymentType.description}
            </Text>
          </View>
        </View>
        <View style={{ width: '5%', justifyContent: 'center' }}>
          <MaterialIcon
            name="navigate-next"
            size={24}
            style={!item.availableStatus ? { opacity: 0.5 } : {}}
          />
        </View>
      </View>
    );
  }

  renderListPaymentType() {
    return this.props.oms.dataOmsGetPayment.map((item, index) => {
      return (
        <View key={index}>
          {!item.availableStatus ? (
            <View>{this.renderListPaymentTypeContent(item)}</View>
          ) : (
            <TouchableOpacity
              accessible={true}
              accessibilityLabel={'btnCheckoutPilihTipePembayaran'}
              onPress={() => this.props.selectPaymentType(item)}
            >
              {this.renderListPaymentTypeContent(item)}
            </TouchableOpacity>
          )}

          <View
            style={[GlobalStyle.lines, { marginLeft: 16, marginVertical: 10 }]}
          />
        </View>
      );
    });
  }

  renderSkeleton() {
    return <SkeletonType8 />;
  }
  /** RENDER CONTENT */
  renderContent() {
    const dataPaymentType = this.props?.oms?.dataOmsGetPayment;
    return (
      <View style={styles.mainContainer}>
        <StatusBarRedOP50 />
        <View style={styles.warningContainer}>
          <View
            style={{
              backgroundColor: Color.fontYellow10,
              borderRadius: 8
            }}
          >
            {dataPaymentType?.map(item =>
              parseInt(item.paymentTypeId, 10) === 2 && item.overLimitStatus ? (
                <View
                  style={styles.warningItems}
                  testID={'view-warning-credit'}
                >
                  <MaterialIcon
                    name={'info'}
                    size={24}
                    color={Color.fontYellow40}
                  />
                  <Text
                    style={[Fonts.type69, { marginLeft: 8, fontSize: 12 }]}
                    testID={'text-warning-credit'}
                  >
                    {item.warningMessage ?? ''}
                  </Text>
                </View>
              ) : null
            )}
          </View>
        </View>
        <View style={styles.container}>
          {!this.props.oms.loadingOmsGetPayment &&
          this.props.oms.dataOmsGetPayment !== null ? (
            <ScrollView>{this.renderListPaymentType()}</ScrollView>
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
      <ModalBottomType3
        typeClose={'cancel'}
        open={this.props.open}
        onPress={this.props.close}
        close={this.props.close}
        title={'Tipe Pembayaran'}
        content={this.renderContent()}
      />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  container: {
    height: 0.4 * height
  },
  icons: {
    width: 24,
    height: 24
  },
  warningContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  warningItems: { flexDirection: 'row', padding: 16, marginRight: '5%' }
});

const mapStateToProps = ({ oms }) => {
  return { oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBottomPaymentType);

/**
 * ============================
 * NOTES
 * ============================
 * createdBy:
 * createdDate:
 * updatedBy: Tatas
 * updatedDate: 07072020
 * updatedFunction:
 * -> Refactoring Module Import
 *
 */
