import {Meta} from '@storybook/react';
import {useEffect, useState} from 'react';
import axios from 'axios';

const meta: Meta = {
    title: 'Example/Api',
};

export default meta;

const getTodoLists = () => {
    const [state, setState] = useState({name: 'Bob'})
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists/{todolistId}')
            .then((res)=>{
                setState(res)
        })
    },[]
)
    return <div>{JSON.stringify(state)}</div>
}