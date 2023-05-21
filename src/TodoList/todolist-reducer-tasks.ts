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
export type Action3Type = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    todoListId: string
}

type ActionTypes = Action1Type | Action2Type | Action3Type


export const TasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todoListId]:
                    state[action.todoListId].filter(t => t.id !== action.id)
            }
        case 'ADD-TASK':
            return {...state, [action.todoListId]: [...state[action.todoListId], action.newTask]}
        case 'CHANGE-TASK-STATUS':
            const tasks = state[action.todoListId];
            const task = tasks.find(t => t.id === action.id);
            if (!task) return state;
            const updatedTask = { ...task, isDone: !task.isDone };
            const updatedTasks = tasks.map(t => t.id === action.id ? updatedTask : t);
            return {
                ...state,
                [action.todoListId]: updatedTasks,
            };
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

export const changeTaskStatusAC = (id: string, todoListId: string): Action3Type => {
    return {type: 'CHANGE-TASK-STATUS', todoListId: todoListId, id: id} as const
}
