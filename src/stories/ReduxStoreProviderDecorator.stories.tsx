import {AppRootStateType} from '../store';
import {Provider} from 'react-redux';
import {Meta} from '@storybook/react';
import AppWithRedux from '../AppWithRedux/AppWithRedux';
import {ReactNode} from 'react';
import {v1} from 'uuid';
import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../TodoList/tasks-reducer';
import {todoListReducer} from '../TodoList/todolist-reducer';
import {TaskPriorities, TaskStatusType} from '../api/todolistsAPI';


const meta: Meta = {
    title: 'AppWithRedux span Component',
    component: AppWithRedux,
}

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})


const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML', status: TaskStatusType.Completed, todoListId: 'todolistId1',
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },
            {
                id: v1(), title: 'JS', status: TaskStatusType.Completed, todoListId: 'todolistId1',
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatusType.InProgress, todoListId: 'todolistId2',
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },
            {
                id: v1(), title: 'React Book', status: TaskStatusType.Completed, todoListId: 'todolistId2',
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },
        ]
    }
};


export const storyBookStore = legacy_createStore
(rootReducer, initialGlobalState as AppRootStateType);


export default meta

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}


