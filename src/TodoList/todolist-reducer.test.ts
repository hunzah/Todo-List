import {v1} from 'uuid';
import {TodolistReducer} from './todolist-reducer';


const todoListId1 = v1()
const todoListId2 = v1()
const startState = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'}]
test('Todo should be deleted', () => {
    TodolistReducer(startState,{type: 'REMOVE-TODO-HANDLER'},todoListId1)
    expect(todoLists.length).toBe(todoLists.length - 1)

})
