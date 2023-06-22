import axios from 'axios';


export type TodoListsType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CreateTodoListsResponseType = {
    resultCode: number
    messages: string[]
    data: {
        item: TodoListsType
    }
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


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    ...settings
})


type TaskResponseType<D = {}> = {
    data: D
    totalCount: number
    error: string | null

}
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


export const todoListsAPI = {
    getTodoLists() {
        return instance.get<TodoListsType[]>(`todo-lists`)
    },

    postTodoLists(title: string) {
        return instance.post<ResponseType<{}>>(`todo-lists`, {title: title})
    },

    putTodoLists(todolistId: string) {
        return instance.put<ResponseType<{ item: TodoListsType }>>(`todo-lists/${todolistId}`)
    },
    deleteTodoLists(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`,
        )
    },

    getTasks(todolistId: string = '7e4c477a-e7b9-493d-b6c3-689d6969cd9c') {
        return instance.get<TaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    postTasks(todolistId: string, title: string) {
        return instance.post<TaskResponseType>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<TaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    putTasks(todolistId: string, taskId: string) {
        const updatedTask = {
            title: 'Updated Task',
            description: null,
            completed: true,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null
        }
        return instance.put<TaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, updatedTask)
    },
}
