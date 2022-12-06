import {AppStateType} from './store';

export const getCards = (state: AppStateType) => {
  return state.cards.cardsOnCategory;
};

export const getIsFetching = (state: AppStateType) => {
  return state.cards.isFetching;
};
