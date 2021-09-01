import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  MaterialIcon,
  connect
} from '../../../library/thirdPartyPackage';
import { SkeletonType1, EmptyData } from '../../../library/component';
import { Color } from '../../../config';
import { GlobalStyle, Fonts } from '../../../helpers';
import * as ActionCreators from '../../../state/actions';

class ModalBottomProductListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoading: false
    };
  }

  componentDidMount() {
    this.props.getMSSCataloguesReset();
    this.getMSSCatalogues();
  }

  onHandleRefresh = () => {
    this.props.getMSSCataloguesRefresh();
    this.getMSSCatalogues();
  };

  onHandleLoadMore = () => {
    if (this.props.pdp.dataGetMSSCatalogues) {
      if (
        this.props.pdp.dataGetMSSCatalogues.length <
        this.props.pdp.totalDataGetMSSCatalogues
      ) {
        const page = this.props.pdp.pageGetMSSCatalogues + 1;
        this.props.getMSSCataloguesLoadMore(page);
        this.props.getMSSCataloguesProcess({
          page,
          limit: 10,
          mss: this.props.mssType,
          keyword: this.props.search
        });
      }
    }
  };

  getMSSCatalogues() {
    this.props.getMSSCataloguesProcess({
      page: 0,
      limit: 10,
      mss: this.props.mssType,
      keyword: this.props.search
    });
  }

  renderSkeleton() {
    return <SkeletonType1 />;
  }

  renderData() {
    return this.props.pdp.dataGetMSSCatalogues.length > 0
      ? this.renderContent()
      : this.renderEmpty();
  }

  renderEmpty() {
    return (
      <EmptyData
        title={'List Produk Kosong'}
        description={'Maaf, Produk tidak tersedia di area anda'}
      />
    );
  }

  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <View style={GlobalStyle.lines} />
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.props.pdp.dataGetMSSCatalogues}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          refreshing={this.props.pdp.refreshGetMSSCatalogues}
          onRefresh={this.onHandleRefresh}
          onEndReachedThreshold={0.1}
          onEndReached={this.onHandleLoadMore.bind(this)}
        />
      </View>
    );
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity
        key={index}
        style={styles.boxItem}
        onPress={() =>
          this.props.parentFunction({
            type: 'stock',
            data: {
              id: item.id,
              mss: item.mss
            }
          })
        }
      >
        <View
          style={{
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            flex: 1
          }}
        >
          <View style={{ marginBottom: 8 }}>
            <Text style={[Fonts.type37]}>
              {item.skuCode} {item.mss ? this.renderMSSType() : <View />}
            </Text>
          </View>
          <View>
            <Text style={[Fonts.type57]}>{item.name}</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <MaterialIcon
            name="check-circle"
            size={24}
            color={
              this.props.selectedProduct.indexOf(item.id) > -1
                ? Color.mainColor
                : Color.fontBlack40
            }
          />
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator() {
    return <View style={[GlobalStyle.lines, { marginLeft: 9 }]} />;
  }

  renderMSSType() {
    return (
      <View
        style={{
          height: 8,
          width: 8,
          backgroundColor: Color.fontYellow40,
          borderRadius: 100
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.pdp.loadingGetMSSCatalogues
          ? this.renderSkeleton()
          : this.renderData()}
        {/* For Loadmore */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: Color.backgroundWhite
  },
  flatListContainer: {
    paddingBottom: 26
  },
  boxItem: {
    flexDirection: 'row',
    paddingVertical: 13,
    paddingHorizontal: 16
  },
  boxImage: {
    height: 65,
    width: 65,
    borderRadius: 10
  }
});

const mapStateToProps = ({ user, pdp }) => {
  return { user, pdp };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalBottomProductListView);
