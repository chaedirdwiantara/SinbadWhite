import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react-native';
import ModalBottomPaymentType from '../../../../src/screens/oms/ModalBottomPaymentType';
const middlewares = [];
const mockStore = configureStore(middlewares);
describe('DETAIL CREDIT LIMIT', function() {
  const mockCreditLimitState = {
    oms: {
      dataOmsGetPayment: [
        {
          paymentTypeId: 2,
          overLimitStatus: true,
          availableStatus: true,
          warningMessage: 'warning message',
          paymentType: {
            iconUrl: ''
          }
        }
      ]
    }
  };

  const factoryMockStore = attr =>
    mockStore({
      ...mockCreditLimitState,
      ...attr
    });
  test('if payment type is payLater and over limit status is over, warning message should be appear', () => {
    const store = factoryMockStore({});
    const { getByTestId } = render(
      <Provider store={store}>
        <ModalBottomPaymentType data={mockCreditLimitState.oms} />
      </Provider>
    );
    // expect warning sign to be defined
    const warningComponent = getByTestId('view-warning-credit');
    expect(warningComponent).toBeDefined();
  });
  test('if warning text match with props', () => {
    const store = factoryMockStore({});
    const { getByTestId } = render(
      <Provider store={store}>
        <ModalBottomPaymentType data={mockCreditLimitState.oms} />
      </Provider>
    );
    // expect text warning same as from BE
    const textWarning = getByTestId('text-warning-credit');
    expect(textWarning.props.children).toMatch(
      mockCreditLimitState.oms.dataOmsGetPayment[0].warningMessage
    );
  });
});
