import {Meta} from '@storybook/react';
import {useEffect, useState} from 'react';
import axios from 'axios';

const meta: Meta = {
    title: 'Example/Get/Post/Delete/Put,',
};

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6d618c5c-24f1-48e7-9694-a9a2e7863199'
    }
}

export default meta;

const getTodoLists = () => {
    const [state, setState] = useState({name: 'Bob'})
    useEffect(() => {
            axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists/{todolistId}', settings)
                .then((res) => {
                    setState(res.data)
                })
        }, []
    )
    return <div>{JSON.stringify(state)}</div>
}
const postTodoLists = () => {
    const [state, setState] = useState({name: 'Bob'})
    useEffect(() => {
            axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists/{todolistId}', {title: 'Заголовок'}, settings)
                .then((res) => {
                    setState(res.data)
                })
        }, []
    )
    return <div>{JSON.stringify(state)}</div>
}