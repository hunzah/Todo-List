import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store';
import {useCallback} from 'react';
import {addTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodoAC} from '../../TodoList/todolist-reducer';
import {v1} from 'uuid';
import {FilterValueType, TodolistType} from '../AppWithRedux';

export const useAppWithRedux=()=> {

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
    return {
        addTodoList,
        todoLists,
        changeFilter,
        removeTodoList,
        changeTodoListTitle
    }
}