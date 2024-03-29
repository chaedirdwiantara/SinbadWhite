import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from '../../library/reactPackage';

import { LoadingPage } from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import {
  sfaGetReferenceListProcess,
  sfaGetPaymentMethodProcess
} from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';

const SfaCollectionMethodListView = props => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { dataSfaGetPaymentMethod, selectedStore } = useSelector(
    state => state.sfa
  );
  const { selectedMerchant } = useSelector(state => state.merchant);
  const { userSuppliers } = useSelector(state => state.user);

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

  const onSelectCollectionMethod = item => {
    let data = {
      supplierId: parseInt(userSuppliers[0].supplierId, 10),
      storeId: parseInt(selectedStore?.id || selectedMerchant?.storeId, 10),
      userId: parseInt(userSuppliers[0].userId, 10),
      limit: 20,
      loading: true,
      paymentCollectionTypeId: parseInt(item.id, 10)
    };
    dispatch(sfaGetReferenceListProcess(data));
    NavigationService.navigate('SfaCollectionListView', {
      collectionMethodId: item.id
    });
  };
  /** GET REFERENCE */
  const getReference = () => {
    const data = {
      supplierId: parseInt(userSuppliers[0].supplier.id, 10),
      storeId: selectedStore?.id || selectedMerchant?.storeId
    };
    dispatch(sfaGetPaymentMethodProcess(data));
  };
  /** === ON REFRESH === */
  const onRefresh = () => {
    getReference();
    /** SET PAGE REFRESH */
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 10);
  };
  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */
  const renderCollectionMethod = () => {
    return dataSfaGetPaymentMethod.data.map((item, index) => {
      return (
        <View key={index}>
          <TouchableOpacity
            disabled={item.status === 'disabled' ? true : false}
            onPress={() => onSelectCollectionMethod(item)}
            style={{
              backgroundColor:
                item.status === 'disabled' ? masterColor.fontBlack10 : null,
              opacity: item.status === 'disabled' ? 0.5 : null
            }}
          >
            <View
              style={{
                margin: 16,
                opacity: item.status === 'disabled' ? 0.5 : null
              }}
            >
              <Text style={Fonts.type24}>{item.name}</Text>
              {item.balance > 0 ? (
                <Text style={[Fonts.type22, { marginTop: 5 }]}>
                  Saldo: {MoneyFormat(item.balance)}
                </Text>
              ) : null}
            </View>
            <View style={GlobalStyle.lines} />
          </TouchableOpacity>
        </View>
      );
    });
  };

  /**
   * ==================================
   * RENDER CONTENT DATA (MAIN VIEW)
   * ==================================
   */
  const renderContent = () => {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      >
        <View style={styles.contentContainer}>
          {/* {renderHeader()} */}
          {renderCollectionMethod()}
        </View>
      </ScrollView>
    );
  };

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.contentContainer}>
        {dataSfaGetPaymentMethod !== null ? renderContent() : <LoadingPage />}
      </View>
    </View>
  );
};
export default SfaCollectionMethodListView;
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  mainContainer: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0
  },
  headerContainer: {
    backgroundColor: masterColor.backgroundWhite,
    height: 56,
    justifyContent: 'center'
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row'
  },
  headerBody: {
    marginHorizontal: 8,
    marginVertical: 16
  },
  shadowLine: {
    shadowColor: masterColor.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2
  }
});
