
import cardReducer, { InitialStateType, SetCardsActionType, 
    ToggleIsFetchingActionType, SortByDateActionType, ToggleActionType, 
    DeleteCardActionType, RecoveryCardActionType, SortBySizeActionType, 
    SortByNameActionType, SortByCategoryActionType } from '../../../src/Redux/card-reducer';
import { describe } from "@jest/globals"
import { CardType} from '../../../src/Types/types';
import { SET_CARDS, TOGGLE_IS_FETCHING, SORT_BY_DATE, SORT_BY_SIZE, SORT_BY_NAME, SORT_BY_CATEGORY, TOGGLE, DELETE_CARD, RECOVERY_CARD } from '../../../src/constants';
var deepFreeze = require('deep-freeze');

const state = {
    cards: [{
        image: "img7",
        filesize: 27871,
        timestamp: 1326507478629,
        category: "category1"
    },{
        image: "img2",
        filesize: 34181,
        timestamp: 1429933587802,
        category: "category2"
    },{
        image: "img3",
        filesize: 11820,
        timestamp: 1398438901944,
        category: "category3"
    }] as Array<CardType>,
    deletedCards: [{
        image: "img4",
        filesize: 43723,
        timestamp: 1363936022468,
        category: "category4"
    }] as Array<CardType>,
    isFetching: false,
    toggle: false
}

describe("card Reducer", () => {
    it("SET_CARDS success", () => {
        const action: SetCardsActionType = {
            type: SET_CARDS,
            cards: [{
                image: "img",
                filesize: 124,
                timestamp: 123,
                category: "category"
            },{
                image: "img2",
                filesize: 12423456,
                timestamp: 6234123,
                category: "category2"
            }]
        }
        deepFreeze(state)
        deepFreeze(action)
        const result: InitialStateType = cardReducer(state, action)
        expect(result.cards)
            .toEqual([{
                image: "img",
                filesize: 124,
                timestamp: 123,
                category: "category"
            },{
                image: "img2",
                filesize: 12423456,
                timestamp: 6234123,
                category: "category2"
            }]
        )
    })

    it("TOGGLE_IS_FETCHING success", () => {
        const action: ToggleIsFetchingActionType = {
            type: TOGGLE_IS_FETCHING,
            isFetching: true
        }
        deepFreeze(state)
        deepFreeze(action)
        const result: InitialStateType = cardReducer(state, action)
        expect(result.isFetching)
            .toEqual(true)
    })

    it("SORT_BY_DATE success", () => {
        const action: SortByDateActionType = {
            type: SORT_BY_DATE
        }
        deepFreeze(state)
        deepFreeze(action)
        const result: InitialStateType = cardReducer(state, action)
        expect(result.cards)
            .toEqual([{
                image: "img7",
                filesize: 27871,
                timestamp: 1326507478629,
                category: "category1"
            },{
                image: "img3",
                filesize: 11820,
                timestamp: 1398438901944,
                category: "category3"
            },{
                image: "img2",
                filesize: 34181,
                timestamp: 1429933587802,
                category: "category2"
            }])
    })

    it("SORT_BY_SIZE success", () => {
        const action: SortBySizeActionType = {
            type: SORT_BY_SIZE
        }
        deepFreeze(state)
        deepFreeze(action)
        const result: InitialStateType = cardReducer(state, action)
        expect(result.cards)
            .toEqual([{
                image: "img3",
                filesize: 11820,
                timestamp: 1398438901944,
                category: "category3"
            },{
                image: "img7",
                filesize: 27871,
                timestamp: 1326507478629,
                category: "category1"
            },{
                image: "img2",
                filesize: 34181,
                timestamp: 1429933587802,
                category: "category2"
            }])
    })

    it("SORT_BY_NAME success", () => {
        const action: SortByNameActionType = {
            type: SORT_BY_NAME
        }
        deepFreeze(state)
        deepFreeze(action)
        const result: InitialStateType = cardReducer(state, action)
        expect(result.cards)
            .toEqual([{
                image: "img2",
                filesize: 34181,
                timestamp: 1429933587802,
                category: "category2"
            },{
                image: "img3",
                filesize: 11820,
                timestamp: 1398438901944,
                category: "category3"
            },{
                image: "img7",
                filesize: 27871,
                timestamp: 1326507478629,
                category: "category1"
            }])
    })

    it("SORT_BY_CATEGORY success", () => {
        const action: SortByCategoryActionType = {
            type: SORT_BY_CATEGORY
        }
        deepFreeze(state)
        deepFreeze(action)
        const result: InitialStateType = cardReducer(state, action)
        expect(result.cards)
            .toEqual([{
                image: "img7",
                filesize: 27871,
                timestamp: 1326507478629,
                category: "category1"
            },{
                image: "img2",
                filesize: 34181,
                timestamp: 1429933587802,
                category: "category2"
            },{
                image: "img3",
                filesize: 11820,
                timestamp: 1398438901944,
                category: "category3"
            }])
    })

    it("TOGGLE success", () => {
        const action: ToggleActionType = {
            type: TOGGLE
        }
        deepFreeze(state)
        deepFreeze(action)
        const result: InitialStateType = cardReducer(state, action)
        expect(result.toggle)
            .toEqual(true)
    })

    it("DELETE_CARD success", () => {
        const action: DeleteCardActionType = {
            type: DELETE_CARD,
            timestamp: 1398438901944
        }
        deepFreeze(state)
        deepFreeze(action)
        const result: InitialStateType = cardReducer(state, action)
        expect(result.cards)
            .toEqual([
                {
                    image: "img7",
                    filesize: 27871,
                    timestamp: 1326507478629,
                    category: "category1"
                },{
                    image: "img2",
                    filesize: 34181,
                    timestamp: 1429933587802,
                    category: "category2"
                }
            ])
        expect(result.deletedCards)
            .toEqual([
                {
                    image: "img4",
                    filesize: 43723,
                    timestamp: 1363936022468,
                    category: "category4"
                },{
                    image: "img3",
                    filesize: 11820,
                    timestamp: 1398438901944,
                    category: "category3"
                }
            ])
    })

    it("RECOVERY_CARD success", () => {
        const action: RecoveryCardActionType = {
            type: RECOVERY_CARD
        }
        deepFreeze(state)
        deepFreeze(action)
        const result: InitialStateType = cardReducer(state, action)
        expect(result.cards)
            .toEqual([{
                image: "img7",
                filesize: 27871,
                timestamp: 1326507478629,
                category: "category1"
            },{
                image: "img2",
                filesize: 34181,
                timestamp: 1429933587802,
                category: "category2"
            },{
                image: "img3",
                filesize: 11820,
                timestamp: 1398438901944,
                category: "category3"
            },{
                image: "img4",
                filesize: 43723,
                timestamp: 1363936022468,
                category: "category4"
            }
            ])
        expect(result.deletedCards)
            .toEqual([])
    })
})