import {TasksStateType} from '../App';
import {AddTodoActionType, RemoveTodoActionType, todoListId1, todoListId2} from './todolist-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatus, TaskType} from '../api/todolistsAPI';

export type Action1Type = {
    type: 'REMOVE-TASK'
    todoListId: string
    id: string

}
export type Action2Type = {
    type: 'ADD-TASK'
    newTask: TaskType
    todoListId: string
}
export type Action3Type = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    todoListId: string
    status: TaskStatus
}
export type Action4Type = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    todoListId: string
    newTitle: string
}

type ActionTypes = Action1Type | Action2Type | Action3Type | Action4Type | AddTodoActionType | RemoveTodoActionType


const initialState =
    {
        [todoListId1]: [
            {
                id: v1(), title: 'HTML', status: TaskStatus.Completed, todoListId: todoListId1,
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },
            {
                id: v1(), title: 'CSS', status: TaskStatus.Completed, todoListId: todoListId1,
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },
            {
                id: v1(), title: 'REACT/REDUX', status: TaskStatus.InProgress, todoListId: todoListId1,
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            }
        ],
        [todoListId2]: [
            {
                id: v1(), title: 'Bread', status: TaskStatus.Completed, todoListId: todoListId1,
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },
            {
                id: v1(), title: 'Milk', status: TaskStatus.InProgress, todoListId: todoListId1,
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },

        ]
    }


export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todoListId]:
                    state[action.todoListId].filter(t => t.id !== action.id)
            }
        case 'ADD-TASK':

            return {...state, [action.todoListId]: [...state[action.todoListId], action.newTask]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: [...state[action.todoListId].map(task => task.id === action.id ? {
                    ...task,
                    status: action.status
                } : task)]
            }
        case 'CHANGE-TASK-TITLE':
            console.log(action.id)
            return {
                ...state, [action.todoListId]: [...state[action.todoListId].map(task => task.id === action.id ?
                    {...task, title: action.newTitle} : task)]
            }
        case'ADD-TODO': {
            return {...state, [action.todolistId]: []}
        }
        case'REMOVE-TODO': {
            const copy = {...state}
            delete copy[action.id]
            return copy
        }
        default:
            return state

    }
}


export const removeTaskAC = (id: string, todoListId: string): Action1Type => {
    return {type: 'REMOVE-TASK', todoListId: todoListId, id: id,} as const
}

export const addTaskAC = (newTask: TaskType, todoListId: string): Action2Type => {
    return {type: 'ADD-TASK', todoListId: todoListId, newTask: newTask} as const
}

export const changeTaskStatusAC = (id: string, todoListId: string, status: TaskStatus): Action3Type => {
    return {type: 'CHANGE-TASK-STATUS', todoListId: todoListId, id: id, status: status} as const
}
export const changeTaskTitleAC = (id: string, todoListId: string, newTitle: string): Action4Type => {
    return {type: 'CHANGE-TASK-TITLE', todoListId: todoListId, id: id, newTitle: newTitle} as const
}
