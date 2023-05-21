import {TasksStateType, TodolistType} from '../App';
import {AddTodoActionType} from './todolist-reducer';
import {TaskType} from './TodoList';

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

type ActionTypes = Action1Type | Action2Type


export const TasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todoListId]:
                    state[action.todoListId].filter(t => t.id !== action.id)
            }
        case 'ADD-TASK':
            return {...state, [action.todoListId]: [...state[action.todoListId], action.newTask]}
        case 'ADD-TASK':
            return {...state, [action.todoListId]: [...state[action.todoListId], action.newTask]}
        default:
            return state
    }
}

export const action1AC = (id: string, todoListId: string): Action1Type => {
    return {type: 'REMOVE-TASK', todoListId: todoListId, id: id,} as const
}

export const action2AC = (newTask: TaskType, todoListId: string): Action2Type => {
    return {type: 'ADD-TASK', todoListId: todoListId, newTask: newTask} as const
}

