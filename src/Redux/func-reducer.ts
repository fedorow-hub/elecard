const SET_CURRENT_PAGE = 'elecard/cards/SET-CURRENT-PAGE';
const SET_IS_CARDS_VIEW = 'elecard/cards/SET_IS_CARDS_VIEW';

const initialState = {
    currentPage: 1 as number,
    cardsPerPage: 12 as number,
    isCardsView: true
};

export type InitialStateType = typeof initialState

const funcReducer = (state= initialState, action: ActonTypes):InitialStateType => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.page
            };
        case SET_IS_CARDS_VIEW:
            return {
                ...state, isCardsView: action.isCardsView
            };
        default:
            return state;
    }
}

type ActonTypes =
    | SetCurrentPageActionType
    | SetIsCardsViewActionType;

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    page: number
}

export const setCurrentPage = (page: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, page });

type SetIsCardsViewActionType = {
    type: typeof SET_IS_CARDS_VIEW
    isCardsView: boolean
}

export const setIsCardsView = (isCardsView: boolean): SetIsCardsViewActionType => ({ type: SET_IS_CARDS_VIEW, isCardsView });

export default funcReducer;
