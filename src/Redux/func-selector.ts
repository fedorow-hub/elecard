import {AppStateType} from './store';

export const getCurrentPage = (state: AppStateType) => {
  return state.func.currentPage;
};

export const getCardsPerPage = (state: AppStateType) => {
  return state.func.cardsPerPage;
};

export const getIsCardsView = (state: AppStateType) => {
  return state.func.isCardsView;
};


