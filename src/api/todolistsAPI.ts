import axios from 'axios/index';


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
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})
type TaskResponseType<D={}> = {
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
        return instance.get<TodoListsType[]>(`todo-lists/`)
    },
    postTodoLists(todolistId:string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`,
            {title: 'aaaa'})
    },

    deleteTodoLists(todolistId:string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`,
            )
    },
    putTodoLists() {
        return instance.post<ResponseType<{ item: TodoListsType }>>(`todo-lists/`,
            {title: 'Заголовок'})
    },

    createTasks(todolistId:string) {
        return instance.get<TaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    putTasks(todolistId:string,taskId:string) {
        return instance.post<TaskResponseType>(`todo-lists/${todolistId}/tasks//${taskId}`)
    },
    deleteTasks(todolistId:string,taskId:string) {
        return instance.delete<TaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    postTasks(todolistId:string,taskId:string) {
        return instance.put<TaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
}
