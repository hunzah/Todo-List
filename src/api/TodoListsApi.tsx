import {useEffect, useState} from 'react';
import {todoListsAPI, TodoListsType} from './todolistsAPI';

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
    const [state, setState] = useState<TodoListsType[]>()
    useEffect(() => {
        todoListsAPI.createTodoLists().then((res) => {
            return setState(res.data);
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const PostTodoLists = () => {
    const [state, setState] = useState<{ item: TodoListsType }>()
    useEffect(() => {
            todoListsAPI.putTodoLists()
                .then((res) => {
                    setState(res.data.data)
                })
        }, []
    )
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodoLists = () => {
    const [state, setState] = useState<{}>({name: 'Bob'})
    useEffect(() => {
            todoListsAPI.deleteTodoLists('hg')
                .then((res) => {
                    setState(res.data.data)
                })
        }, []
    )
    return <div>{JSON.stringify(state)}</div>
}

export const PutTodoLists = () => {
    const [state, setState] = useState<{}>({name: 'Bob'})
    useEffect(() => {
            todoListsAPI.postTodoLists()
                .then((res) => {
                    setState(res.data.data)
                })
        }, []
    )
    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>()
    const [todoListId, setTodolistId] = useState<string>('')

    function onClickHandler() {
        todoListsAPI.createTasks('dd').then((res) => {
            return setState(res.data);
        })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input value={todoListId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={onClickHandler}>Delete Task</button>
        </div>)
}

export const PostTasks = () => {
    const [state, setState] = useState<any>()
    const [todoListId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    function onClickHandler() {
        todoListsAPI.postTasks(todoListId, taskId)
            .then((res) => {
                setState(res.data.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input value={todoListId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={onClickHandler}>Delete Task</button>
        </div>)
}

export const DeleteTasks = () => {
    const [state, setState] = useState<{}>({name: 'Bob'})
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, setTodolistId] = useState<string>('')

    function onClickHandler() {
        todoListsAPI.deleteTasks(todoListId, taskId)
            .then((res) => {
                setState(res.data.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input value={taskId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={onClickHandler}>Delete Task</button>
        </div>)
}

export const PutTasks = () => {
    const [state, setState] = useState<any>()
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, setTodolistId] = useState<string>('')

    function onClickHandler() {
        todoListsAPI.putTasks(todoListId, taskId)
            .then((res) => {
                setState(res.data.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <input value={taskId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={onClickHandler}>Delete Task</button>
        </div>)
}