import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import todoList from './todoList';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['todoList'],
};

const rootReducer = combineReducers({
  todoList,
});

export default persistReducer(rootPersistConfig, rootReducer);
