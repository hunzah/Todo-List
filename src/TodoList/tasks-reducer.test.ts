import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducer';
import {TasksStateType} from '../App';
import {addTodoAC, removeTodoAC, todoListId1, todoListId2} from './todolist-reducer';
import {TaskPriorities, TaskStatus, TaskType} from '../api/todolistsAPI';
import {v1} from 'uuid';


const startState =
    {
        [todoListId1]: [
            {
                id: v1(), title: 'HTML', status: TaskStatus.Completed, todoListId: todoListId1,
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },
            {
                id: v1(), title: 'CSS', status: TaskStatus.Completed, todoListId: todoListId1,
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },
            {
                id: v1(), title: 'REACT/REDUX', status: TaskStatus.InProgress, todoListId: todoListId1,
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            }
        ],
        [todoListId2]: [
            {
                id: v1(), title: 'Bread', status: TaskStatus.Completed, todoListId: todoListId1,
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },
            {
                id: v1(), title: 'Milk', status: TaskStatus.InProgress, todoListId: todoListId1,
                startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
                deadline: '' +
                    '', description: ''
            },

        ]
    }
test('Task should be deleted', () => {

    const endState = tasksReducer(startState, removeTaskAC('2', 'todoListId2'))

    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId2'].length).toBe(1);
    expect(endState['todoListId2'].every((t: { id: string; }) => t.id !== '2')).toBeTruthy();
});
test('Task should be added', () => {
    const newTask: TaskType = {
        id: '4', title: 'aaa', status: TaskStatus.Completed, todoListId: todoListId1,
        startDate: '', addedDate: '', order: 0, priority: TaskPriorities.low,
        deadline: '' +
            '', description: ''
    };
    const endState = tasksReducer(startState, addTaskAC(newTask, 'todoListId1'))
    expect(endState['todoListId1'].length).toBe(4);
    expect(endState['todoListId2'].length).toBe(2);
    expect(endState['todoListId1'][3]).toEqual({id: '4', title: 'aaa', isDone: false});

})
test('Task filter should be changed', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC('3', 'todoListId1', true))
    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId2'].length).toBe(2);
    expect(endState['todoListId1'][2].status).toBe(TaskStatus.Completed);
})
test('Task title should be changed', () => {

    const endState = tasksReducer(startState, changeTaskTitleAC('3', 'todoListId1', 'new Title'))
    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId2'].length).toBe(2);
    expect(endState['todoListId1'][2].title).toBe('new Title');
})

test('new property with new array should be added when new todolist is added', () => {


    const action = addTodoAC('new todolist', 'todolistId3')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})


test('property with todolistId should be deleted', () => {


    const action = removeTodoAC('todolistId2');

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});