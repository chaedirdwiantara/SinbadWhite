
import 'react-native';
import React from 'react';

import * as HistoryType from '../../../../src/state/types/HistoryType';

describe('type', () => {
  /** DETAIL HISTORY */
  describe('GET DETAIL HISTORY', () => {
    it('should return historyGetDetailProcess', () => {
      expect(HistoryType.HISTORY_GET_DETAIL_PROCESS).toBe(
        'historyGetDetailProcess'
      );
    });
    it('should return historyGetDetailSuccess', () => {
      expect(HistoryType.HISTORY_GET_DETAIL_SUCCESS).toBe(
        'historyGetDetailSuccess'
      );
    });
    it('should return historyGetDetailFailed', () => {
      expect(HistoryType.HISTORY_GET_DETAIL_FAILED).toBe(
        'historyGetDetailFailed'
      );
    });
  });
  
});