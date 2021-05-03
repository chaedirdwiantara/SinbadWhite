import * as HistoryReducer from '../../../../src/state/reducers/HistoryReducer';
import * as types from '../../../../src/state/types';

describe('reducer', function() {
    /**
   * =============================
   * GET DETAIL HISTORY
   * =============================
   */
    describe('GET DETAIL HISTORY', function() {
        const mockState = {
            loadingDetailHistory: false,
            dataDetailHistory: null,
            errorHistoryDetail: null
        };
        const factory = expect => ({
            ...mockState,
            ...expect
        });

        it('should make process when getting remote data', function() {
            const expectation = factory({
                loadingDetailHistory: true
            });
            const result = HistoryReducer.history(mockState, {
                type: types.HISTORY_GET_DETAIL_PROCESS
            });
            expect(result).toStrictEqual(expectation);
        });

        it('should return result when getting remote data', function() {
            const payload = { data: { data: {} } };
            const expectation = factory({
                loadingDetailHistory: false,
                dataDetailHistory: payload.data
            });
            const result = HistoryReducer.history(mockState, {
                type: types.HISTORY_GET_DETAIL_SUCCESS,
                payload: payload
            });
            expect(result).toStrictEqual(expectation);
        });

        it('should return error when getting remote data', function() {
            const payload = { data: {} };
            const expectation = factory({
                loadingDetailHistory: false,
                errorHistoryDetail: payload
            });
            const result = HistoryReducer.history(mockState, {
                type: types.HISTORY_GET_DETAIL_FAILED,
                payload
            });
            expect(result).toStrictEqual(expectation);
        });
    });
    
});