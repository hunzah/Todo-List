import {TasksStateType} from '../App';
import {AddTodoActionType, RemoveTodoActionType, setTodoACType, todoListId1, todoListId2} from './todolist-reducer';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatusType, TaskType, todoListsAPI, TodoListType} from '../api/todolistsAPI';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../store';

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
    status: TaskStatusType
}
export type Action4Type = {
    type: 'CHANGE-TASK-TITLE'
    todoListId: string
    id: string
    newTitle: string
}
export type Action5Type = {
    type: 'SET-TASKS'
    tasks: TaskType[]
    todoListId: string
}

type ActionTypes = Action1Type | Action2Type | Action3Type |
    Action4Type | AddTodoActionType | RemoveTodoActionType |
    setTodoACType | Action5Type


const initialState: TasksStateType =
    {
        [todoListId1]: [
            {
                id: v1(), title: 'HTML', status: TaskStatusType.Completed, todoListId: todoListId1,
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },
            {
                id: v1(), title: 'CSS', status: TaskStatusType.Completed, todoListId: todoListId1,
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },
            {
                id: v1(), title: 'REACT/REDUX', status: TaskStatusType.InProgress, todoListId: todoListId1,
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            }
        ],
        [todoListId2]: [
            {
                id: v1(), title: 'Bread', status: TaskStatusType.Completed, todoListId: todoListId1,
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },
            {
                id: v1(), title: 'Milk', status: TaskStatusType.InProgress, todoListId: todoListId1,
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
            return {
                ...state,
                [action.todoListId]: [...state[action.todoListId].map(task => task.id === action.id ?
                    {...task, title: action.newTitle} : task)]
            }
        case'ADD-TODO': {
            return {...state, [action.todoList.id]: []}
        }
        case'REMOVE-TODO': {
            const copy = {...state}
            delete copy[action.id]
            return copy
        }
        case 'SET-TODO': {
            const copy = {...state}
            action.todo.forEach((tl: TodoListType) => {
                return copy [tl.id] = []
            })
            return copy
        }
        case 'SET-TASKS': {
            return {...state, [action.todoListId]: action.tasks}
        }
        default:
            return state

    }
}


export const removeTaskAC = (id: string, todoListId: string): Action1Type => {
    return {type: 'REMOVE-TASK', todoListId: todoListId, id: id,} as const
}


export const addTaskAC = (newTask: TaskType): Action2Type => {
    if (newTask && newTask.todoListId) {
        return {type: 'ADD-TASK', todoListId: newTask.todoListId, newTask: newTask} as const;
    }
    throw new Error('Invalid task object');
};

export const changeTaskStatusAC = (id: string, todoListId: string, status: TaskStatusType): Action3Type => {
    return {type: 'CHANGE-TASK-STATUS', todoListId: todoListId, id: id, status: status} as const
}
export const changeTaskTitleAC = (todoListId: string, id: string, title: string): Action4Type => {
    return {type: 'CHANGE-TASK-TITLE', todoListId: todoListId, id: id, newTitle: title} as const
}
export const setTasksAC = (todoListId: string, tasks: TaskType[]): Action5Type => {
    return {type: 'SET-TASKS', todoListId: todoListId, tasks: tasks} as const
}

export const fetchTasksTC = (todoListId: string): any => (dispatch: Dispatch) => {
    todoListsAPI.getTasks(todoListId).then(res => {
        dispatch(setTasksAC(todoListId, res.data.items));
    });
};
export const addTaskTC = (newTask: TaskType, todoListId: string): any => (dispatch: Dispatch) => {
    todoListsAPI.postTask(todoListId, newTask.title).then(res => {
        dispatch(addTaskAC(res.data.data.item));
    });
};
export const deleteTaskTC = (id: string, todoListId: string): any => (dispatch: Dispatch) => {
    todoListsAPI.deleteTask(todoListId, id).then(res => {
        dispatch(removeTaskAC(id, todoListId));
    });
};
export const changeTaskTitleTC = (id: string, todoListId: string, title: string): any => (dispatch: Dispatch) => {
    const updatedTask: TaskType = {
        title: title,
        id: id,
        todoListId: todoListId,
        description: '',
        status: 0,
        priority: 1,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: new Date()
    }
    todoListsAPI.putTask(todoListId, id, updatedTask).then(res => {
        dispatch(changeTaskTitleAC(todoListId, id, res.data.data.item.title));
        console.log(res.data)
    });
};
export const changeTasStatusTC = (id: string, todoListId: string, status: TaskStatusType): any => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()

    const task = state.tasks[todoListId].find(task => task.id === id)
    if (!task) {
        console.warn('task not found')
        return
    }
    const updatedTask: TaskType = {
        title: task.title,
        status: status,
        order: task.order,
        addedDate: task.addedDate,
        deadline: task.deadline,
        id: task.id,
        todoListId: task.todoListId,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate

    }

    todoListsAPI.putTask(todoListId, id, updatedTask).then(res => {
        dispatch(changeTaskTitleAC(todoListId, id, res.data.data.item.title));
        console.log(res.data)
    });
};
