import * as types from '../types';
/**
 * ==============================
 * SEARCH TEXT GLOBAL
 * ==============================
 */
/** === DELETE ALL DATA ==== */
export function saveSearch(text) {
  return { type: types.SEARCH_TEXT, payload: text };
}
