import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';


export type FilterValueType =
    'all' | 'completed' | 'active'

function App() {
    const todoListTitle_1: string = 'What to learn';


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

function addTasks (title: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        const newTasks = [newTask, ...tasks_1]
    setTasks(newTasks)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }


    let tasksForTodoList = tasks_1;
    if (filter === 'completed') {
        tasksForTodoList = tasks_1.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks_1.filter(t => !t.isDone)
    }


    return (
        <div className="App">
            <TodoList
                title={todoListTitle_1}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTasks = {addTasks}
            />

        </div>
    );
}

export default App;
