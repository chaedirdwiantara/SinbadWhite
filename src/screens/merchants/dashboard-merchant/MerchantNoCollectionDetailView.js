import {
  React,
  View,
  BackHandler,
  TouchableOpacity
} from '../../../library/reactPackage';
import { MaterialIcon } from '../../../library/thirdPartyPackage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import masterColor from '../../../config/masterColor.json';
import NavigationService from '../../../navigation/NavigationService';
import {
  sfaGetCollectionListProcess,
  SfaGetLoadMore,
  sfaModalCollectionListMenu
} from '../../../state/actions';
import MerchantCollectionReasonList from './MerchantCollectionReasonList';
import { LoadingPage } from '../../../components/Loading';
import { ACTIVITY_JOURNEY_PLAN_COLLECTION_NOT_SUCCESS } from '../../../constants';
let navigationProps = '';
/** === HEADER === */
export const HeaderLeftDetailReasonOption = () => {
  const type = navigationProps?.navigation?.state?.params?.type || '';
  const dispatch = useDispatch();
  return (
    <>
      <View style={{ marginLeft: 16 }}>
        <TouchableOpacity
          onPress={() => {
            if (type === 'COLLECTION_LIST') {
              NavigationService.goBack(null);
              dispatch(sfaModalCollectionListMenu(true));
            } else {
              NavigationService.goBack(null);
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

const MerchantNoCollectionDetailView = props => {
  navigationProps = props;
  const { params } = props.navigation.state;
  const dispatch = useDispatch();
  const { id, userSuppliers } = useSelector(state => state.user);
  const { selectedMerchant } = useSelector(state => state.merchant);
  const [limit, setLimit] = useState(20);
  const {
    dataGetCollectionList,
    loadingGetCollectionList,
    selectedStore
  } = useSelector(state => state.sfa);
  /** RENDER USE EFFECT */
  /** get initial data */
  useEffect(() => {
    getCollectionList(true, 20);
  }, []);

  /** === HANDLE BACK HARDWARE PRESS ===  */
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backHandlerHardware
    );
    return () => backHandler.remove();
  }, []);
  /** RENDER FUNCTION */
  const backHandlerHardware = () => {
    dispatch(sfaModalCollectionListMenu(true));
  };
  /** handle loadmore get collectin */
  const onHandleLoadMore = () => {
    if (dataGetCollectionList) {
      if (
        dataGetCollectionList.data.orderParcels.length <
        dataGetCollectionList.data.totalInvoice
      ) {
        const page = limit + 10;

        setLimit(page);
        dispatch(SfaGetLoadMore(page));
        getCollectionList(false, page);
      }
    }
  };
  /** get collection list */
  const getCollectionList = (loading, page) => {
    const storeId = parseInt(
      params?.type === 'COLLECTION_LIST'
        ? selectedStore.id
        : selectedMerchant.storeId,
      10
    );
    const collectionTransactionDetailIds =
      params?.type === 'COLLECTION_LIST'
        ? params?.collectionIds
        : selectedMerchant?.collectionIds;
    const data = {
      storeId,
      userId: parseInt(id, 10),
      supplierId: parseInt(userSuppliers[0].supplier.id, 10),
      loading: loading,
      limit: page,
      skip: 0,
      collectionTransactionDetailStatus: 'NOT_COLLECTED',
      collectionTransactionDetailIds
    };
    dispatch(sfaGetCollectionListProcess(data));
  };

  return dataGetCollectionList && !loadingGetCollectionList ? (
    <View>
      <MerchantCollectionReasonList
        dataList={dataGetCollectionList.data.orderParcels}
        type={ACTIVITY_JOURNEY_PLAN_COLLECTION_NOT_SUCCESS}
        loadmore={onHandleLoadMore}
        navigateFrom={'view-reason'}
      />
    </View>
  ) : (
    <LoadingPage />
  );
};

export default MerchantNoCollectionDetailView;
