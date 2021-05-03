import 'react-native';
import React from 'react';
import * as HistoryType from '../../../../src/state/types';
import * as HistoryAction from '../../../../src/state/actions';
import { iteratee } from 'lodash';

describe('action', () => {
    /** GET DETAIL HISTORY */
    describe('get detail history', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        });

        it('should create action to trigger process', function(){
            const result = HistoryAction.historyGetDetailProcess(data);
            expect(result).toStrictEqual(
                factory(HistoryType.HISTORY_GET_DETAIL_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = HistoryAction.historyGetDetailSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(HistoryType.HISTORY_GET_DETAIL_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = HistoryAction.historyGetDetailFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(HistoryType.HISTORY_GET_DETAIL_FAILED)
            );
        });
    })

})