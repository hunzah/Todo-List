import {TasksStateType, TodolistType} from '../App';

export type Action1Type = {
    type: 'REMOVE-TASK'
    todoListId: string
    id: string

}
export type Action2Type = {
    type: 'ADD-TASK'
    newTodo: TodolistType
}

type ActionTypes = Action1Type | Action2Type


export const TasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]:
                    state[action.todoListId].filter(t => t.id !== action.id)}
        case 'ADD-TASK':
            return {...state}
        default:
            return state
    }
}

export const action1AC = (id:string, todoListId: string):Action1Type => {
    return {type: 'REMOVE-TASK', todoListId: todoListId, id:id,} as const
}

// export const action2AC = (newTodo: TodolistType): AddTodoActionType => {
//     return {type: 'ADD-TASK', newTodo: newTodo} as const
// }

