import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react-native';
import MerchantDetailCreditLimitView from '../../../../../src/screens/merchants/details-merchant/MerchantDetailCreditLimitView';
const middlewares = [];
const mockStore = configureStore(middlewares);
describe('DETAIL CREDIT LIMIT', function() {
  const mockCreditLimitState = {
    merchant: {
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
  test('render flatlist', () => {
    const store = factoryMockStore({});
    const { getByTestId } = render(
      <Provider store={store}>
        <MerchantDetailCreditLimitView data={mockCreditLimitState.merchant} />
      </Provider>
    );
  });
});
