import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './TodoList/tasks-reducer';
import {todoListReducer} from './TodoList/todolist-reducer';


export type AppRootStateType = ReturnType<typeof rootReducer>


const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer})
export const store  = createStore(rootReducer)

// @ts-ignore
window.store = store