import React, {useEffect} from 'react';
import s from '../App.module.css';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import {TaskType} from '../api/todolistsAPI';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, ThunkDispatchType} from '../store';
import LinearProgress from '@mui/material/LinearProgress';
import {RequestStatusType, SetIsInitializedTC} from './app.reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Route, Routes} from 'react-router-dom';
import {Login} from '../Features/Login/Login';
import {CircularProgress} from '@mui/material';
import {TodoListsWrap} from '../TodoList/TodolistsWrap';
import Grid from '@mui/material/Grid';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {useAppWithRedux} from './hooks/useAppWithRedux';
import {logOutTC} from '../Features/Login/login-reducer';


export type TasksStateType = {
    [key: string]: TaskType[]
}
type PropsType = {
    demo: boolean
}

function AppWithRedux({demo}: PropsType) {
    const {
        addTodoList,
    } = useAppWithRedux()

    const dispatch: ThunkDispatchType = useDispatch();

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    const isAuth = useSelector<AppRootStateType>(state => state.logIn.isAuth)

    useEffect(() => {
        dispatch(SetIsInitializedTC())
    }, [])


    if (!isInitialized) {
        return <CircularProgress style={{width: '5%', position: 'fixed', top: '50%', right: '50%'}}/>
    }



    return (

        <div className={s.App}>
            <ErrorSnackbar/>
            <AppBar position="static">
                 {/*@ts-ignore*/}
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
                    {isAuth &&
                        <Button variant="outlined" onClick={() => dispatch(logOutTC())} color="inherit">Log
                            out</Button>}
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>

                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/Todo-List" element={
                            <TodoListsWrap demo={demo}/>
                        }/>
                    </Routes>

            </Container>
        </div>

    );
}


export default AppWithRedux;
