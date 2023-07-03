import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store';
import {useCallback} from 'react';
import {
    addTodoAC, addTodoTC,
    changeTodoFilterAC,
    changeTodoTitleAC, changeTodoTitleTC,
    FilterValueType,
    removeTodoTC,
    TodolistDomainType
} from '../../TodoList/todolist-reducer';
import {v1} from 'uuid';

export const useAppWithRedux = () => {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>((state => state.todoLists))


    // Work with TodoLists
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoTC(todoListId))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        console.log(title)
        // const todoId = v1()
        dispatch(addTodoTC(title))
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodoTitleTC(id, newTitle))

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