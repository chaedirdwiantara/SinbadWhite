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
  EmptyDataType2
} from '../../../library/component';
import { Color } from '../../../config';
import masterColor from '../../../config/masterColor.json';
import { GlobalStyle, Fonts, MoneyFormat } from '../../../helpers';
import * as ActionCreators from '../../../state/actions';
import NavigationService from '../../../navigation/NavigationService';
import CollapsibleProductList from './CollapsibleProductList';

class ReturnOrderListView extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderEmpty() {
    return this.props.emptyData === 'default' ? (
      <EmptyData title={'Tidak ada pesanan'} description={''} />
    ) : (
      <EmptyDataType2
        title={'Pencarian Tidak Ditemukan'}
        description={'Cek kembali nama atau ID produk yang kamu masukkan'}
      />
    );
  }

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
          onRefresh={this.props.onRefresh}
          onEndReachedThreshold={0.2}
          onEndReached={this.props.onLoadMore}
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
          onPress={() => {
            NavigationService.navigate('ReturnRequestView', {
              orderCode: item.orderCode,
              orderParcelId: item.id
            });
          }}
        >
          <View style={styles.boxContent}>
            <View style={styles.boxItemContent}>
              <Text style={Fonts.type83}>{item.orderCode}</Text>
              <View style={styles.statusTag}>
                <Text style={{ ...Fonts.type110p }}>
                  {item.status === 'done' ? 'Selesai' : 'Terkirim'}
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: 16 }}>
              {this.renderProductSection(item.orderBrands)}
            </View>
            <View style={[styles.boxItemContent, { marginBottom: 8 }]}>
              <Text style={[Fonts.type56, { color: Color.fontBlack80 }]}>
                Dipesan Pada
              </Text>
              <Text style={[Fonts.type56, { color: Color.fontBlack80 }]}>
                {moment(new Date(item.createdAt)).format(
                  'DD MMMM YYYY HH:mm:ss'
                )}
              </Text>
            </View>
            <View style={styles.boxItemContent}>
              <Text style={Fonts.type111p}>Total Pembelian</Text>
              <Text style={Fonts.type111p}>
                {MoneyFormat(item?.deliveredParcelFinalPriceBuyer || 0)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderProductSection(data) {
    return data.length > 0 ? (
      <CollapsibleProductList brands={data} />
    ) : (
      <View />
    );
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
  },
  statusTag: {
    backgroundColor: masterColor.fontGreen10,
    marginLeft: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: 'row'
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
