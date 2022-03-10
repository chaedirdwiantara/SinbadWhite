import { React, View, Text } from '../../../library/reactPackage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  sfaGetCollectionListProcess,
  SfaGetLoadMore
} from '../../../state/actions';
import MerchantCollectionReasonList from './MerchantCollectionReasonList';
import { LoadingPage } from '../../../components/Loading';
import { ACTIVITY_JOURNEY_PLAN_COLLECTION_NOT_SUCCESS } from '../../../constants';
const MerchantNoCollectionDetailView = props => {
  const dispatch = useDispatch();
  const { id, userSuppliers } = useSelector(state => state.user);
  const { selectedMerchant } = useSelector(state => state.merchant);
  const [limit, setLimit] = useState(20);
  const { dataGetCollectionList, loadingGetCollectionList } = useSelector(
    state => state.sfa
  );
  /** RENDER USE EFFECT */
  /** get initial data */
  useEffect(() => {
    getCollectionList(true, 20);
  }, []);
  /** RENDER FUNCTION */
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
    const data = {
      storeId: parseInt(selectedMerchant.storeId, 10),
      userId: parseInt(id, 10),
      supplierId: parseInt(userSuppliers[0].supplier.id, 10),
      loading: loading,
      limit: page,
      skip: 0,
      collectionTransactionDetailStatus: 'pending',
      collectionTransactionDetailIds: selectedMerchant.collectionIds
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
