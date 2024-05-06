import {CardType} from "../Types/types";
import {Dispatch} from "react";
import {AppStateType} from "./store";
import { ThunkAction } from "redux-thunk";
import {ActionWithLocalStorage, CardAPI} from "../API/cardsAPI";
import {SET_CARDS, TOGGLE_IS_FETCHING, SORT_BY_DATE, SORT_BY_SIZE, SORT_BY_NAME, SORT_BY_CATEGORY, TOGGLE, DELETE_CARD, RECOVERY_CARD} from "../constants";

const initialState = {
  cards: [] as Array<CardType>,
  deletedCards: [] as Array<CardType>,
  isFetching: false,
  toggle: false
};

export type InitialStateType = typeof initialState

const cardReducer = (state = initialState, action: ActonTypes):InitialStateType => {
  let stateForSorting: InitialStateType = JSON.parse(JSON.stringify(state))

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
        ...state, cards: stateForSorting.cards.sort((a, b)=>(a.timestamp-b.timestamp))
      };
    case SORT_BY_SIZE:
      return  {
        ...state, cards: stateForSorting.cards.sort((a, b)=>(a.filesize-b.filesize))
      };
    case SORT_BY_NAME:
      return  {
        ...state, cards: stateForSorting.cards.sort((a, b) => {
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
        ...state, cards: stateForSorting.cards.sort((a, b) => {
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
        ...state, cards: state.cards.filter(card => card.timestamp !== action.timestamp),
        deletedCards: state.deletedCards.concat(state.cards.filter(card => card.timestamp === action.timestamp))
      };
    case RECOVERY_CARD:
      return  {
        ...state, cards: state.cards.concat(state.deletedCards),
        deletedCards: new Array<CardType>()
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
  | DeleteCardActionType
  | RecoveryCardActionType;



export type SetCardsActionType = {
  type: typeof SET_CARDS,
  cards: Array<CardType>
}

const setCards = (cards: Array<CardType>): SetCardsActionType => ({ type: SET_CARDS, cards });

export type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING,
  isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });

export type SortByDateActionType = {
  type: typeof SORT_BY_DATE
}

export const sortByDate = (): SortByDateActionType => ({ type: SORT_BY_DATE});

export type SortBySizeActionType = {
  type: typeof SORT_BY_SIZE
}

export const sortBySize = (): SortBySizeActionType => ({ type: SORT_BY_SIZE});

export type SortByNameActionType = {
  type: typeof SORT_BY_NAME
}

export const sortByName = (): SortByNameActionType => ({ type: SORT_BY_NAME});

export type SortByCategoryActionType = {
  type: typeof SORT_BY_CATEGORY
}

export const sortByCategory = (): SortByCategoryActionType => ({ type: SORT_BY_CATEGORY});

export type ToggleActionType = {
  type: typeof TOGGLE
}

export const toggle = (): ToggleActionType => ({ type: TOGGLE});

export type DeleteCardActionType = {
  type: typeof DELETE_CARD,
  timestamp: number
}

const deleteCard = (timestamp: number): DeleteCardActionType => ({ type: DELETE_CARD, timestamp});

export type RecoveryCardActionType = {
  type: typeof RECOVERY_CARD
}

const recoveryCard = (): RecoveryCardActionType => ({ type: RECOVERY_CARD});

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

export const recoveryCardWithLocalStorage = ()=> async (dispatch: DispatchType) => {
  ActionWithLocalStorage.clearing();
  dispatch(recoveryCard());
};

export default cardReducer;


