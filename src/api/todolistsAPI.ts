import axios from 'axios';


export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}


type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6d618c5c-24f1-48e7-9694-a9a2e7863199'
    }
}


export type TaskResponseType<D = {}> = {
    items: D
    totalCount: number
    error: string | null

}

export enum TaskStatus {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    ...settings
})

export const todoListsAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>(`todo-lists`)
    },

    postTodoLists(title: string) {
        return instance.post<ResponseType<{}>>(`todo-lists`, {title: title})
    },

    putTodoLists(todolistId: string) {
        return instance.put<ResponseType<{ item: TodoListType }>>(`todo-lists/${todolistId}`)
    },
    deleteTodoLists(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`,
        )
    },

    getTasks(todolistId: string) {
        return instance.get<TaskResponseType<TaskType[]>>(`todo-lists/${todolistId}/tasks`)
    },
    postTasks(todolistId: string, title: string) {
        return instance.post<TaskResponseType>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<TaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    update(todolistId: string, taskId: string, title: string) {
        const updatedTask: TaskType = {
            title: title,
            id: taskId,
            todoListId: todolistId,
            description: '',
            status: 0,
            priority: 1,
            startDate: '',
            deadline: '',
            order: 0,
            addedDate: ''
        }
        return instance.put<TaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, updatedTask)
    },
}

