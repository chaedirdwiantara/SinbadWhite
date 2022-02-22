import {
  React,
  Component,
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../library/thirdPartyPackage';
import { ModalBottomType3, SearchBarType8 } from '../../library/component';
import { GlobalStyle, Fonts } from '../../helpers';
import { Color } from '../../config';
import * as ActionCreators from '../../state/actions';

import CollectionListDataView from './CollectionListDataView';
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
    storeName: 'Toko Sinar Mas Jaya',
    storeAddress: 'Jl Padurenan',
    totalInvoices: 8,
    outstandingAmount: 5000000,
    storeStatus: 'assigned',
    collectionIds: [5, 6, 7, 8]
  }
];
class CollectionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCollectionMenu: true,
      collectionMenu: [
        { title: 'Lakukan Penagihan' },
        { title: 'Tidak Melakukan Penagihan' }
      ]
    };
  }
  /** === RENDER DATA LIST VIEW === */
  renderDataList() {
    return <CollectionListDataView data={dummyData} />;
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
    console.log(this.state.openModalCollectionMenu);
    return this.state.openModalCollectionMenu ? (
      <ModalBottomType3
        title={'Journey Plan'}
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
  /** === MAIN RENDER === */
  render() {
    console.log(this.state.openModalCollectionMenu);
    return (
      <>
        {this.renderSearchBar()}
        {this.renderDataList()}
        {this.renderModalCollectionMenu()}
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
