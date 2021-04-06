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
    this.state = {};
  }
  /**
   * ====================
   * RENDER
   * ====================
   */
  /** RENDER PAYMENT TYPE */
  renderPaylaterType() {
    return this.props.payLaterType.paylaterTypes.map((item, index) => {
      return (
        <View>
          <TouchableOpacity
            disabled={item.status === 'disabled'}
            style={{
              backgroundColor:
                item.status === 'disabled' ? masterColor.fontBlack10 : null,
              opacity: item.status === 'disabled' ? 0.5 : null
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
                  <Text style={Fonts.type42}>{item.name}</Text>
                </View>
                <View>
                  <Text style={Fonts.type8}>{item.description}</Text>
                </View>
                {(item.message || item.message !== '' ) && item.status !== 'enabled' ? (
                  <View style={{ marginTop: 8 }}>
                    <Text style={Fonts.type28}>{item.message}</Text>
                  </View>
                ) : null}
              </View>
              <View style={{ justifyContent: 'center' }}>
                <MaterialIcon
                  name="navigate-next"
                  size={24}
                  // style={!item.availableStatus ? { opacity: 0.5 } : {}}
                />
              </View>
            </View>
            <View style={[GlobalStyle.lines, { marginLeft: 16 }]} />
          </TouchableOpacity>
        </View>
      );
    });
  }

  /** RENDER CONTENT */
  renderModalContent() {
    return (
      <View>
        {this.renderPaylaterType()}
        </View>
      //   </View>
      // </View>
    );
  }

  /** RENDER SKELETEON */
  renderSkeleton() {
    return <SkeletonType24 />;
  }

  /** RENDER CONTENT */
  renderContent() {
    return (
      <>
        <View style={styles.mainContainer}>
          <StatusBarRedOP50 />
          <View style={styles.container}>
            {!this.props.loading && this.props.payLaterType
              ? this.renderModalContent()
              : this.renderSkeleton()}
          </View>
        </View>
      </>
    );
  }
  /** MAIN */
  render() {
    return (
      <>
        <ModalBottomType3
          typeClose={'close'}
          open={this.props.open}
          onPress={this.props.close}
          close={this.props.close}
          title={'Penyedia Layanan'}
          content={this.renderContent()}
        />
      </>
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
