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
import { StatusBarWhite, LoadingPage } from '../../../library/component';
import * as ActionCreators from '../../../state/actions';
import { Color } from '../../../config';
import { Fonts, MoneyFormat, GlobalStyle } from '../../../helpers';

class HistoryReturnOrderDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
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

  componentDidMount() {
    this.getReturnParcelDetail();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.history.dataGetReturnParcelDetail !==
      this.props.history.dataGetReturnParcelDetail
    ) {
      if (this.props.history.dataGetReturnParcelDetail !== null) {
        this.loading(false);
      }
    }
  }

  loading(status) {
    this.setState({ loading: status });
  }

  getReturnParcelDetail() {
    this.loading(true);
    this.props.getReturnParcelDetailProcess({
      returnParcelId: this.props.navigation.state.params.returnParcelId
    });
  }

  checkStatus(status) {
    const data = this.props.history.dataGetReturnStatus.find(
      item => item.status === status
    );
    if (data) {
      return data.title;
    } else {
      return '';
    }
  }

  checkStatusColor(status) {
    if (status === 'pending') {
      return Color.fontYellow50;
    } else if (status === 'rejected') {
      return Color.fontRed50;
    } else {
      return Color.fontGreen50;
    }
  }

  renderSummary() {
    const data = this.props.history.dataGetReturnParcelDetail;
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
          <Text
            style={[
              Fonts.fontC1SemiBold,
              { color: this.checkStatusColor(data.status) }
            ]}
          >
            {this.checkStatus(data.status)}
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
            {moment(data.createdAt).format('DD MMMM YYYY HH:MM:SS')}
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
            {data.returns.reduce(
              (prevQty, currentQty) => prevQty + currentQty.qty,
              0
            )}{' '}
            Qty
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
            {data.returns.length} SKU
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
            {MoneyFormat(data.amount)}
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
            {data.returned === true ? 'Ya' : 'Tidak'}
          </Text>
        </View>
      </View>
    );
  }

  renderSeparator() {
    return <View style={{ marginBottom: 12 }} />;
  }

  renderData() {
    const data = this.props.history.dataGetReturnParcelDetail;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={this.renderSeparator}
          numColumns={1}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem.bind(this)}
          data={data.returns}
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
                    alignSelf: 'flex-start',
                    marginLeft: 8
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
              <View style={{ flex: 1 }}>
                <Text
                  style={(Fonts.fontC2Medium, { color: Color.fontBlack80 })}
                >
                  Alasan Retur
                </Text>
              </View>
              <View style={{ flex: 2, paddingLeft: 16 }}>
                <Text
                  style={[
                    Fonts.fontC1SemiBold,
                    { color: Color.fontBlack80, textAlign: 'right' }
                  ]}
                >
                  {item.reason}
                </Text>
              </View>
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

  renderLoadingPage() {
    return <LoadingPage />;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBarWhite />
        {this.state.loading || this.props.history.loadingGetReturnParcelDetail
          ? this.renderLoadingPage()
          : this.renderContent()}
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
