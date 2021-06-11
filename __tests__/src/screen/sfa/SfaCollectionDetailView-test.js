import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TestRenderer from 'react-test-renderer';
import { View, TouchableOpacity, Text, FlatList, SafeAreaView } from 'react-native';
import SfaCollectionDetailView from '../../../../src/screens/sfa/SfaCollectionDetailView';
import MoneyFormat from '../../../../src/helpers/NumberFormater'
jest.useFakeTimers();

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('SFA COLLECTION', function() {
    const navigationMock = { state: { params: { section: "payment" } } };

    const mockSfaState = {
        sfa: {
          loadingSfaGetCollectionLog: false,
          dataSfaGetCollectionLog: {
            data : [
              {
                amount: 1000,
                createdAt: "2021-06-10 05:59:57",
                id: 155,
                paymentCollectionMethodId: 119,
                paymentCollectionMethodName: "Cek",
                salesName: "FAKE Febrianka",
                status: "pending"
              },
              {
                amount: 401000,
                createdAt: "2021-06-10 04:13:32",
                id: 153,
                paymentCollectionMethodId: 115,
                paymentCollectionMethodName: "Cek",
                salesName: "FAKE Febrianka",
                status: "pending"
              }
            ],
            meta : {
              "limit": 20,
              "orderParcelId": 1079858,
              "skip": 0,
              "storeId": 224590,
              "total": 19
            }
          },
          errorSfaGetCollectionLog: null,
          dataSfaGetDetail : {
              data: {
                collections: [
                    {
                        name: "Tunai",
                        value: 5000
                    },
                    {
                        name: "Cek",
                        value: 612000
                    },
                    {
                        name: "Giro",
                        value: 55000
                    },
                    {
                        name: "Transfer",
                        value: 65000
                    },
                    {
                        name: "Promo",
                        value: 53000
                    }
                ],
                id: 1079858,
                invoiceGroupName: "COMBINE",
                isPaid: false,
                orderCode: "S0100042235001077030",
                orderRef: null,
                parcelGrossPrice: 3083200,
                parcelPromo: 1000,
                parcelQty: 200,
                parcelTaxes: 308220,
                promoList: [
                    {
                        catalogueName: null,
                        catalogueimagesurl: null,
                        promoId: "600",
                        promoName: "teestflexi11",
                        promoQty: null,
                        promoValue: 1000
                    },
                ],
                remainingBilling: 2578420,
                totalBilling: 3390420,
                totalCollection: 823000,
                totalInStorePayment: 0
              }
          },
          dataSfaGetCollectionDetail : {
            isEditable: true,
            outstanding: 2578420,
            paymentCollection: {
                id: 175,
                isPrimary: true,
                paidAmount: 40000,
                paymentCollectionMethod: {
                    amount: 300000,
                    approvalStatus: "pending",
                    balance: 260000,
                    bankFrom: {id: 1, name: "BCA", displayName: "Bank BCA"},
                    bankToAccount: null,
                    date: "2021-06-11 00:00:00",
                    dueDate: "2021-06-22 00:00:00",
                    id: 125,
                    image: null,
                    paymentCollectionType: {id: 2, name: "Cek", code: "check"},
                    principal: null,
                    promoNo: null,
                    reference: "testjumat",
                    stamp: null
                }

            }
          },
        },
        merchant: {
          address: "jalan bendungan hilir IX",
          externalId: "LIN001",
          id: 159228,
          journeyBookStores: {
            createdAt: "2021-06-11T08:54:47.351331+07:00",
            deletedAt: null,
            externalStoreId: "LIN001",
            id: 351,
            inStore: false,
            journeyBookId: 126,
            latitudeCheckIn: 0,
            latitudeCheckOut: 0,
            longitudeCheckIn: 0,
            longitudeCheckOut: 0,
            noOrderReason: "",
            noOrderReasonId: 0,
            noOrderReasonNote: "",
            orderStatus: false,
            permanentJourneyPlanId: 0,
            portfolioId: 22,
            route: 0,
            storeId: 224590,
            storeName: "TOKOKU",
            typeOfStore: "exist_store",
            updatedAt: "2021-06-11T10:00:12.864236+07:00",
            visitStatus: false
          },
          latitude: -6.255109786987305,
          longitude: 106.80799865722656,
          name: "TOKOKU",
          ownerMobilePhoneNo: "081718843601",
          storeCode: "SNB-STORE-224590-R1",
          storeId: "224590",
          storeName: "TOKOKU",
          supplierId: 1,
          urbans: {
            city: "JAKARTA PUSAT",
            createdAt: "2019-12-10T13:41:13.417445+07:00",
            deletedAt: null,
            district: "TANAH ABANG",
            id: 25656,
            province: {
              id: 31, 
              createdAt: "2019-12-10T13:40:28.651924+07:00", 
              updatedAt: "2019-12-10T13:40:28.651924+07:00", 
              deletedAt: null, 
              name: "DAERAH KHUSUS IBUKOTA JAKARTA"
            },
            provinceId: 31,
            updatedAt: "2019-12-10T13:41:13.417445+07:00",
            urban: "BENDUNGAN HILIR",
            zipCode: "10210"
          }
        }
    };

    const factoryMockStore = attr =>
        mockStore({
            ...mockSfaState,
            ...attr
    });

  // show data detail collection
  it('SHOW COLLECTION LOG', () => {
    const store = factoryMockStore({});
    const component = TestRenderer.create(
      <Provider store={store}>
        <SfaCollectionDetailView />
      </Provider>
    );
    const result = component.root.findAllByType(Text)[1].props.children;
    console.log('res:', result);

    expect(
      result
    ).toBeDefined();
  });
});