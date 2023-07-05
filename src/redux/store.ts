import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import amazonReducer from './reducers/amazonReducer';

const rootReducer = combineReducers({
  amazon: amazonReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
