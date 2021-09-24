import {
  React,
  Component,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  moment
} from '../../../library/thirdPartyPackage';
import {
  SkeletonType5,
  EmptyData,
  ProductListType1
} from '../../../library/component';
import { Color } from '../../../config';
import { GlobalStyle, Fonts, MoneyFormat } from '../../../helpers';
import * as ActionCreators from '../../../state/actions';

class ReturnOrderListView extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.state = {};
  }

  componentDidMount() {
    this.props.historyGetReset();
    this.getHistory(true, 0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dateFilter !== this.props.dateFilter) {
      this.props.historyGetReset();
      this.getHistory(true, 0);
    }

    if (prevProps.search !== this.props.search) {
      this.props.historyGetReset();
      this.getHistory(true, 0);
    }
  }

  getHistory(loading, page) {
    this.props.historyGetProcess({
      loading,
      page,
      storeId: parseInt(this.props.storeId, 10),
      userId: '',
      statusOrder: 'done',
      statusPayment: '',
      dateGte: this.props.dateFilter.dateGte,
      dateLte: this.props.dateFilter.dateLte,
      search: this.props.search
    });
  }
  /** REFRESH LIST VIEW */
  onHandleRefresh = () => {
    this.props.historyGetRefresh();
    this.getHistory(true, 0);
  };
  /** LOAD MORE LIST VIEW */
  onHandleLoadMore = () => {
    if (this.props.history.dataGetHistory) {
      if (
        this.props.history.dataGetHistory.length <
        this.props.history.totalDataGetHistory
      ) {
        const page = this.props.history.pageGetHistory + 10;
        this.props.historyGetLoadMore(page);
        this.getHistory(false, page);
      }
    }
  };

  parentFunction(data) {
    console.log('Return Order List View', data);
  }

  /** EMPTY DATA */
  renderEmpty() {
    return <EmptyData title={'Tidak ada pesanan'} description={''} />;
  }
  /** RENDER DATA */
  renderData() {
    return this.props.history.dataGetHistory.length > 0 ? (
      <View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={this.renderSeparator}
          data={this.props.history.dataGetHistory}
          renderItem={this.renderItem}
          numColumns={1}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.props.history.refreshGetHistory}
          onRefresh={this.onHandleRefresh}
          onEndReachedThreshold={0.2}
          onEndReached={this.onHandleLoadMore}
        />
      </View>
    ) : (
      this.renderEmpty()
    );
  }

  renderItem({ item, index }) {
    return (
      <View key={index}>
        <TouchableOpacity
          style={[styles.cardContainer, GlobalStyle.shadowForBox]}
          onPress={() => console.log('Create Return Draft')}
        >
          <View style={styles.boxContent}>
            <View style={styles.boxItemContent}>
              <Text style={Fonts.type83}>{item.orderCode}</Text>
              <Text style={[Fonts.type83, { color: Color.fontGreen50 }]}>
                Selesai
              </Text>
            </View>
            <View style={{ marginVertical: 16 }}>
              {this.renderProductSection(item.orderBrands)}
            </View>
            <View style={[styles.boxItemContent, { marginBottom: 8 }]}>
              <Text style={[Fonts.type56, { color: Color.fontBlack80 }]}>
                Dipesan pada
              </Text>
              <Text style={[Fonts.type56, { color: Color.fontBlack80 }]}>
                {moment(new Date(item.createdAt)).format(
                  'DD MMM YYYY HH:mm:ss'
                )}
              </Text>
            </View>
            <View style={styles.boxItemContent}>
              <Text style={[Fonts.type56, { color: Color.fontBlack80 }]}>
                Total pembelian
              </Text>
              <Text style={[Fonts.type56, { color: Color.fontBlack80 }]}>
                {MoneyFormat(item.deliveredParcelFinalPriceBuyer)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  /** ITEM PRODUCT SECTION */
  renderProductSection(data) {
    return <ProductListType1 data={data} borderRadius={10} />;
  }

  renderSeparator() {
    return <View style={{ marginBottom: 16 }} />;
  }

  renderSkeleton() {
    return <SkeletonType5 />;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.history.loadingGetHistory
          ? this.renderSkeleton()
          : this.renderData()}
      </View>
    );
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

const mapStateToProps = ({ oms, user, merchant, history }) => {
  return { oms, user, merchant, history };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReturnOrderListView);
