import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import {TaskActionTypes, tasksReducer} from './TodoList/tasks-reducer';
import {todoListReducer, TodoListsActionTypes} from './TodoList/todolist-reducer';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'


export type AppRootStateType = ReturnType<typeof rootReducer>


const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppActionTypes = TodoListsActionTypes | TaskActionTypes

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppActionTypes
    >
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, void, AppActionTypes>;
// @ts-ignore
window.store = store