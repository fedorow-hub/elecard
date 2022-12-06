import {CardType} from "../Types/types";
import {Dispatch} from "react";
import {AppStateType} from "./store";
import { ThunkAction } from "redux-thunk";
import {ActionWithLocalStorage, CardAPI} from "../API/cardsAPI";

const SET_CARDS = 'elecard/cards/SET-CARDS';
const TOGGLE_IS_FETCHING = 'elecard/cards/TOGGLE-IS-FETCHING';
const SET_CATEGORY = 'elecard/cards/SET-CATEGORY';
const SORT_BY_DATE = 'elecard/cards/SORT-BY-DATE';
const SORT_BY_SIZE = 'elecard/cards/SORT_BY_SIZE';
const DELETE_CARD = 'elecard/cards/DELETE-CARD';

const initialState = {
  cards: [] as Array<CardType>,
  isFetching: false,
  cardsOnCategory: [] as Array<CardType>
};

export type InitialStateType = typeof initialState

const cardReducer = (state= initialState, action: ActonTypes):InitialStateType => {
  switch (action.type) {
    case SET_CARDS:
      return  {
        ...state, cards: action.cards,
        cardsOnCategory: action.cards
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state, isFetching: action.isFetching
      };
    case SET_CATEGORY:
      if(action.category === "all") {
        return  {
          ...state, cardsOnCategory: state.cards
        };
      }
      return  {
        ...state, cardsOnCategory: state.cards.filter(card => card.category == action.category)
      };
    case SORT_BY_DATE:
      return  {
        ...state, cardsOnCategory: state.cardsOnCategory.sort((a, b)=>(a.timestamp-b.timestamp))
      };
    case SORT_BY_SIZE:
      return  {
        ...state, cardsOnCategory: state.cardsOnCategory.sort((a, b)=>(a.filesize-b.filesize))
      };
    case DELETE_CARD:
      return  {
        ...state, cardsOnCategory: state.cardsOnCategory.filter(card => card.timestamp != action.timestamp),
        cards: state.cards.filter(card => card.timestamp != action.timestamp)
      };
    default:
      return state;
  }
}

type ActonTypes = ToggleIsFetchingActionType
    | SetCardsActionType
    | SetCategoryActionType
    | SortByDateActionType
    | SortBySizeActionType
    | DeleteCardActionType;

type SetCardsActionType = {
  type: typeof SET_CARDS
  cards: Array<CardType>
}

const setCards = (cards: Array<CardType>): SetCardsActionType => ({ type: SET_CARDS, cards });

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });

type SetCategoryActionType = {
  type: typeof SET_CATEGORY
  category: string
}

export const setCategory = (category: string): SetCategoryActionType => ({ type: SET_CATEGORY, category});

type SortByDateActionType = {
  type: typeof SORT_BY_DATE
}

export const sortByDate = (): SortByDateActionType => ({ type: SORT_BY_DATE});

type SortBySizeActionType = {
  type: typeof SORT_BY_SIZE
}

export const sortBySize = (): SortBySizeActionType => ({ type: SORT_BY_SIZE});

type DeleteCardActionType = {
  type: typeof DELETE_CARD
  timestamp: number
}

const deleteCard = (timestamp: number): DeleteCardActionType => ({ type: DELETE_CARD, timestamp});

type DispatchType = Dispatch<ActonTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActonTypes>

export const setAllCards = (): ThunkType => async (dispatch: DispatchType) => {
  dispatch(toggleIsFetching(true));
  const data = await CardAPI.getCards();
  dispatch(toggleIsFetching(false));
  // @ts-ignore
  dispatch(setCards(data));
};

type ThunkTypeWithoutPromise = ThunkAction<void, AppStateType, unknown, ActonTypes>
export const deleteCardWithLocalStorage = (timestamp: number): ThunkTypeWithoutPromise=> (dispatch: DispatchType) => {
  dispatch(deleteCard(timestamp));
  ActionWithLocalStorage.write(timestamp);
};

export const recoveryCard = (): ThunkType=> async (dispatch: DispatchType) => {
  ActionWithLocalStorage.clearing();
  dispatch(toggleIsFetching(true));
  const data = await CardAPI.getCards();
  dispatch(toggleIsFetching(false));
  // @ts-ignore
  dispatch(setCards(data));
};

export default cardReducer;


