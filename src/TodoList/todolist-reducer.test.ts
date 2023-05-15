import {v1} from 'uuid';
import {
    AddTodoActionTypeAC,
    ChangeTodoTitleActionType, ChangeTodoTitleAC,
    RemoveTodoActionTypeAC,
    TodolistReducer, ChangeTodoFilterAC
} from './todolist-reducer';
import {TodolistType} from '../App';



test('Todo should be deleted', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const startState: TodolistType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}]
    const newState = TodolistReducer(startState, RemoveTodoActionTypeAC(todoListId1))

    expect(newState?.length).toBe(1)
})
test('Todo should be added', () => {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TodolistType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}]

    const newTodo:TodolistType = {id: v1(), title: 'aaaaaa', filter: 'all'}

    const newState = TodolistReducer(startState, AddTodoActionTypeAC(newTodo))
    expect(newState?.length).toBe(3)
    expect(newState[2]?.filter).toBe('all')
    expect(newState[2]?.title).toBe('aaaaaa')

})
test('Todo title should be changed', () => {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TodolistType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    let action = {
        id: todoListId2,
        newTitle: 'New Title'
    }

    const newState = TodolistReducer(startState, ChangeTodoTitleAC(action))
    expect(newState.length).toBe(2)
    expect(newState[1]?.title).toBe('New Title')

})
test('Todo filter should be changed', () => {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TodolistType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    let action = {
        type: 'CHANGE-TODO-FILTER',
        id: todoListId2,
        newFilter: 'active'
    }

    const newState = TodolistReducer(startState, ChangeTodoFilterAC(action))
    expect(newState.length).toBe(2)
    expect(newState[1]?.filter).toBe('active')

})
