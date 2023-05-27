import {FilterValueType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoActionType = {
    type: 'REMOVE-TODO'
    id: string

}
export type AddTodoActionType = {
    type: 'ADD-TODO'
    todolistId:string,
    title: string
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


export const todolistReducer = (state: TodolistType[], action: ActionTypes): TodolistType[] => {

    switch (action.type) {
        case 'REMOVE-TODO':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODO':
            return [ {id:action.todolistId,title:action.title,filter:'all'}, ...state]
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

export const removeTodoAC =  (id:string):RemoveTodoActionType =>{
    return {type:'REMOVE-TODO',id:id} as const
}

export const addTodoAC =  (title: string):AddTodoActionType =>{
    return {type:'ADD-TODO', todolistId: v1(), title, } as const
}

export const changeTodoTitleAC = (id:string,newTitle:string):ChangeTodoTitleActionType =>{
    return {type:'CHANGE-TODO-TITLE', id:id, newTitle:newTitle}}

export const changeTodoFilterAC =  (id:string, newFilter:FilterValueType):ChangeTodoFilterActionType =>{
    return {type:'CHANGE-TODO-FILTER', id:id, newFilter:newFilter}}




