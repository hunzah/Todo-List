import {v1} from 'uuid';
import {TodoListType} from '../api/todolistsAPI';


export type TodolistDomainType = TodoListType & {
    filter: FilterValueType
}
export type FilterValueType =
    'all' | 'completed' | 'active'


export type RemoveTodoActionType = {
    type: 'REMOVE-TODO'
    id: string

}
export type AddTodoActionType = {
    type: 'ADD-TODO'
    todolistId: string,
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

export const todoListId1 = v1()
export const todoListId2 = v1()

const initialState: TodolistDomainType[] = [
    {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
]


export const todoListReducer = (state: TodolistDomainType[] = initialState, action: ActionTypes): TodolistDomainType[] => {

    switch (action.type) {
        case 'REMOVE-TODO':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODO':
            return [{id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0}, ...state]
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

export const removeTodoAC = (id: string): RemoveTodoActionType => {
    return {type: 'REMOVE-TODO', id: id} as const
}

export const addTodoAC = (title: string, todoId: string): AddTodoActionType => {
    return {type: 'ADD-TODO', todolistId: todoId, title: title,} as const
}

export const changeTodoTitleAC = (id: string, newTitle: string): ChangeTodoTitleActionType => {
    return {type: 'CHANGE-TODO-TITLE', id: id, newTitle: newTitle}
}

export const changeTodoFilterAC = (id: string, newFilter: FilterValueType): ChangeTodoFilterActionType => {
    return {type: 'CHANGE-TODO-FILTER', id: id, newFilter: newFilter}
}




