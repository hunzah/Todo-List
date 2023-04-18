import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';


export type FilterValueType =
    'all' | 'completed' | 'active'

type TodolistType = {
    id: string, title:string, filter: FilterValueType
}

function App() {



    let initTask_1: Array<TaskType> = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'REACT/REDUX', isDone: false}
    ]


    let [tasks_1, setTasks] = useState(initTask_1);
    let [filter, setFilter] = useState<FilterValueType>('all')


    function removeTask(id: string) {
        let filteredTasks = tasks_1.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    function addTasks(title: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        const newTasks = [newTask, ...tasks_1]
        setTasks(newTasks)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        const task = tasks_1.find(t => t.id === taskId)

        if (task) task.isDone = isDone
        const copy = [...tasks_1]
        setTasks(copy)
    }


    let tasksForTodoList = tasks_1;
    if (filter === 'completed') {
        tasksForTodoList = tasks_1.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks_1.filter(t => !t.isDone)
    }


    const todolists:TodolistType[] = [
        {id: v1(), title: 'What to learn', filter: 'active'},
        {id: v1(), title: 'What to buy', filter: 'active'}

    ]


    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    return <TodoList
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                    />
                })
            }


        </div>
    );
}

export default App;
