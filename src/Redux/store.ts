import {applyMiddleware, combineReducers, legacy_createStore as createStore, compose} from 'redux';

import thunkMiddleware from 'redux-thunk';
import cardReducer from './card-reducer';
import funcReducer from "./func-reducer";

const rootReducer = combineReducers({
  cards: cardReducer,
  func: funcReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

//let state: AppStateType (демонстрация функциональности ReturnType<RootReducerType>)
//state.app

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.__store__ = store;
export default store;
