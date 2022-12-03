import {AppStateType} from './store';

export const getCards = (state: AppStateType) => {
  return state.cards.cards;
};

export const getIsFetching = (state: AppStateType) => {
  return state.cards.isFetching;
};

export const getCurrentPage = (state: AppStateType) => {
  return state.cards.currentPage;
};

export const getCardsPerPage = (state: AppStateType) => {
  return state.cards.cardsPerPage;
};
