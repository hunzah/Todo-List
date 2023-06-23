import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store';
import {useCallback} from 'react';
import {
    addTodoAC,
    changeTodoFilterAC,
    changeTodoTitleAC,
    FilterValueType,
    removeTodoAC,
    TodolistDomainType
} from '../../TodoList/todolist-reducer';
import {v1} from 'uuid';

export const useAppWithRedux = () => {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>((state => state.todoLists))


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