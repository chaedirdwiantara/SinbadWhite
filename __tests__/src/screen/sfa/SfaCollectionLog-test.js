import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TestRenderer from 'react-test-renderer';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView
} from 'react-native';
import SfaCollectionLog from '../../../../src/screens/sfa/SfaCollectionLog';
import MoneyFormat from '../../../../src/helpers/NumberFormater';
jest.useFakeTimers();

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('SFA COLLECTION', function() {
  const navigationMock = { state: { params: { section: 'payment' } } };

  const mockSfaState = {
    sfa: {
      loadingSfaGetCollectionLog: false,
      dataSfaGetCollectionLog: {
        data: [
          {
            amount: 1000,
            createdAt: '2021-06-10 05:59:57',
            id: 155,
            paymentCollectionMethodId: 119,
            paymentCollectionMethodName: 'Cek',
            salesName: 'FAKE Febrianka',
            status: 'pending'
          },
          {
            amount: 401000,
            createdAt: '2021-06-10 04:13:32',
            id: 153,
            paymentCollectionMethodId: 115,
            paymentCollectionMethodName: 'Cek',
            salesName: 'FAKE Febrianka',
            status: 'pending'
          }
        ],
        meta: {
          limit: 20,
          orderParcelId: 1079858,
          skip: 0,
          storeId: 224590,
          total: 19
        }
      },
      errorSfaGetCollectionLog: null
    },
    merchant: {
      address: 'jalan bendungan hilir IX',
      externalId: 'LIN001',
      id: 159228,
      journeyBookStores: {
        createdAt: '2021-06-11T08:54:47.351331+07:00',
        deletedAt: null,
        externalStoreId: 'LIN001',
        id: 351,
        inStore: false,
        journeyBookId: 126,
        latitudeCheckIn: 0,
        latitudeCheckOut: 0,
        longitudeCheckIn: 0,
        longitudeCheckOut: 0,
        noOrderReason: '',
        noOrderReasonId: 0,
        noOrderReasonNote: '',
        orderStatus: false,
        permanentJourneyPlanId: 0,
        portfolioId: 22,
        route: 0,
        storeId: 224590,
        storeName: 'TOKOKU',
        typeOfStore: 'exist_store',
        updatedAt: '2021-06-11T10:00:12.864236+07:00',
        visitStatus: false
      },
      latitude: -6.255109786987305,
      longitude: 106.80799865722656,
      name: 'TOKOKU',
      ownerMobilePhoneNo: '081718843601',
      storeCode: 'SNB-STORE-224590-R1',
      storeId: '224590',
      storeName: 'TOKOKU',
      supplierId: 1,
      urbans: {
        city: 'JAKARTA PUSAT',
        createdAt: '2019-12-10T13:41:13.417445+07:00',
        deletedAt: null,
        district: 'TANAH ABANG',
        id: 25656,
        province: {
          id: 31,
          createdAt: '2019-12-10T13:40:28.651924+07:00',
          updatedAt: '2019-12-10T13:40:28.651924+07:00',
          deletedAt: null,
          name: 'DAERAH KHUSUS IBUKOTA JAKARTA'
        },
        provinceId: 31,
        updatedAt: '2019-12-10T13:41:13.417445+07:00',
        urban: 'BENDUNGAN HILIR',
        zipCode: '10210'
      }
    }
  };

  const factoryMockStore = attr =>
    mockStore({
      ...mockSfaState,
      ...attr
    });

  // show approval status in collection log
  it('SHOW COLLECTION LOG', () => {
    const store = factoryMockStore({});
    const component = TestRenderer.create(
      <Provider store={store}>
        <SfaCollectionLog MoneyFormat />
      </Provider>
    );
    const result = component.root.findAllByType(SfaCollectionLog);

    expect(result).toBeDefined();
  });

  // show approval status in collection log
  it('SHOW APPROVAL STATUS IN COLLECTION LOG', () => {
    const store = factoryMockStore({});
    const component = TestRenderer.create(
      <Provider store={store}>
        <SfaCollectionLog MoneyFormat />
      </Provider>
    );
    const result = component.root.findAllByType(FlatList);
    expect(result).toBeDefined();
  });
});
