import {v1} from 'uuid';
import {todoListsAPI, TodoListType} from '../api/todolistsAPI';
import {Dispatch} from 'redux';


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

export type setTodoACType = {
    type: 'SET-TODO'
    todo: TodoListType[]
}

type ActionTypes = RemoveTodoActionType | AddTodoActionType |
    ChangeTodoTitleActionType | ChangeTodoFilterActionType |
    setTodoACType

export const todoListId1 = v1()
export const todoListId2 = v1()

const initialState: TodolistDomainType[] = []


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
        case 'SET-TODO':
            return action.todo.map(tl => ({...tl, filter: 'all'}));
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

export const setTodoAC = (todo: TodoListType[]): setTodoACType => {
    return {type: 'SET-TODO', todo: todo}
}

export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
    todoListsAPI.getTodoLists().then(res => {
        dispatch(setTodoAC(res.data));
    });
};

