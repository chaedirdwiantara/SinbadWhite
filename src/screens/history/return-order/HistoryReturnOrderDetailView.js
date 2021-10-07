import {
  React,
  Component,
  View,
  Text,
  StyleSheet,
  height,
  FlatList,
  Image
} from '../../../library/reactPackage';
import {
  connect,
  bindActionCreators,
  moment
} from '../../../library/thirdPartyPackage';
import { StatusBarWhite } from '../../../library/component';
import * as ActionCreators from '../../../state/actions';
import { Color } from '../../../config';
import { Fonts, MoneyFormat, GlobalStyle } from '../../../helpers';

class HistoryReturnOrderDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mockData: {
        returnParcelsId: 14,
        returnCode: 'R1202106000001',
        userId: '3232',
        userName: 'Mr Abc',
        storeId: 12213,
        storeName: 'Indah Mart',
        status: 'pending',
        returns: [
          {
            id: 12,
            catalogueId: 12,
            name: 'SGM 123 SGM 123 SGM 123 SGM 123 SGM 123 SGM 123 SGM 123 ',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/113443.png',
            qty: 2,
            unitPrice: 1000,
            sumPrice: 2000,
            returnReasonsId: 1,
            reason: 'Kemasan Rusak',
            note: 'barang pecah'
          },
          {
            id: 13,
            catalogueId: 14,
            name: 'SGM 456',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/113443.png',
            qty: 3,
            unitPrice: 1000,
            sumPrice: 3000,
            returnReasonsId: 1,
            reason: 'Kemasan Rusak',
            note: 'barang pecah'
          }
        ],
        created_at: '2021-06-02T04:23:27.481Z',
        returned: true,
        amount: 5000
      }
    };
  }

  static navigationOptions = ({ navigation }) => {
    let returnCode = '';
    if (navigation.state.params) {
      returnCode = navigation.state.params.returnCode;
    }
    return {
      headerTitle: () => (
        <View>
          <Text style={[Fonts.type35, { color: Color.fontBlack80 }]}>
            {returnCode}
          </Text>
        </View>
      )
    };
  };

  renderSummary() {
    return (
      <View
        style={[
          GlobalStyle.shadowForBox,
          {
            paddingHorizontal: 16,
            paddingVertical: 12
          }
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            marginVertical: 4
          }}
        >
          <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
            Status
          </Text>
          <Text style={[Fonts.fontC1SemiBold, { color: Color.fontGreen50 }]}>
            Selesai
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            marginVertical: 4
          }}
        >
          <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
            Tanggal Dibuat
          </Text>
          <Text style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}>
            {moment('2021-06-02T04:23:27.481Z').format('DD MMMM YYYY HH:MM:SS')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            marginVertical: 4
          }}
        >
          <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
            Total Jumlah Retur
          </Text>
          <Text style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}>
            {/* {this.props.data.reduce(
              (prevQty, currentQty) => prevQty + currentQty.qty,
              0
            )}{' '} */}
            0 Qty
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            marginVertical: 4
          }}
        >
          <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
            Total Produk Retur
          </Text>
          <Text style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}>
            4 SKU
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            marginVertical: 4
          }}
        >
          <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
            Total Dana Retur
          </Text>
          <Text style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}>
            {MoneyFormat(60000)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            marginVertical: 4
          }}
        >
          <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
            Barang Sudah Dibawa
          </Text>
          <Text style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}>
            Tidak
          </Text>
        </View>
      </View>
    );
  }

  renderSeparator() {
    return <View style={{ marginBottom: 12 }} />;
  }

  renderData() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={this.renderSeparator}
          numColumns={1}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem.bind(this)}
          data={this.state.mockData.returns}
        />
      </View>
    );
  }

  renderItem({ item, index }) {
    return (
      <View
        key={index}
        style={[styles.cardContainer, GlobalStyle.shadowForBox]}
      >
        <View style={styles.boxContent}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 16,
              marginVertical: 21
            }}
          >
            <View
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              <Image
                defaultSource={require('../../../assets/images/sinbad_image/sinbadopacity.png')}
                source={{ uri: item.imageUrl }}
                style={[GlobalStyle.image46, { borderRadius: 5 }]}
              />
              <Text
                style={[
                  Fonts.fontH11SemiBold,
                  {
                    flex: 1,
                    flexWrap: 'wrap',
                    color: Color.fontBlack80,
                    alignSelf: 'flex-start'
                  }
                ]}
              >
                {item.name}
              </Text>
            </View>
          </View>
          <View style={GlobalStyle.lines} />
          <View
            style={{
              flex: 1,
              margin: 16
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                marginVertical: 6
              }}
            >
              <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
                Barang dikembalikan
              </Text>
              <Text
                style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}
              >
                {item.qty} Qty
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                marginVertical: 6
              }}
            >
              <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
                Pengembalian Dana
              </Text>
              <Text
                style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}
              >
                {MoneyFormat(item.sumPrice)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                marginVertical: 6
              }}
            >
              <Text style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}>
                Alasan Retur
              </Text>
              <Text
                style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}
              >
                {item.reason}
              </Text>
            </View>
          </View>
          <View style={GlobalStyle.lines} />
          <View
            style={{
              flex: 1,
              margin: 16
            }}
          >
            <Text style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}>
              Catatan
            </Text>
            <Text
              style={[
                Fonts.fontC1SemiBold,
                { color: Color.fontBlack80, marginTop: 8 }
              ]}
            >
              {item.note === '' ? '-' : item.note}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderContent() {
    return (
      <View style={styles.mainContainer}>
        {this.renderSummary()}
        {this.renderData()}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarWhite />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  contentContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    maxHeight: 0.8 * height,
    backgroundColor: Color.backgroundWhite,
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1000
  },
  boxContentBody: {
    flex: 1
  },
  boxContentTitle: {
    marginTop: 18,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  boxClose: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    left: 16
  },
  input: {
    padding: 0,
    alignItems: 'center',
    width: '100%',
    textAlign: 'left',
    marginLeft: 16
  },
  /** FOR INPUT  */
  inputList: {
    flex: 1,
    borderWidth: 1,
    borderColor: Color.fontBlack40,
    borderRadius: 4,
    backgroundColor: Color.backgroundWhite,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    backgroundColor: Color.backgroundWhite,
    borderRadius: 8
  },
  boxContent: {
    flex: 1,
    borderRadius: 16
  },
  flatListContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Color.backgroundWhite
  }
});

const mapStateToProps = ({ history }) => {
  return { history };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryReturnOrderDetailView);
