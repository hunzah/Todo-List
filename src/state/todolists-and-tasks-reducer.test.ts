import {TasksStateType} from '../App';
import {tasksReducer} from '../TodoList/tasks-reducer';
import {addTodoAC, TodolistDomainType, todoListReducer} from '../TodoList/todolist-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: TodolistDomainType[]= [];

    const action = addTodoAC("new todolist", 'todolist3');

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodoLists).toBe(action.todolistId);
});