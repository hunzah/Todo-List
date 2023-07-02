import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from './TodoList/tasks-reducer';
import {todoListReducer} from './TodoList/todolist-reducer';
import thunkMiddleware from 'redux-thunk'


export type AppRootStateType = ReturnType<typeof rootReducer>


const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer})
export const store  = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store