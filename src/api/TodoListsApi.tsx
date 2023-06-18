import {useEffect, useState} from 'react';
import {todoListsAPI} from './todolistsAPI';
import {Meta} from '@storybook/react';

// const meta: Meta = {
//     title: 'Example/Get/Post/Delete/Put,',
// };
//
//
// export default meta;

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6d618c5c-24f1-48e7-9694-a9a2e7863199'
    }
}

export const GetTodoLists = () => {
    const [state, setState] = useState({name: 'Bob'})
    useEffect(() => {
        todoListsAPI.createTodoLists().then((res: any) => {
            return setState(res);
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const PostTodoLists = () => {
    const [state, setState] = useState({name: 'Bob'})
    useEffect(() => {
            todoListsAPI.putTodoLists()
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
            todoListsAPI.deleteTodoLists()
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
            todoListsAPI.postTodoLists()
                .then((res) => {
                    setState(res.data)
                })
        }, []
    )
    return <div>{JSON.stringify(state)}</div>
}