import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TestRenderer from 'react-test-renderer';
import { View, TouchableOpacity, Text, FlatList, SafeAreaView } from 'react-native';
import HistoryDetailView from '../../../../src/screens/history/HistoryDetailView';
jest.useFakeTimers();

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('HISTORY DETAIL', function() {
    // const { navigation } = props;
    // const name = this.props.navigation.getParam('name', 'Peter');

    //   navigation.navigate("Modal", {
    //       section: () => {
    //           onIndexChange(0);
    //       }
    //   });
    const navigationMock = { state: { params: { section: "payment" } } };

    const mockSfaState = {
        history: {
            loadingDetailHistory: false,
            dataDetailHistory: null,
            errorHistoryDetail: null,
        },
    };

    const factoryMockStore = attr =>
        mockStore({
            ...mockSfaState,
            ...attr
    });

  // If click history list navigate to history detail view
  it('SHOW HISTORY DETAIL VIEW', () => {
    const store = factoryMockStore({});
    const component = TestRenderer.create(
      <Provider store={store}>
        <HistoryDetailView navigation={navigationMock} />
      </Provider>
    );
    const result = component.root.findAllByType(HistoryDetailView);
    // const flatlist = container.findAllByType(View)[0];
    // const flatlistContainer = flatlist.findAllByType(View)[0];
    // const result = flatlistContainer.findAllByType(View)[0]
    // const result1 = result.findAllByType(View)[1]
    // const result = container.findAllByType(Text)[1].props.children;
    // const tree = container.props
    // console.log("view0:", tree)
    expect(
      result
    ).toBeDefined();
  });

  // it('cant SHOW COLLECTION LOG', () => {
  //   const store = factoryMockStoreFailed({});
  //   const component = TestRenderer.create(
  //     <Provider store={store}>
  //       <SfaCollectionLog />
  //     </Provider>
  //   );
  //   const container = component.root.findAllByType(View)[3].props.children;
  //   // const result = container.findAllByType(Text)[0];
  //   // console.log("log:", container);
  //   // expect(
  //   //   result
  //   // ).toBeDefined();
  // });  
});