import React, {FC, useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';


export type FilterValueType =
    'all' | 'completed' | 'active'

type TodolistType = {
    id: string, title: string, filter: FilterValueType
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

    const todoListId1 = v1()
    const todoListId2 = v1()


    const [todoLists, setTodoList] = useState<TodolistType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'active'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    const removeTodoList = (todoListId: string) => {
        const filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoList(filteredTodoList)
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})

    }


    const [tasksObj, setTasksObj] = useState(
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



    return (
        <div className="App">
            {
                todoLists.map((tl) => {

                    let tasksForTodoList = tasksObj[tl.id];

                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList?.filter(t => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList?.filter(t => !t.isDone)
                    }
                    console.log(tasksForTodoList)
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList ? tasksForTodoList : []}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                })
            }


        </div>
    );
}

export default App;
