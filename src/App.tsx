import React from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';

function App() {
    const todoListTitle_1: string  = "What to learn"
    const todoListTitle_2: string  = "What to buy"
    const task_1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone:true},
        {id: 2, title: "HTML&CSS", isDone:true},
        {id: 3, title: "REACT/REDUX", isDone:false}
    ]
    const task_2: Array<TaskType> = [
        {id: 4, title: "MILK", isDone:true},
        {id: 5, title: "WATER", isDone:false},
        {id: 6, title: "SALT", isDone:true}
    ]
    return (
        <div className="App">
            <TodoList
                title= {todoListTitle_1}
                tasks={task_1}
            />
            <TodoList
                title= {todoListTitle_2}
                tasks={task_2}
            />
        </div>
    );
}

export default App;
