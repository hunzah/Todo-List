import {v1} from 'uuid';
import {todoListsAPI, TodoListType} from '../api/todolistsAPI';
import {AppThunk} from '../store';
import {RequestStatusType, SetStatusAC} from '../AppWithRedux/app.reducer';


export type TodolistDomainType = TodoListType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
export type FilterValueType =
    'all' | 'completed' | 'active'


export type RemoveTodoActionType = {
    type: 'REMOVE-TODO'
    id: string
}

export type AddTodoActionType = {
    type: 'ADD-TODO'
    // todoListId: string,
    // title: string
    todoList: TodoListType
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

export type SetTodoACType = {
    type: 'SET-TODO'
    todo: TodoListType[]
}


export type TodoListsActionTypes = RemoveTodoActionType | AddTodoActionType |
    ChangeTodoTitleActionType | ChangeTodoFilterActionType |
    SetTodoACType

export const todoListId1 = v1()
export const todoListId2 = v1()

const initialState: TodolistDomainType[] = []


export const todoListReducer = (state: TodolistDomainType[] = initialState, action: TodoListsActionTypes): TodolistDomainType[] => {

    switch (action.type) {
        case 'REMOVE-TODO':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODO':
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
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
            return action.todo.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        default:
            return state
    }
}

export const removeTodoAC = (id: string): RemoveTodoActionType => {
    return {type: 'REMOVE-TODO', id: id} as const
}


export const addTodoAC = (todoList: TodoListType): AddTodoActionType => {
    return {type: 'ADD-TODO', todoList: todoList} as const
}

export const changeTodoTitleAC = (id: string, newTitle: string): ChangeTodoTitleActionType => {
    return {type: 'CHANGE-TODO-TITLE', id: id, newTitle: newTitle}
}

export const changeTodoFilterAC = (id: string, newFilter: FilterValueType): ChangeTodoFilterActionType => {
    return {type: 'CHANGE-TODO-FILTER', id: id, newFilter: newFilter}
}

export const setTodoAC = (todo: TodoListType[]): SetTodoACType => {
    return {type: 'SET-TODO', todo: todo}
}

export const fetchTodoListsTC = (): AppThunk => (dispatch) => {
    dispatch(SetStatusAC('loading'))
    todoListsAPI.getTodoLists().then(res => {
        dispatch(setTodoAC(res.data))
        dispatch(SetStatusAC('succeeded'))
    });
};

export const removeTodoTC = (id: string): AppThunk => (dispatch) => {
    dispatch(SetStatusAC('loading'))
    todoListsAPI.deleteTodoList(id).then(res => {
        dispatch(removeTodoAC(id))
        dispatch(SetStatusAC('succeeded'))
    })

}
export const addTodoTC = (title: string): AppThunk => (dispatch) => {
    dispatch(SetStatusAC('loading'))
    todoListsAPI.postTodoList(title).then(res => {
        dispatch(addTodoAC(res.data.data.item))
        dispatch(SetStatusAC('succeeded'))
    })

}
export const changeTodoTitleTC = (id: string, title: string): AppThunk => (dispatch) => {
    dispatch(SetStatusAC('loading'))
    todoListsAPI.putTodoList(id, title).then(res => {
        dispatch(changeTodoTitleAC(id, title))
        dispatch(SetStatusAC('succeeded'))
    })
}
