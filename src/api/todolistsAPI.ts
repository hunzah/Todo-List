import {useEffect, useState} from 'react';
import axios from 'axios/index';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6d618c5c-24f1-48e7-9694-a9a2e7863199'
    }
}

const [state, setState] = useState({name: 'Bob'})

export const todoListsAPI = {
    getTodoLists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists/', settings)
    }
}
