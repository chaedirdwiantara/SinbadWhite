import {
  React,
  Component,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity
} from '../../library/reactPackage';
import { MoneyFormat, GlobalStyle, Fonts } from '../../helpers';
import { Color } from '../../config';
import { bindActionCreators, connect } from '../../library/thirdPartyPackage';
import * as ActionCreators from '../../state/actions';
import { EmptyData, EmptyDataType2 } from '../../library/component';
class CollectionListDataView extends Component {
  /** CHECK COLLECTION ACTIVITY */
  checkCollectionActivity(status) {
    // check already check out or not
    if (status === 'partial_collected') {
      return require('../../assets/icons/journey/visit_green.png');
    } else {
      return require('../../assets/icons/journey/visit_gray.png');
    }
  }
  /** === RENDER SEPARATOR === */
  renderSeparator() {
    return <View style={[GlobalStyle.lines, { marginVertical: 12 }]} />;
  }
  /** === DATA ITEM === */
  renderItem({ item, index }) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View>
          <Text style={[Fonts.type9, { marginBottom: 10 }]}>
            {item.id || 0}
          </Text>
          <Text style={[Fonts.type7, { marginBottom: 4 }]}>
            {item.name || ''}
          </Text>
          <Text style={Fonts.type17}>{item.address || ''}</Text>
          <View style={styles.itemContainer}>
            <Text style={Fonts.type17}>
              {item.collectionTransactionDetailIds.length || 0} Invoice
            </Text>
            <Text style={Fonts.type17}> | </Text>
            <Text style={Fonts.type17}>
              Total Tagihan {MoneyFormat(item.totalOutstandingAmount || 0)}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={this.checkCollectionActivity(item.collectionStatus)}
            style={styles.iconCollectionDoor}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() =>
              this.props.parentFunction({
                type: 'modal_collection',
                storeName: item.name || '',
                isInPjp: item.isInPjp || false
              })
            }
          >
            <Text style={Fonts.type83}>Tagih</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  /** === DATA VIEW === */
  renderData() {
    return this.props.data.length > 0 ? (
      <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
        <FlatList
          initialScrollIndex={0}
          showsHorizontalScrollIndicator={false}
          data={this.props.data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    ) : (
      <View>{this.renderEmpty()}</View>
    );
  }
  /** === RENDER EMPTY DATA === */
  renderEmpty() {
    return (
      <View style={{ marginTop: '60%' }}>
        {this.props.emptyData === 'default' ? (
          <EmptyData
            top
            title={'Store Kosong'}
            description={
              'Untuk hari ini tidak ada jadwal toko yang harus dikunjungi ya '
            }
          />
        ) : (
          <EmptyDataType2
            wideTitle
            title={'Maaf pencarian anda tidak ditemukan'}
            description={'Silahkan masukan kata pencarian yang lain ya '}
          />
        )}
      </View>
    );
  }
  /** === MAIN RENDER === */
  render() {
    return <View>{this.renderData()}</View>;
  }
}

const styles = StyleSheet.create({
  iconCollectionDoor: {
    width: 15,
    height: 15,
    marginBottom: 16
  },
  iconContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Color.fontBlack60
  },
  itemContainer: { flexDirection: 'row', marginTop: 5 }
});
const mapStateToProps = ({ user, auth, salesmanKpi, permanent }) => {
  return { user, auth, salesmanKpi, permanent };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionListDataView);
