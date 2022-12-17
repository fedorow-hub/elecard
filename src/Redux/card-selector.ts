import {AppStateType} from './store';

export const getCards = (state: AppStateType) => {
  return state.cards.cards;
};

export const getIsFetching = (state: AppStateType) => {
  return state.cards.isFetching;
};

export const getToggle = (state: AppStateType) => {
  return state.cards.toggle;
};
