import {TodolistType} from '../App';


type ActionType = any


export const TodolistReducer = (state: TodolistType[], action: ActionType) => {

    switch (action.type) {
        case 'REMOVE-TODO-HANDLER':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODO':
            return [...state, action.newTodo]
        case 'CHANGE-TODO-TITLE':
            return state.map((tl) => {
                if (tl.id === action.id) {
                    return { ...tl, title: action.newTitle };
                }
                return tl;
            });
        case 'CHANGE-TODO-FILTER':
            return state.map((tl) => {
                if (tl.id === action.id) {
                    return { ...tl, filter: action.newFilter };
                }
                return tl;
            });
            default:
                return state
            }
    }

