import React, {FC, useState} from 'react';
import s from './App.module.css';
import TodoList, {TaskType} from './TodoList/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm/AddItemForm';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';

export type FilterValueType =
    'all' | 'completed' | 'active'

export type TodolistType = {
    id: string, title: string, filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {


    const todoListId1 = v1()
    const todoListId2 = v1()


    const [todoLists, setTodoList] = useState<TodolistType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

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

    // Work With Tasks
    function removeTask(id: string, todoListId: string) {
        const tasks = tasksObj[todoListId]
        tasksObj[todoListId] = tasks.filter(t => t.id !== id)

        setTasksObj({...tasksObj});
    }


    function addTasks(todoListId: string, title: string) {

        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoListId]

        let newTasks = [...tasks, newTask]

        tasksObj[todoListId] = newTasks
        setTasksObj({...tasksObj})
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


    // Work with TodoLists
    export const removeTodoList = (todoListId: string) => {
        setTodoList(todoLists.filter(tl => tl.id !== todoListId))

        // delete tasksObj[todoListId]
        setTasksObj({...tasksObj})

    }

    const changeTodoListTitle = (id: string, newTitle: string) => {
        const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
        }
        setTodoList([...todoLists])

    }

    function changeFilter(value: FilterValueType, todoListId: string) {

        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoList([...todoLists])
        }
    }


    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodolistType = {id: newTodoListId, title: title, filter: 'all'}
        setTodoList([...todoLists, newTodoList])
        setTasksObj(prev => ({...prev, [newTodoListId]: []}))
    }

    return (
        <div className={s.App}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList} titleForButtons={'Add Todo'}/>
                </Grid>
                <Grid container spacing={3}>

                    {todoLists.map((tl) => {

                        let tasksForTodoList = tasksObj[tl.id];

                        if (tl.filter === 'completed') {
                            tasksForTodoList = tasksForTodoList?.filter(t => t.isDone)
                        }
                        if (tl.filter === 'active') {
                            tasksForTodoList = tasksForTodoList?.filter(t => !t.isDone)
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: '15px'}}>
                                    <TodoList
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
                                </Paper>
                            </Grid>)
                    })}


                </Grid>

            </Container>
        </div>
    );
}

export default App;
