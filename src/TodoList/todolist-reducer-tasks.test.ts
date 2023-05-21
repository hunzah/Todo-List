import {v1} from 'uuid';
import {
    addTodoActionTypeAC,
    changeTodoFilterAC,
    changeTodoTitleAC,
    removeTodoActionTypeAC,
    TodolistReducer
} from './todolist-reducer';
import {TasksStateType, TodolistType} from '../App';
import {useState} from 'react';
import {action1AC, action2AC, TasksReducer} from './todolist-reducer-tasks';
import {TaskType} from './TodoList';


test('Task should be deleted', () => {

    const startState =
        {
            'todoListId1': [
                {id: '1', title: 'HTML', isDone: true},
                {id:'2', title: 'CSS', isDone: true},
                {id: '3', title: 'REACT/REDUX', isDone: false}
            ],
            'todoListId2': [
                {id: '1', title: 'Bread', isDone: true},
                {id: '2', title: 'Milk', isDone: false},

            ]
        }


    const endState = TasksReducer(startState, action1AC( '2', 'todoListId2'))

    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId2'].length).toBe(1);
    expect(endState['todoListId2'].every((t: { id: string; })=>t.id !=='2')).toBeTruthy();
});
test('Task should be added', () => {
    const startState =
        {
            'todoListId1': [
                {id: '1', title: 'HTML', isDone: true},
                {id:'2', title: 'CSS', isDone: true},
                {id: '3', title: 'REACT/REDUX', isDone: false}
            ],
            'todoListId2': [
                {id: '1', title: 'Bread', isDone: true},
                {id: '2', title: 'Milk', isDone: false},

            ]
        }
    const newTask: TaskType = {id: '4', title: 'aaa', isDone: false};
        const endState = TasksReducer(startState,action2AC(newTask,'todoListId1'))
    expect(endState['todoListId1'].length).toBe(4);
    expect(endState['todoListId2'].length).toBe(2);
    expect(endState['todoListId1'[3]]).toBe({id: '4', title: 'aaa', isDone: false});

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

    const newState = TodolistReducer(startState, changeTodoTitleAC(action))
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

    const newState = TodolistReducer(startState, changeTodoFilterAC(action))
    expect(newState.length).toBe(2)
    expect(newState[1]?.filter).toBe('active')

})

