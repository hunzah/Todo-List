import axios from 'axios/index';


type TodoListsType = {
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
type DeleteTodoListsResponseType = {
    resultCode: number
    messages: string[]
    data: {}
}
type UpdateTodoListsResponseType = {
    resultCode: number
    messages: string[]
    data: {}
}


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6d618c5c-24f1-48e7-9694-a9a2e7863199'
    }
}


export const todoListsAPI = {
    createTodoLists() {
        return axios.get<TodoListsType[]>('https://social-network.samuraijs.com/api/1.1/todo-lists/', settings)
    },
    putTodoLists() {
        return axios.post<CreateTodoListsResponseType>('https://social-network.samuraijs.com/api/1.1/todo-lists/',
            {title: 'Заголовок'}, settings)
    },
    deleteTodoLists() {
        return axios.get<DeleteTodoListsResponseType>('https://social-network.samuraijs.com/api/1.1/todo-lists/',
            settings)
    },
    postTodoLists() {
        return axios.put<UpdateTodoListsResponseType>('https://social-network.samuraijs.com/api/1.1/todo-lists/',
            {title: 'aaaa'}, settings)
    }
}
