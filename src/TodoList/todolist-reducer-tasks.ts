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
            const tasks = {...state[action.todoListId].filter(t => t.id !== action.id)}
            return {
                setTasksObj(...tasks);
            }
        case 'ADD-TODO':
            return [...state, action.newTodo]
        case 'CHANGE-TODO-TITLE':
            return state.map((tl) => {
                if (tl.id === action.id) {
                    return {...tl, title: action.newTitle};
                }
                return tl;
            });
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

