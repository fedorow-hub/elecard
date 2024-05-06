import funcReducer, { InitialStateType, SetCurrentPageActionType, SetIsCardsViewActionType } from '../../../src/Redux/func-reducer'
import { describe } from "@jest/globals"
import { SET_CURRENT_PAGE, SET_IS_CARDS_VIEW } from '../../../src/constants'
var deepFreeze = require('deep-freeze');

const state = {
    currentPage: 1,
    cardsPerPage: 12,
    isCardsView: true
};

describe("func Reducer", () => {
    it("SET_CURRENT_PAGE success", () => {
        const action: SetCurrentPageActionType = {
            type: SET_CURRENT_PAGE,
            page: 2
        }
        deepFreeze(state)
        deepFreeze(action)
        const result: InitialStateType = funcReducer(state, action)
        expect(result.currentPage)
            .toEqual(2)
    })

    it("SET_IS_CARDS_VIEW success", () => {
        const action: SetIsCardsViewActionType = {
            type: SET_IS_CARDS_VIEW,
            isCardsView: false
        }
        deepFreeze(state)
        deepFreeze(action)
        const result: InitialStateType = funcReducer(state, action)
        expect(result.isCardsView)
            .toEqual(false)
    })

})