import {Meta} from '@storybook/react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {todoListsAPI} from '../api/todolistsAPI';

const meta: Meta = {
    title: 'Example/Get/Post/Delete/Put,',
};


export default meta;

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6d618c5c-24f1-48e7-9694-a9a2e7863199'
    }
}

export const GetTodoLists = () => {
    const [state, setState] = useState({name: 'Bob'})
    useEffect(() => {
        todoListsAPI.getTodoLists().then((res: any) => {
            return setState(res);
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const PostTodoLists = () => {
    const [state, setState] = useState({name: 'Bob'})
    useEffect(() => {
            axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists/', {title: 'Заголовок'}, settings)
                .then((res) => {
                    setState(res.data)
                })
        }, []
    )
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodoLists = () => {
    const [state, setState] = useState({name: 'Bob'})
    useEffect(() => {
            axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/',)
                .then((res) => {
                    setState(res.data)
                })
        }, []
    )
    return <div>{JSON.stringify(state)}</div>
}

export const PutTodoLists = () => {
    const [state, setState] = useState({name: 'Bob'})
    useEffect(() => {
            axios.put('https://social-network.samuraijs.com/api/1.1/todo-lists/', {title: 'aaaa'}, settings)
                .then((res) => {
                    setState(res.data)
                })
        }, []
    )
    return <div>{JSON.stringify(state)}</div>
}