import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import amazonReducer from './reducers/amazonReducer';
// Importa otros reducers si los tienes

const rootReducer = combineReducers({
  amazon: amazonReducer,
  // Agrega otros reducers aquí si los tienes
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
