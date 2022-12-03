import {CardType} from "../Types/types";
import {Dispatch} from "react";
import {AppStateType} from "./store";
import { ThunkAction } from "redux-thunk";
import {CardAPI} from "../API/cardsAPI";

const SET_CARDS = 'elecard/cards/SET-CARDS';
const TOGGLE_IS_FETCHING = 'elecard/cards/TOGGLE-IS-FETCHING';
const SET_CURRENT_PAGE = 'elecard/cards/SET-CURRENT-PAGE';

const initialState = {
  cards: [] as Array<CardType>,
  isFetching: false,
  currentPage: 1 as number,
  cardsPerPage: 12 as number
};

export type InitialStateType = typeof initialState

const cardReducer = (state= initialState, action: ActonTypes):InitialStateType => {
  switch (action.type) {
    case SET_CARDS:
      return  {
        ...state, cards: action.cards
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state, isFetching: action.isFetching
      };
    case SET_CURRENT_PAGE:
      return {
        ...state, currentPage: action.page
      };
    default:
      return state;
  }
}

type ActonTypes = SetCardsActionType | ToggleIsFetchingActionType | SetCurrentPageActionType;

type SetCardsActionType = {
  type: typeof SET_CARDS
  cards: Array<CardType>
}

export const setCards = (cards: any): SetCardsActionType => ({ type: SET_CARDS, cards });

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  page: number
}

export const setCurrentPage = (page: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, page });

type DispatchType = Dispatch<ActonTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActonTypes>

export const setAllCards = (): ThunkType => async (dispatch: DispatchType) => {
  dispatch(toggleIsFetching(true));
  const data = await CardAPI.getCards();
  dispatch(toggleIsFetching(false));
  dispatch(setCards(data));
};

export default cardReducer;
