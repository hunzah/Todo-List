import {TasksStateType, TodolistType} from '../App';

export type Action1Type = {
    type: 'REMOVE-TASK'
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
            return {
                const tasks = tasksObj[todoListId]
                tasksObj[todoListId] = tasks.filter(t => t.id !== id)

                setTasksObj({...tasksObj});
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

export const action1AC = (id, todoListId1: string): => {
    return {type: 'REMOVE-TASK', id: todoListId1} as const
}

export const action2AC = (newTodo: TodolistType): AddTodoActionType => {
    return {type: 'ADD-TASK', newTodo: newTodo} as const
}

