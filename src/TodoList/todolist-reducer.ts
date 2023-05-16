import {FilterValueType, TodolistType} from '../App';

export type RemoveTodoActionType = {
    type: 'REMOVE-TODO-HANDLER'
    id: string

}
export type AddTodoActionType = {
    type: 'ADD-TODO'
    newTodo: TodolistType
}
export type ChangeTodoTitleActionType = {
    type: 'CHANGE-TODO-TITLE'
    newTitle: string
    id: string
}
export type ChangeTodoFilterActionType = {
    type: 'CHANGE-TODO-FILTER'
    newFilter: FilterValueType
    id: string
}

type ActionTypes = RemoveTodoActionType | AddTodoActionType | ChangeTodoTitleActionType | ChangeTodoFilterActionType


export const TodolistReducer = (state: TodolistType[], action: ActionTypes) => {

    switch (action.type) {
        case 'REMOVE-TODO-HANDLER':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODO':
            return [...state, action.newTodo]
        case 'CHANGE-TODO-TITLE':
            return state.map((tl) => {
                if (tl.id === action.id) {
                    return {...tl, title: action.newTitle};
                }
                return tl;
            });
        case 'CHANGE-TODO-FILTER':
            return state.map((tl) => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.newFilter};
                }
                return tl;
            });
        default:
            return state
    }
}

export const RemoveTodoActionTypeAC =  (todoListId1:string):RemoveTodoActionType =>{
    return {type:'REMOVE-TODO-HANDLER',id:todoListId1} as const
}

export const AddTodoActionTypeAC =  (newTodo:TodolistType):AddTodoActionType =>{
    return {type:'ADD-TODO', newTodo: newTodo} as const
}

export const ChangeTodoTitleAC = (action:any):ChangeTodoTitleActionType =>{
    return {type:'CHANGE-TODO-TITLE', id:action.id, newTitle:action.newTitle}}

export const ChangeTodoFilterAC =  (action:any):ChangeTodoFilterActionType =>{
    return {type:'CHANGE-TODO-FILTER', id:action.id, newFilter:action.newFilter}}


