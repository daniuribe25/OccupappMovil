import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const inicialState = {};
const middelware = [thunk];

const store = createStore(
  rootReducer,
  inicialState,
  applyMiddleware(...middelware),
);

export default store;
