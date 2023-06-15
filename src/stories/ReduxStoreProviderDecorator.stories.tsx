import {AppRootStateType, store} from '../store';
import {Provider} from 'react-redux';
import {Meta} from '@storybook/react';
import AppWithRedux from '../AppWithRedux';
import {ReactNode} from 'react';
import {v1} from 'uuid';
import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../TodoList/tasks-reducer';
import {todolistReducer} from '../TodoList/todolist-reducer';


const meta: Meta = {
    title: 'AppWithRedux span Component',
    component: AppWithRedux,
}

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false
            },
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = legacy_createStore
(rootReducer, initialGlobalState as AppRootStateType);



export default meta

export const ReduxStoreProviderDecorator = (storyFn: ()=>ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

