import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './TodoList/tasks-reducer';
import {todolistReducer} from './TodoList/todolist-reducer';
import {TasksStateType, TodolistType} from './AppWithRedux';


type AppRootStateType = ReturnType<typeof rootReducer>


export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer})
export const store  = createStore(rootReducer)

// @ts-ignore
window.store = store