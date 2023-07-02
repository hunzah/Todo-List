import {v1} from 'uuid';
import {
    addTodoAC,
    changeTodoFilterAC,
    changeTodoTitleAC,
    removeTodoAC, setTodoAC,
    TodolistDomainType,
    todoListReducer
} from './todolist-reducer';


const todoListId1 = v1()
const todoListId2 = v1()
const startState: TodolistDomainType[] = [
    {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
]

test('Todo should be deleted', () => {


    const newState = todoListReducer(startState, removeTodoAC(todoListId2))

    expect(newState?.length).toBe(1)
})
test('New todo should be added', () => {


    const newState = todoListReducer(startState, addTodoAC('aaaaaa', 'todoListId3'))
    expect(newState?.length).toBe(3)
    expect(newState[2]?.filter).toBe('all')
    expect(newState[0]?.title).toBe('aaaaaa')

})
test('Todo title should be changed', () => {


    let action = {
        id: todoListId2,
        newTitle: 'New Title'
    }

    const newState = todoListReducer(startState, changeTodoTitleAC(action.id, action.newTitle))
    expect(newState.length).toBe(2)
    expect(newState[1]?.title).toBe('New Title')

})
test('Todo filter should be changed', () => {


    let action = {
        type: 'CHANGE-TODO-FILTER',
        id: todoListId2,
        newFilter: 'active'
    }

    const newState = todoListReducer(startState, changeTodoFilterAC(action.id, 'active'))
    expect(newState.length).toBe(2)
    expect(newState[1]?.filter).toBe('active')

})
test('Todolist should be set',()=>{
    let newState = todoListReducer([],setTodoAC(startState))
    expect(newState.length).toBe(2)
})
