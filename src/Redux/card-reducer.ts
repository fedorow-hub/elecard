import {CardType} from "../Types/types";
import {Dispatch} from "react";
import {AppStateType} from "./store";
import { ThunkAction } from "redux-thunk";
import {ActionWithLocalStorage, CardAPI} from "../API/cardsAPI";

const SET_CARDS = 'elecard/cards/SET-CARDS';
const TOGGLE_IS_FETCHING = 'elecard/cards/TOGGLE-IS-FETCHING';
const SORT_BY_DATE = 'elecard/cards/SORT-BY-DATE';
const SORT_BY_SIZE = 'elecard/cards/SORT_BY_SIZE';
const SORT_BY_NAME = 'elecard/cards/SORT-BY-NAME';
const SORT_BY_CATEGORY = 'elecard/cards/SORT-BY-CATEGORY';
const TOGGLE = 'elecard/cards/TOGGLE';
const DELETE_CARD = 'elecard/cards/DELETE-CARD';


const initialState = {
  cards: [] as Array<CardType>,
  deletedCards: [] as Array<CardType>,
  isFetching: false,
  toggle: false
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
    case SORT_BY_DATE:
      return  {
        ...state, cards: state.cards.sort((a, b)=>(a.timestamp-b.timestamp))
      };
    case SORT_BY_SIZE:
      return  {
        ...state, cards: state.cards.sort((a, b)=>(a.filesize-b.filesize))
      };
    case SORT_BY_NAME:
      return  {
        ...state, cards: state.cards.sort((a, b) => {
          // @ts-ignore
          if (a.image.split('/').pop() > b.image.split('/').pop()) {
            return 1;
          }
          // @ts-ignore
          if (a.image.split('/').pop() < b.image.split('/').pop()) {
            return -1;
          }
          return 0;
        })
      };
    case SORT_BY_CATEGORY:
      return  {
        ...state, cards: state.cards.sort((a, b) => {
          if (a.category > b.category) {
            return 1;
          }
          if (a.category < b.category) {
            return -1;
          }
          return 0;
        })
      };
    case TOGGLE:
      return  {
        ...state, toggle: !state.toggle
      };
    case DELETE_CARD:
      return  {
        ...state, cards: state.cards.filter(card => card.timestamp != action.timestamp)
      };
    default:
      return state;
  }
}

type ActonTypes = ToggleIsFetchingActionType
    | SetCardsActionType
    | SortByDateActionType
    | SortBySizeActionType
    | SortByNameActionType
    | SortByCategoryActionType
    | ToggleActionType
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

type SortByDateActionType = {
  type: typeof SORT_BY_DATE
}

export const sortByDate = (): SortByDateActionType => ({ type: SORT_BY_DATE});

type SortBySizeActionType = {
  type: typeof SORT_BY_SIZE
}

export const sortBySize = (): SortBySizeActionType => ({ type: SORT_BY_SIZE});

type SortByNameActionType = {
  type: typeof SORT_BY_NAME
}

export const sortByName = (): SortByNameActionType => ({ type: SORT_BY_NAME});

type SortByCategoryActionType = {
  type: typeof SORT_BY_CATEGORY
}

export const sortByCategory = (): SortByCategoryActionType => ({ type: SORT_BY_CATEGORY});

type ToggleActionType = {
  type: typeof TOGGLE
}

export const toggle = (): ToggleActionType => ({ type: TOGGLE});

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


