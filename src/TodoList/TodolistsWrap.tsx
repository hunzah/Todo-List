import {useAppWithRedux} from '../AppWithRedux/hooks/useAppWithRedux';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TodoList from './Todo/TodoList';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, ThunkDispatchType} from '../store';
import {fetchTodoListsTC} from './Todo/todolist-reducer';
import {Navigate} from 'react-router-dom';

type PropsType = {
    demo: boolean
}

export const TodoListsWrap = ({demo}: PropsType) => {
    const {
        todoLists,
        changeFilter,
        removeTodoList,
        changeTodoListTitle
    } = useAppWithRedux()
    const dispatch: ThunkDispatchType = useDispatch();


    const isAuth = useSelector<AppRootStateType>(state => state.logIn.isAuth)

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTodoListsTC())
    }, [dispatch])


    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }
    return (
        <>
            <div> {/* или <React.Fragment> */}
                <Grid container spacing={3}>
                    {todoLists.map((tl) => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{ padding: "15px" }}>
                                    <TodoList
                                        todolist={tl}
                                        changeFilter={changeFilter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                        demo={demo}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </div> {/* или </React.Fragment> */}
        </>
    );
}