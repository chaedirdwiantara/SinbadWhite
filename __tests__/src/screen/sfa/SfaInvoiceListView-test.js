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
import SfaBillingLogView from '../../../../src/screens/sfa/SfaBillingLogView';
import { journeyPlanGetSuccessV2 } from '../../../../src/state/actions';
import mockStoreDummy from './dummy/mockStoreDummy';
import { exportAllDeclaration } from '@babel/types';
jest.useFakeTimers();

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('SfaInvoiceListView', function() {
  const mockState = mockStoreDummy;

  const factoryMockStore = attr =>
    mockStore({
      ...mockState,
      ...attr
    });

  // render right data
  it('show invoice list with right data', () => {
    const store = factoryMockStore({});
    const component = TestRenderer.create(
      <Provider store={store}>
        <SfaBillingLogView />
      </Provider>
    );

    const result = component.root.findAllByType(SfaBillingLogView);
    expect(result).toBeDefined();
  });
});
