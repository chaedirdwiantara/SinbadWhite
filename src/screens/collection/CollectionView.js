import {
  React,
  Component,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../library/thirdPartyPackage';
import {
  ButtonSingle,
  ModalBottomType3,
  ModalBottomType4,
  SearchBarType8
} from '../../library/component';
import { GlobalStyle, Fonts } from '../../helpers';
import { Color } from '../../config';
import * as ActionCreators from '../../state/actions';

import CollectionListDataView from './CollectionListDataView';
import NavigationService from '../../navigation/NavigationService';
const dummyData = [
  {
    storeId: 12345,
    storeName: 'Toko Sinar Mas Jaya',
    storeAddress: 'Jl Padurenan',
    totalInvoices: 8,
    outstandingAmount: 5000000,
    storeStatus: 'partial_collected',
    collectionIds: [1, 2, 3, 4]
  },
  {
    storeId: 12345,
    storeName: 'Toko Payment 123',
    storeAddress: 'Jl Padurenan',
    totalInvoices: 8,
    outstandingAmount: 5000000,
    storeStatus: 'assigned',
    collectionIds: [5, 6, 7, 8]
  }
];
const dataDummy = {
  meta: {
    skip: 0,
    limit: 20,
    total: 2
  },
  data: {
    stores: [
      {
        id: 1081595,
        name: 'Toko Baru',
        address: 'Alamat',
        externalId: 'SXXXXXX',
        collectionTransactionDetailIds: [1050, 1051, 1052],
        totalOutstandingAmount: 1000000,
        collectionStatus: 'ASSIGNED',
        isInPjp: true
      }
    ],
    totalStore: 5,
    totalStoreAlreadyVisit: 3,
    totalOutstandingAmount: 213774
  }
};
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
          screen: 'MerchantNoCollectionView'
        }
      ],
      storeName: '',
      emptyDataType: 'default'
    };
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
        }

        break;

      default:
        break;
    }
  }
  /** === RENDER DATA LIST VIEW === */
  renderDataList() {
    return (
      <CollectionListDataView
        data={dataDummy.data.stores || []}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        emptyData={this.state.emptyDataType}
      />
    );
  }
  /** === RENDER SEARCH BAR === */
  renderSearchBar() {
    return (
      <SearchBarType8
        placeholder="Cari nama/ID Toko disini"
        fetchFn={searchKeyword => console.log(searchKeyword)}
      />
    );
  }
  /** === RENDER MODAL COLLECTION MENU */
  renderModalCollectionMenu() {
    return this.state.openModalCollectionMenu ? (
      <ModalBottomType3
        title={this.state.storeName}
        open={this.state.openModalCollectionMenu}
        close={() => this.setState({ openModalCollectionMenu: false })}
        content={this.renderCollectionMenu()}
        typeClose={'cancel'}
      />
    ) : (
      <View />
    );
  }
  /** === RENDER COLLECTION MENU === */
  renderCollectionMenu() {
    return (
      <>
        <View style={{ marginBottom: 8 }}>
          {this.state.collectionMenu.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[GlobalStyle.shadowForBox, styles.menuJPContainer]}
                onPress={() => {
                  this.setState({ openModalCollectionMenu: false });
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
        close={this.props.close}
        typeClose={'cancel'}
        onPress={() => console.log('lala')}
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
        {this.renderSearchBar()}
        {this.renderDataList()}
        {this.renderModalCollectionMenu()}
        {this.renderModalExistInPjp()}
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
  }
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
)(CollectionView);
