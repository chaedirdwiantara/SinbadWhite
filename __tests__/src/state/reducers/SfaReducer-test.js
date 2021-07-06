import * as SfaReducer from '../../../../src/state/reducers/SfaReducer';
import * as types from '../../../../src/state/types';

describe('reducer', function() {
    /**
   * =============================
   * GET COLLECTION STATUS
   * =============================
   */
    describe('GET COLLECTION STATUS', function() {
        const mockState = {
            loadingGetCollectionStatus: false,
            dataGetCollectionStatus: null,
            errorGetCollectionStatus: null
        };
        const factory = expect => ({
            ...mockState,
            ...expect
        });

        it('should make process when getting remote data', function() {
            const expectation = factory({
                loadingGetCollectionStatus: true
            });
            const result = SfaReducer.sfa(mockState, {
                type: types.SFA_GET_COLLECTION_STATUS_PROCESS
            });
            expect(result).toStrictEqual(expectation);
        });

        it('should return result when getting remote data', function() {
            const payload = { data: {} };
            const expectation = factory({
                loadingGetCollectionStatus: false,
                dataGetCollectionStatus: payload
            });
            const result = SfaReducer.sfa(mockState, {
                type: types.SFA_GET_COLLECTION_STATUS_SUCCESS,
                payload: payload
            });
            expect(result).toStrictEqual(expectation);
        });

        it('should return error when getting remote data', function() {
            const payload = { data: {} };
            const expectation = factory({
                loadingGetCollectionStatus: false,
                errorGetCollectionStatus: payload
            });
            const result = SfaReducer.sfa(mockState, {
                type: types.SFA_GET_COLLECTION_STATUS_FAILED,
                payload
            });
            expect(result).toStrictEqual(expectation);
        });
    });

     /**
   * =============================
   * GET SFA DETAIL
   * =============================
   */
      describe('GET SFA DETAIL', function() {
        const mockState = {
            loadingGetSfaDetail: false,
            dataGetSfaDetail: null,
            errorGetSfaDetail: null
        };
        const factory = expect => ({
            ...mockState,
            ...expect
        });

        it('should make process when getting remote data', function() {
            const expectation = factory({
                loadingGetSfaDetail: true
            });
            const result = SfaReducer.sfa(mockState, {
                type: types.SFA_GET_DETAIL_PROCESS
            });
            expect(result).toStrictEqual(expectation);
        });

        it('should return result when getting remote data', function() {
            const payload = { data: {} };
            const expectation = factory({
                loadingGetSfaDetail: false,
                dataGetSfaDetail: payload
            });
            const result = SfaReducer.sfa(mockState, {
                type: types.SFA_GET_DETAIL_SUCCESS,
                payload: payload
            });
            expect(result).toStrictEqual(expectation);
        });

        it('should return error when getting remote data', function() {
            const payload = { data: {} };
            const expectation = factory({
                loadingGetSfaDetail: false,
                errorGetSfaDetail: null
            });
            const result = SfaReducer.sfa(mockState, {
                type: types.SFA_GET_DETAIL_FAILED,
                payload
            });
            expect(result).toStrictEqual(expectation);
        });
    });
    
});