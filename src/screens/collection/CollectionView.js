import {
  React,
  Component,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageBackground
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../library/thirdPartyPackage';
import {
  ModalBottomType3,
  ModalBottomType4,
  SearchBarType8,
  LoadingPage
} from '../../library/component';
import { GlobalStyle, Fonts, MoneyFormat } from '../../helpers';
import { Color } from '../../config';
import * as ActionCreators from '../../state/actions';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CollectionListDataView from './CollectionListDataView';
import NavigationService from '../../navigation/NavigationService';
class CollectionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCollectionMenu: false,
      openModalExistInPjp: false,
      collectionMenu: [
        { title: 'Lakukan Penagihan', screen: 'SfaView' },
        {
          title: 'Tidak Melakukan Penagihan',
          screen: 'MerchantNoCollectionReason'
        }
      ],
      storeName: '',
      emptyDataType: 'default',
      searchKeyword: ''
    };
  }

  componentDidMount() {
    this.props.sfaGetStoreCollectionListReset();
    this.getStoreCollectionList(true, '');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchKeyword !== this.state.searchKeyword) {
      this.getStoreCollectionList(true, this.state.searchKeyword);
    }
  }
  /** === PARENT FUNCTION === */
  parentFunction(item) {
    switch (item.type) {
      case 'modal_collection':
        if (item.isInPjp) {
          this.setState({
            openModalExistInPjp: true
          });
        } else {
          this.setState({
            storeName: item.storeName,
            openModalCollectionMenu: true
          });
          this.props.sfaModalCollectionListMenu(true);
        }

        break;

      default:
        break;
    }
  }
  /** === GET STORE COLLECTION LIST === */
  getStoreCollectionList(loading, searchKey) {
    const data = {
      salesId: parseInt(this.props?.user?.id || 0, 10),
      supplierId: parseInt(
        this.props?.user?.userSuppliers[0]?.supplier?.id || 0,
        10
      ),
      skip: 1,
      limit: 10,
      loading,
      searchKey
    };
    this.props.sfaGetStoreCollectionListReset();
    this.props.sfaGetStoreCollectionListProcess(data);
  }
  //** FUNCTION ON CHANGE SEARCH KEY */
  onChangeSearchKey = searchKey => {
    this.setState({ searchKeyword: searchKey || '' });
  };
  /** === HEADER === */
  renderHeader() {
    return this.props.sfa.dataGetStoreCollection ? (
      <View>
        <ImageBackground
          source={require('../../assets/images/background/bg_jp_white.png')}
          style={[styles.headerContainer, { zIndex: 0 }]}
        >
          <View style={[styles.boxHeader, { zIndex: 1 }]}>
            <Text style={[Fonts.textHeaderPageJourney, { marginBottom: 5 }]}>
              {this.props.sfa?.dataGetStoreCollection?.totalStoreAlreadyVisit ||
                0}
              /{this.props.sfa?.dataGetStoreCollection?.totalStore || 0}
            </Text>
            <Text style={styles.headerTextSubTitle}>Kunjungan Toko</Text>
          </View>
          <View style={styles.boxHeader}>
            <Text style={[Fonts.textHeaderPageJourney, { marginBottom: 5 }]}>
              {MoneyFormat(
                this.props.sfa.dataGetStoreCollection?.totalOutstandingAmount ||
                  0
              )}
            </Text>
            <Text style={styles.headerTextSubTitle}>Total Tagihan</Text>
          </View>
        </ImageBackground>
        {/* </View> */}
      </View>
    ) : (
      <SkeletonPlaceholder>
        <View style={{ height: 70 }} />
      </SkeletonPlaceholder>
    );
  }

  /** === RENDER DATA LIST VIEW === */
  renderDataList = () => {
    return (
      <CollectionListDataView
        data={this.props.sfa.dataGetStoreCollectionList || []}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        emptyData={this.state.emptyDataType}
      />
    );
  };
  /** === RENDER SEARCH BAR === */
  renderSearchBar() {
    return (
      <SearchBarType8
        placeholder="Cari nama / ID Toko disini"
        fetchFn={searchKeyword => this.onChangeSearchKey(searchKeyword)}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={() => console.log('search enter')}
      />
    );
  }
  /** === RENDER MODAL COLLECTION MENU */
  renderModalCollectionMenu() {
    const storeName = this.props.sfa.selectedStore?.name || '';
    return this.props.sfa.modalCollectionListMenu ? (
      <ModalBottomType3
        title={storeName}
        open={this.props.sfa.modalCollectionListMenu}
        close={() => {
          this.setState({ openModalCollectionMenu: false }),
            this.props.sfaModalCollectionListMenu(false),
            this.props.selectedStoreReset();
        }}
        content={this.renderCollectionMenu()}
        typeClose={'cancel'}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER COLLECTION MENU === */
  renderCollectionMenu() {
    const collectionIds =
      this.props.sfa?.selectedStore?.collectionTransactionDetailIds || [];
    return (
      <>
        <View style={{ marginBottom: 8 }}>
          {this.state.collectionMenu.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[GlobalStyle.shadowForBox, styles.menuJPContainer]}
                onPress={() => {
                  this.props.sfaModalCollectionListMenu(false);
                  NavigationService.navigate(item.screen, {
                    type: 'COLLECTION_LIST',
                    collectionIds
                  });
                }}
              >
                <Text style={[Fonts.type7]}>{item.title}</Text>
                <MaterialIcon
                  name="keyboard-arrow-right"
                  color={Color.fontBlack50}
                  size={24}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  }
  /** === RENDER MODAL STORE EXIST IN PJP */
  renderModalExistInPjp() {
    return this.state.openModalExistInPjp ? (
      <ModalBottomType4
        open={this.state.openModalExistInPjp}
        close={() => this.setState({ openModalExistInPjp: false })}
        typeClose={'cancel'}
        onPress={() => {
          NavigationService.navigate('JourneyView'),
            this.setState({ openModalExistInPjp: false });
        }}
        buttonTitle={'Masuk ke Journey Plan'}
        content={this.renderExistInPjp()}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER EXIST IN PJP === */
  renderExistInPjp() {
    return (
      <>
        <View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../assets/icons/collection/pjp_task.png')}
              style={{ height: 79.5, width: 83.3 }}
            />
            <Text style={[Fonts.type7, { marginVertical: 16 }]}>
              Toko Anda berada di Journey Plan
            </Text>
            <Text style={[Fonts.type9, { marginBottom: 10 }]}>
              Silahkan masuk ke journey plan
            </Text>
          </View>
        </View>
      </>
    );
  }
  /** === MAIN RENDER === */
  render() {
    return (
      <>
        {this.renderHeader()}
        {this.renderSearchBar()}
        {!this.props.sfa.loadingGetStoreCollectionList ? (
          <>
            {this.renderDataList()}
            {this.renderModalCollectionMenu()}
            {this.renderModalExistInPjp()}
          </>
        ) : (
          <LoadingPage />
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  menuJPContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerContainer: {
    backgroundColor: Color.backgroundWhite,
    flexDirection: 'row',
    paddingVertical: 13
  },
  headerTextSubTitle: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 10,
    lineHeight: 12,
    color: Color.fontBlack80
  },
  boxHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
const mapStateToProps = ({ user, auth, sfa }) => {
  return { user, auth, sfa };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionView);
