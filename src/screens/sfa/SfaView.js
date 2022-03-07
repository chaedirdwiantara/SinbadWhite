import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity
} from '../../library/reactPackage';
import { MaterialIcon } from '../../library/thirdPartyPackage';
import {
  StatusBarWhite,
  SearchBarType1,
  TagListType2,
  SkeletonType2,
  SkeletonType28,
  SkeletonType27
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import SfaInvoiceListView from './SfaInvoiceListView';
import {
  sfaGetCollectionListProcess,
  sfaGetCollectionStatusProcess,
  sfaGetCollectionListStatusProcess,
  SfaGetLoadMore,
  sfaGetRefresh,
  sfaGetReferenceListProcess,
  sfaModalCollectionListMenu
} from '../../state/actions/SfaAction';
import SfaTabView, { TAB_INVOICE, TAB_COLLECTION } from './SfaTabView';
import SfaCollectionListView from './SfaCollectionListView';
import { ACTIVITY_JOURNEY_PLAN_COLLECTION_ONGOING } from '../../constants';
import {
  merchantPostActivityProcessV2,
  merchantGetLogAllActivityProcessV2
} from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
let navigationProps = '';
/** === HEADER === */
export const HeaderLeftSfaViewtOption = () => {
  const type = navigationProps?.navigation?.state?.params?.type || '';
  console.log(type, 'type');
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.headerLeftOption}>
        <TouchableOpacity
          style={[styles.boxButton]}
          onPress={() => {
            if (type === 'COLLECTION_LIST') {
              dispatch(sfaModalCollectionListMenu(true));
              NavigationService.goBack();
            } else {
              NavigationService.goBack();
            }
          }}
        >
          <MaterialIcon
            name="arrow-back"
            color={masterColor.fontBlack80}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
const SfaView = props => {
  navigationProps = props;
  const { params } = props.navigation.state;
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const {
    loadingGetCollectionStatus, // invoice
    dataGetCollectionStatus, // invoice
    loadingGetCollectionList, // invoice
    dataGetCollectionList, // invoice
    loadingGetCollectionListStatus, // collection
    dataGetCollectionListStatus, // collection
    loadingGetReferenceList, // collection
    dataGetReferenceList, // collection
    selectedStore
  } = useSelector(state => state.sfa);
  const { selectedMerchant, dataGetLogAllActivityV2 } = useSelector(
    state => state.merchant
  );
  const { userSuppliers, id } = useSelector(state => state.user);
  const [selectedTagStatus, setSelectedTagStatus] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [limit, setLimit] = useState(20);
  const [activeTab, setActiveTab] = useState(TAB_INVOICE);
  const [searchTextCollection, setSearchTextCollection] = useState('');
  const [approvalStatusCollection, setApprovalStatusCollection] = useState('');

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

  useEffect(() => {
    getInvoiceList(true, 20);
  }, [paymentStatus, searchText]);

  useEffect(() => {
    getInvoiceStatus();
  }, []);

  useEffect(() => {
    if (!(params?.type || '') === 'COLLECTION_LIST') {
      if (
        !(dataGetLogAllActivityV2 || []).find(
          item => item.activityName === 'collection_ongoing'
        )
      ) {
        postCollectionOngoing();
      }
    }
  }, []);

  /** TO GET INVOICE STATUS */
  const getInvoiceStatus = () => {
    dispatch(sfaGetCollectionStatusProcess());
  };
  /** POST ACTIVITY COLLECTION ONGOING */
  const postCollectionOngoing = () => {
    const journeyBookStoreId = selectedMerchant.journeyBookStores.id;
    const data = {
      journeyBookStoreId,
      activityName: ACTIVITY_JOURNEY_PLAN_COLLECTION_ONGOING
    };
    dispatch(merchantPostActivityProcessV2(data));
    dispatch(merchantGetLogAllActivityProcessV2(journeyBookStoreId));
  };
  /** TO GET INVOICE LIST */
  const getInvoiceList = (loading, page) => {
    const collectionTransactionDetailIds =
      (params?.type || '') === 'COLLECTION_LIST'
        ? selectedStore.collectionTransactionDetailIds || []
        : selectedMerchant.collectionIds || [];
    const storeId =
      (params?.type || '') === 'COLLECTION_LIST'
        ? parseInt(selectedStore.id, 10) || 0
        : parseInt(selectedMerchant.storeId, 10) || 0;
    const data = {
      storeId: storeId,
      userId: parseInt(id, 10),
      supplierId: parseInt(userSuppliers[0].supplier.id, 10),
      keyword: searchText,
      statusPayment: paymentStatus,
      loading: loading,
      limit: page,
      skip: 0,
      collectionTransactionDetailStatus: '',
      collectionTransactionDetailIds
    };
    dispatch(sfaGetCollectionListProcess(data));
  };
  /** TO GET COLLECTION STATUS */
  const getCollectionListStatus = () => {
    dispatch(sfaGetCollectionListStatusProcess());
  };

  /** FUNCTION GET COLLECTION LIST */
  const getCollectionList = (loading, page) => {
    const storeId =
      (params?.type || '') === 'COLLECTION_LIST'
        ? parseInt(selectedStore.id, 10) || 0
        : parseInt(selectedMerchant.storeId, 10) || 0;
    let data = {
      supplierId: parseInt(userSuppliers[0].supplierId, 10),
      storeId,
      userId: parseInt(userSuppliers[0].userId, 10),
      approvalStatus: approvalStatusCollection,
      keyword: searchTextCollection,
      limit: page,
      loading: loading
    };

    dispatch(sfaGetReferenceListProcess(data));
  };

  useEffect(() => {
    getCollectionList(true, 20);
  }, [approvalStatusCollection, searchTextCollection]);

  /** PARENT FUNCTION */
  let parentFunction = data => {
    switch (data.type) {
      case 'status':
        setSelectedTagStatus(data.data);

        if (activeTab === TAB_COLLECTION) {
          setApprovalStatusCollection(
            dataGetCollectionListStatus.data[data.data].status
          );
        } else {
          // dataGetCollectionStatus is TRANSACTION / INVOICE
          const isAllSelected =
            dataGetCollectionStatus.data[data.data].status === '';
          setPaymentStatus(
            !isAllSelected
              ? dataGetCollectionStatus.data[data.data].status
              : null
          );
        }

        break;
      case 'search':
        if (activeTab === TAB_COLLECTION) {
          setSearchTextCollection(data.data);
        } else {
          setSearchText(data.data);
        }
        break;
      case 'section':
        setSelectedTagStatus(0);
        setActiveTab(data.data);

        if (data.data === TAB_COLLECTION) {
          setSearchTextCollection('');
          setApprovalStatusCollection('');
          getCollectionListStatus();
        } else {
          setSearchText('');
          setPaymentStatus(null);
          getInvoiceStatus();
          // getInvoiceList(true, 20);
        }
        break;
    }
  };

  const onHandleLoadMore = () => {
    if (dataGetCollectionList) {
      if (
        dataGetCollectionList.data.orderParcels.length <
        dataGetCollectionList.data.totalInvoice
      ) {
        const page = limit + 10;

        setLimit(page);
        dispatch(SfaGetLoadMore(page));
        getInvoiceList(false, page);
      }
    }
  };

  const onHandleRefresh = () => {
    dispatch(sfaGetRefresh());
    getInvoiceList(true, 20);
  };

  /** === HEADER TABS === */
  const renderHeaderTabs = () => {
    return (
      <View style={styles.containerTabs}>
        <SfaTabView
          activeTab={activeTab}
          parentFunction={parentFunction.bind(this)}
        />
      </View>
    );
  };

  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */

  /** === RENDER INVOICE LIST === */
  const renderInvoiceList = () => {
    return (
      <>
        <SfaInvoiceListView
          dataList={dataGetCollectionList}
          status={dataGetCollectionStatus}
          searchText={searchText}
          loadmore={onHandleLoadMore}
          refersh={onHandleRefresh}
        />
      </>
    );
  };

  /** === RENDER COLLECTION LIST === */
  const renderCollectionList = () => {
    return (
      <>
        <SfaCollectionListView
          isNavigateFromTab={true}
          keyword={searchTextCollection}
          approvalStatus={approvalStatusCollection}
          type={params?.type || ''}
        />
      </>
    );
  };

  /** === RENDER SKELETON TAGS === */
  const renderSkeletonTags = () => {
    return (
      <View>
        <SkeletonType2 />
        <View style={GlobalStyle.lines} />
      </View>
    );
  };

  /** === RENDER SKELETON LIST === */
  const renderSkeletonList = () => {
    return (
      <View style={{ marginTop: 16 }}>
        <SkeletonType28 />
      </View>
    );
  };

  /** === TAGS SECTION === */
  const renderTagsContent = () => {
    let data = null;
    let isLoading = null;

    if (activeTab === TAB_COLLECTION) {
      data = dataGetCollectionListStatus;
      isLoading = loadingGetCollectionListStatus;
    } else {
      data = dataGetCollectionStatus;
      isLoading = loadingGetCollectionStatus;
    }

    return (
      <>
        {!isLoading && data ? (
          <>
            <TagListType2
              selected={selectedTagStatus}
              onRef={ref => (parentFunction = ref)}
              parentFunction={parentFunction.bind(this)}
              data={data.data}
            />
            <View style={GlobalStyle.lines} />
          </>
        ) : (
          renderSkeletonTags()
        )}
      </>
    );
  };

  /** === RENDER FOOTER INVOICE === */
  const renderFooterInvoice = () => {
    return (
      <>
        <View style={GlobalStyle.lines} />
        <View style={styles.footer}>
          {!loadingGetCollectionList && dataGetCollectionList ? (
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: 24 }}>
                <Text style={[Fonts.type47, styles.textRight]}>
                  Total Faktur
                </Text>
                <Text style={[Fonts.type47, styles.textRight]}>
                  Total Sisa Tagihan
                </Text>
                {/* <Text style={[Fonts.type47, styles.textRight]}>Total Terbayar</Text> */}
                <Text style={[Fonts.type47, styles.textRight]}>
                  Total Sisa Tagihan Overdue
                </Text>
              </View>
              <View>
                <Text style={[Fonts.type28, styles.textRight]}>
                  {dataGetCollectionList.data.totalInvoice}
                </Text>
                <Text style={[Fonts.type28, styles.textRight]}>
                  {MoneyFormatSpace(
                    dataGetCollectionList.data.totalInvoiceAmount
                  )}
                </Text>
                {/* <Text style={[Fonts.type28, styles.textRight]}>
                  {MoneyFormatSpace(dataGetCollectionList.data.totalAmountPaid)}
                </Text> */}
                <Text style={[Fonts.type28, styles.textRight]}>
                  {MoneyFormatSpace(
                    dataGetCollectionList.data.totalOutstandingAmount
                  )}
                </Text>
              </View>
            </View>
          ) : (
            <SkeletonType27 />
          )}
        </View>
      </>
    );
  };

  /** === RENDER FOOTER COLLECTION === */
  const renderFooterCollection = () => {
    return (
      <>
        <View style={GlobalStyle.lines} />
        <View style={styles.footer}>
          {!loadingGetReferenceList && dataGetReferenceList?.meta ? (
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: 24 }}>
                <Text style={[Fonts.type47, styles.textRight]}>
                  Total Penagihan
                </Text>
                <Text style={[Fonts.type47, styles.textRight]}>
                  Total Sisa Penagihan
                </Text>
              </View>
              <View>
                <Text style={[Fonts.type28, styles.textRight]}>
                  {dataGetReferenceList.meta.total}
                </Text>
                <Text style={[Fonts.type28, styles.textRight]}>
                  {MoneyFormatSpace(
                    dataGetReferenceList?.meta?.totalCollectionRemainingAmount
                  )}
                </Text>
              </View>
            </View>
          ) : (
            <SkeletonType27 />
          )}
        </View>
      </>
    );
  };

  /** === RENDER FILTER AND SEARCH === */
  const renderSearchAndFilter = () => {
    const title =
      activeTab === TAB_COLLECTION
        ? 'Cari penagihan disini'
        : 'Cari tagihan disini';
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <SearchBarType1
              placeholder={title}
              searchText={searchText}
              onRef={ref => (parentFunction = ref)}
              parentFunction={parentFunction.bind(this)}
            />
          </View>
        </View>
        <View style={GlobalStyle.lines} />
      </View>
    );
  };

  /** === RENDER CONTENT INVOICE === */
  const renderContentInvoice = () => {
    return (
      <>
        <View style={{ flex: 1 }}>
          {loadingGetCollectionList
            ? renderSkeletonList()
            : renderInvoiceList()}
        </View>
        <View>{renderFooterInvoice()}</View>
      </>
    );
  };

  /** === RENDER CONTENT COLLECTION === */
  const renderContentCollection = () => {
    return (
      <>
        <View style={{ flex: 1 }}>{renderCollectionList()}</View>
        <View>{renderFooterCollection()}</View>
      </>
    );
  };

  /**
   * ==========================
   * RENDER CONTENT (MAIN VIEW)
   * ==========================
   */
  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        {renderHeaderTabs()}
        {renderSearchAndFilter()}
        {renderTagsContent()}
        {activeTab === TAB_COLLECTION
          ? renderContentCollection()
          : renderContentInvoice()}
      </View>
    );
  };

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        <View style={{ flex: 1 }}>{renderContent()}</View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: masterColor.backgroundWhite
    // position:'absolute'
    // display: 'flex',
    // flexDirection: 'row'
  },
  footer1: {
    flex: 1
  },
  footerText: {
    display: 'flex',
    flexDirection: 'row'
  },
  textLeft: { textAlign: 'right', marginBottom: 4 },
  textRight: { marginBottom: 4 },
  headerLeftOption: {
    marginLeft: 16
  }
});

export default SfaView;
