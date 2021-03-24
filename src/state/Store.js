import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import sagas from '../state/sagas';
import * as rootReducers from '../state/reducers';

const config = {
  key: 'root',
  storage,
  whitelist: ['permanent', 'user'],
  blacklist: ['auth', 'global', 'merchant', 'journey', 'pdp', 'oms', 'history'],
  debug: true
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (__DEV__) {
  middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const persistConfig = { enhancers };
const Store = createStore(reducers, undefined, compose(...enhancers));
const Persistor = persistStore(Store, persistConfig, () => {});

sagaMiddleware.run(sagas);

export { Store, Persistor };
