import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import todoList from './todoList';
import vcr from './vcr';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['todoList'],
};

const vcrPersistConfig = {
  key: 'vcr',
  storage,
  whitelist: ['recording', 'recordedTime'],
};

const rootReducer = combineReducers({
  todoList,
  vcr: persistReducer(vcrPersistConfig, vcr),
});

export default persistReducer(rootPersistConfig, rootReducer);
