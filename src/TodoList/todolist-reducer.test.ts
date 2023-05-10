import {v1} from 'uuid';
import {TodolistReducer} from './todolist-reducer';
import {TodolistType} from '../App';


const todoListId1 = v1()
const todoListId2 = v1()
const startState:TodolistType[] = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'}]
test('Todo should be deleted', () => {
    const newState = TodolistReducer(startState,{type: 'REMOVE-TODO-HANDLER', id:todoListId1})
    expect(newState.length).toBe( 1)

})
