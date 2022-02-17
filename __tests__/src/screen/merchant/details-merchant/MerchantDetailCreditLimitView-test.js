import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react-native';
import MerchantDetailCreditLimitView from '../../../../../src/screens/merchants/details-merchant/MerchantDetailCreditLimitView';
const middlewares = [];
const mockStore = configureStore(middlewares);
describe('DETAIL CREDIT LIMIT', function() {
  const mockCreditLimitState = {
    merchant: {
      dataGetMerchantDetailV2: {
        supplier: {
          id: 1
        },
        store: { id: 202 }
      },
      refreshGetCreditLimitList: false,
      loadingMerchantCreditLimitSummary: false,
      dataGetCreditLimitSummary: {
        balanceAmount: 2658369,
        creditLimit: 19850000,
        storeId: 232463,
        supplierId: 1
      },
      dataGetCreditLimitList: [
        {
          allowCreditLimit: false,
          balanceAmount: 0,
          creditLimit: 0,
          freezeStatus: true,
          id: 404402,
          invoiceGroupId: 989999997,
          invoiceGroupName: 'ATAPI Get All List  Invoice Group name',
          storeId: 232463,
          termOfPayment: 0
        },
        {
          allowCreditLimit: true,
          balanceAmount: 100000,
          creditLimit: 100000,
          freezeStatus: true,
          id: 404403,
          invoiceGroupId: 4,
          invoiceGroupName: 'COMBINE',
          storeId: 232463,
          termOfPayment: 5
        }
      ],
      loadingGetCreditLimitList: null,
      errorGetCreditLimitList: null,
      errorGetCreditLimitSummary: null
    }
  };

  const factoryMockStore = attr =>
    mockStore({
      ...mockCreditLimitState,
      ...attr
    });
  test('if component length of the list same with data', () => {
    const store = factoryMockStore({});
    const { getAllByTestId } = render(
      <Provider store={store}>
        <MerchantDetailCreditLimitView data={mockCreditLimitState.merchant} />
      </Provider>
    );
    //find the component list
    const invoiceList = getAllByTestId('view-invoice-list');

    //expect component list to be same as mock data
    expect(invoiceList.length).toBe(2);
  });
  test('if invoice detail info show on press button see more', () => {
    const store = factoryMockStore({});
    const { getAllByTestId } = render(
      <Provider store={store}>
        <MerchantDetailCreditLimitView data={mockCreditLimitState.merchant} />
      </Provider>
    );
    //find component button see more
    const btnSeeMore = getAllByTestId('btn-see-more');
    // Expect invoice info expanded on press button;
    fireEvent.press(btnSeeMore[1]);
    const invoiceFullInfo = getAllByTestId('view-full-invoice');
    expect(invoiceFullInfo).toBeDefined();
  });
});
