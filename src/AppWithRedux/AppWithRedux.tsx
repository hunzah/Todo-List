import React, {useEffect} from 'react';
import s from '../App.module.css';
import TodoList from '../TodoList/TodoList';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import {useAppWithRedux} from './hooks/useAppWithRedux';
import {TaskType} from '../api/todolistsAPI';
import {fetchTodoListsTC} from '../TodoList/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, ThunkDispatchType} from '../store';
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType, SetIsInitializedTC} from './app.reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../Features/Login/Login';
import {CircularProgress} from '@mui/material';


export type TasksStateType = {
    [key: string]: TaskType[]
}
type PropsType = {
    demo: boolean
}

function AppWithRedux({demo}: PropsType) {
    const {
        addTodoList,
        todoLists,
        changeFilter,
        removeTodoList,
        changeTodoListTitle
    } = useAppWithRedux()

    const dispatch: ThunkDispatchType = useDispatch();
    const isAuth = useSelector<AppRootStateType>(state => state.logIn.isAuth)
    useEffect(() => {
        if (demo || !isAuth) {
            return
        }
        dispatch(fetchTodoListsTC())
    }, [dispatch])

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(SetIsInitializedTC())
    }, [])

    if (!isInitialized) {
        return <CircularProgress style={{width: '5%', position: 'fixed', top: '50%', right: '50%'}}/>
    }
    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }

    return (
        <BrowserRouter>
            <div className={s.App}>
                <ErrorSnackbar/>
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
                {status === 'loading' && <LinearProgress/>}
                <Container fixed>

                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={
                            <>
                                <Grid container style={{padding: '20px'}}>
                                    <AddItemForm addItem={addTodoList} disabled={status === 'loading'}/>
                                </Grid>
                                <Grid container spacing={3}>
                                    {todoLists.map((tl) => {
                                        return (
                                            <Grid item key={tl.id}>
                                                <Paper style={{padding: '15px'}}>
                                                    <TodoList
                                                        todolist={tl}
                                                        changeFilter={changeFilter}
                                                        removeTodoList={removeTodoList}
                                                        changeTodoListTitle={changeTodoListTitle}
                                                        demo={demo}
                                                    />
                                                </Paper>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </>
                        }/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default AppWithRedux;
