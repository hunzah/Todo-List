import React, {FC, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';



export type FilterValueType =
    'all' | 'completed' | 'active'

type TodolistType = {
    id: string, title: string, filter: FilterValueType
}

type TasksStateType = {
    [key:string]:TaskType[]
}

function App() {


    function removeTask(id: string, todoListId: string) {
        const tasks = tasksObj[todoListId]
        tasksObj[todoListId] = tasks.filter(t => t.id !== id)

        setTasksObj({...tasksObj});
    }


    function addTasks(title: string, todoListId: string) {

        const tasks = tasksObj[todoListId]
        const newTask = {id: v1(), title: title, isDone: false};
        tasksObj[todoListId] = [...tasks, newTask]
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilterValueType, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoList([...todoLists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        const tasks = tasksObj[todoListId]
        const task = tasks.find(t => t.id === taskId)

        if (task) task.isDone = isDone
        setTasksObj({...tasksObj})

    }
    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        const tasks = tasksObj[todoListId]
        const task = tasks.find(t => t.id === taskId)

        if (task) task.title = newTitle
        setTasksObj({...tasksObj})

    }


    const todoListId1 = v1()
    const todoListId2 = v1()


    const [todoLists, setTodoList] = useState<TodolistType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    const removeTodoList = (todoListId: string) => {
        const filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoList(filteredTodoList)
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})

    }

    const changeTodoListTitle = (id:string,newTitle:string) => {
       const todoList = todoLists.find(tl=>tl.id === id)
        if(todoList) {
            todoList.title = newTitle
        }
        setTodoList([...todoLists])

    }


    const [tasksObj, setTasksObj] = useState<TasksStateType>(
        {
            [todoListId1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'REACT/REDUX', isDone: false}
            ],
            [todoListId2]: [
                {id: v1(), title: 'Bread', isDone: true},
                {id: v1(), title: 'Milk', isDone: false},

            ]
        }
    )

const addTodoList = (title:string) => {
        // const [title, setTitle] = useState<string>('')
        const newTodoList:TodolistType = {id: todoListId2, title: title, filter: 'all'}
    setTodoList([newTodoList, ...todoLists])

    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {
                todoLists.map((tl) => {

                    let tasksForTodoList = tasksObj[tl.id];

                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList?.filter(t => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList?.filter(t => !t.isDone)
                    }

                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList ? tasksForTodoList : []}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}

                    />
                })
            }


        </div>
    );
}

export default App;
