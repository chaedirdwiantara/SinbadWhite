import { runSaga } from 'redux-saga';
import { HistoryMethod } from '../../../../src/services/methods/HistoryMethod';
import {
    historyGetDetailProcess,
    historyGetDetailSuccess,
    historyGetDetailFailed
} from '../../../../src/state/actions';
import getDetailHistory from '../../../../src/state/sagas/HistorySaga'

describe('saga', function() {

  /** DETAIL HISTORY */
  describe('collection status', function() {
    it('should save data in store when success ', async () => {
      const dispatchedActions = [];

      const mockResult = ['aa'];
      const fakeStore = {
        getState: () => ({}),
        dispatch: action => dispatchedActions.push(action)
      };
      fakeStore.dispatch('aa')

      HistoryMethod.getDetailHistory = jest.fn(() => Promise.resolve(mockResult));
      await runSaga(fakeStore, getDetailHistory, {
        payload: { data: {} }
      }).done;

      expect(historyGetDetailSuccess(dispatchedActions)).toEqual(
        historyGetDetailSuccess(mockResult)
      );
    });
  });

});