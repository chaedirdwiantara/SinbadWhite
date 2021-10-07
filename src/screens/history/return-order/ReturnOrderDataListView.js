import {
  React,
  Component,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from '../../../library/reactPackage';
import { ProductListType1, SkeletonType5 } from '../../../library/component';
import {
  bindActionCreators,
  connect,
  moment
} from '../../../library/thirdPartyPackage';
import { Color } from '../../../config';
import { GlobalStyle, MoneyFormat, Fonts } from '../../../helpers';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';

class ReturnOrderDataListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      mockReturnsParcels: [
        {
          id: 12,
          orderParcelsId: 'SO001',
          returnCode: 'R1202106000001',
          userId: '3232',
          userName: 'Mr Abc',
          storeName: 'Indah Mart',
          imagesUrl:
            'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/staging/user-id-images/image_1606990533463.png',
          status: 'pending',
          amount: 120200,
          parcelQty: 7,
          returned: true,
          created_at: '2021-06-02T04:23:27.481Z',
          updated_at: '2021-06-02T04:23:27.481Z'
        },
        {
          id: 13,
          orderParcelsId: 'SO002',
          returnCode: 'R1202106000002',
          userId: '3232',
          userName: 'Mr Abc',
          storeId: 12213,
          storeName: 'Indah Mart',
          imagesUrl:
            'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/staging/user-id-images/image_1606990533463.png',
          status: 'approved',
          amount: 80000,
          parcelQty: 7,
          returned: true,
          created_at: '2021-06-02T04:23:27.481Z',
          updated_at: '2021-06-02T04:23:27.481Z'
        },
        {
          id: 13,
          orderParcelsId: 'SO002',
          returnCode: 'R1202106000002',
          userId: '3232',
          userName: 'Mr Abc',
          storeId: 12213,
          storeName: 'Indah Mart',
          imagesUrl:
            'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/staging/user-id-images/image_1606990533463.png',
          status: 'approved_returned',
          amount: 80000,
          parcelQty: 7,
          returned: true,
          created_at: '2021-06-02T04:23:27.481Z',
          updated_at: '2021-06-02T04:23:27.481Z'
        },
        {
          id: 13,
          orderParcelsId: 'SO002',
          returnCode: 'R1202106000002',
          userId: '3232',
          userName: 'Mr Abc',
          storeId: 12213,
          storeName: 'Indah Mart',
          imagesUrl:
            'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/staging/user-id-images/image_1606990533463.png',
          status: 'closed',
          amount: 80000,
          parcelQty: 7,
          returned: true,
          created_at: '2021-06-02T04:23:27.481Z',
          updated_at: '2021-06-02T04:23:27.481Z'
        },
        {
          id: 13,
          orderParcelsId: 'SO002',
          returnCode: 'R1202106000002',
          userId: '3232',
          userName: 'Mr Abc',
          storeId: 12213,
          storeName: 'Indah Mart',
          imagesUrl:
            'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/staging/user-id-images/image_1606990533463.png',
          status: 'rejected',
          amount: 80000,
          parcelQty: 7,
          returned: true,
          created_at: '2021-06-02T04:23:27.481Z',
          updated_at: '2021-06-02T04:23:27.481Z'
        }
      ]
    };
  }

  /**
   *
   * FUNCTIONAL SECTION
   */
  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 100);
  }

  toParentFunction(data) {
    console.log(data);
  }

  checkStatus(status) {
    const data = this.props.status.find(item => item.status === status);
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

  /**
   *
   * VIEW SECTION
   */
  renderItem({ item, index }) {
    return (
      <View
        key={index}
        style={[styles.cardContainer, GlobalStyle.shadowForBox]}
      >
        <TouchableOpacity
          style={[styles.cardContainer, GlobalStyle.shadowForBox]}
          onPress={() =>
            NavigationService.navigate('HistoryReturnOrderDetailView', {
              returnCode: item.returnCode
            })
          }
        >
          <View style={styles.boxContent}>
            <View style={styles.boxItemContent}>
              <Text style={Fonts.type83}>{item.returnCode}</Text>
              <Text
                style={[
                  Fonts.type83,
                  { color: this.checkStatusColor(item.status) }
                ]}
              >
                {this.checkStatus(item.status)}
              </Text>
            </View>
            <View style={{ marginVertical: 16 }}>
              {/* {this.renderProductSection(item.orderBrands)} */}
            </View>
            <View style={[styles.boxItemContent, { marginBottom: 8 }]}>
              <Text style={[Fonts.fontC2Medium, { color: Color.fontBlack80 }]}>
                Tanggal Retur
              </Text>
              <Text
                style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}
              >
                {moment(new Date(item.created_at)).format(
                  'DD MMM YYYY HH:mm:ss'
                )}
              </Text>
            </View>
            <View style={[styles.boxItemContent, { marginBottom: 8 }]}>
              <Text style={[Fonts.fontC2Medium, { color: Color.fontBlack80 }]}>
                Total Jumlah Retur
              </Text>
              <Text
                style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}
              >
                {item.parcelQty}
              </Text>
            </View>
            <View style={[styles.boxItemContent, { marginBottom: 8 }]}>
              <Text style={[Fonts.fontC2Medium, { color: Color.fontBlack80 }]}>
                Total Dana Retur
              </Text>
              <Text
                style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}
              >
                {MoneyFormat(item.amount)}
              </Text>
            </View>
            <View style={[styles.boxItemContent, { marginBottom: 8 }]}>
              <Text style={[Fonts.fontC2Medium, { color: Color.fontBlack80 }]}>
                Barang sudah dibawa
              </Text>
              <Text
                style={[Fonts.fontC1SemiBold, { color: Color.fontBlack80 }]}
              >
                {item.returned ? 'Ya' : 'Tidak'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  renderSeparator() {
    return <View style={{ marginBottom: 12 }} />;
  }

  renderData() {
    return this.state.mockReturnsParcels.length > 0 ? (
      <View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={this.renderSeparator}
          data={this.state.mockReturnsParcels}
          renderItem={this.renderItem.bind(this)}
          numColumns={1}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    ) : (
      <View />
    );
  }
  renderContent() {
    return (
      <View>
        {this.state.loading ? this.renderSkeleton() : this.renderData()}
      </View>
    );
  }

  renderSkeleton() {
    return <SkeletonType5 />;
  }

  render() {
    return <View style={styles.mainContainer}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  flatListContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,

    backgroundColor: Color.backgroundWhite
  },
  cardContainer: {
    backgroundColor: Color.backgroundWhite,
    borderRadius: 8
  },
  boxContent: {
    flex: 1,
    padding: 16,
    borderRadius: 16
  },
  boxItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
)(ReturnOrderDataListView);
