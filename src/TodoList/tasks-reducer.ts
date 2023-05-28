import {TasksStateType} from '../App';
import {TaskType} from './TodoList';
import {AddTodoActionType, RemoveTodoActionType, todoListId2, todoListId1} from './todolist-reducer';
import {v1} from 'uuid';

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
    isDone:boolean
}
export type Action4Type = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    todoListId: string
    newTitle:string
}

type ActionTypes = Action1Type | Action2Type | Action3Type | Action4Type | AddTodoActionType | RemoveTodoActionType



const initialState =
    {
        [todoListId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'REACT/REDUX', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
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
            debugger
            return {...state, [action.todoListId]: [...state[action.todoListId], action.newTask]}
        case 'CHANGE-TASK-STATUS':
            const copyState = {...state}
            const tasks = copyState[action.todoListId];
            const task = tasks.find(t => t.id === action.id);
            if (task) task.isDone = action.isDone
            return copyState
        case 'CHANGE-TASK-TITLE':
            const copy = {...state}
            const tasks1 = copy[action.todoListId];
            const task1 = tasks1.find(t => t.id === action.id);
            if (task1) task1.title = action.newTitle
            return copy
        case'ADD-TODO': {
            return {...state, [action.todolistId]:[]}
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

export const changeTaskStatusAC = (id: string, todoListId: string, isDone:boolean): Action3Type => {
    return {type: 'CHANGE-TASK-STATUS', todoListId: todoListId, id: id, isDone:isDone} as const
}
export const changeTaskTitleAC = (id: string, todoListId: string, newTitle:string): Action4Type => {
    return {type: 'CHANGE-TASK-TITLE', todoListId: todoListId, id: id, newTitle:newTitle} as const
}
