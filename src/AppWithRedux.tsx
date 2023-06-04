import React, {useCallback} from 'react';
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
import {addTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodoAC} from './TodoList/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';

export type FilterValueType =
    'all' | 'completed' | 'active'

export type TodolistType = {
    id: string, title: string, filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}


function AppWithRedux() {


    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, TodolistType[]>((state => state.todolists))


    // Work with TodoLists
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoAC(todoListId))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const todoId = v1()
        dispatch(addTodoAC(title, todoId))
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodoTitleAC(id, newTitle))

    }, [dispatch])

    const changeFilter = useCallback((value: FilterValueType, todoListId: string) => {
        dispatch(changeTodoFilterAC(todoListId, value))
    }, [dispatch])

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
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '15px'}}>
                                    <TodoList
                                        id={tl.id}
                                        title={tl.title}
                                        // tasks={tasksForTodoList ? tasksForTodoList : []}
                                        changeFilter={changeFilter}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                        // addTasks={addTasks}
                                        // changeStatus={changeStatus}
                                        // changeTaskTitle={changeTaskTitle}
                                        // removeTask={removeTask}
                                    />
                                </Paper>
                            </Grid>)
                    })}
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;
