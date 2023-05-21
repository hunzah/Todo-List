import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksReducer} from './todolist-reducer-tasks';
import {TaskType} from './TodoList';


test('Task should be deleted', () => {

    const startState =
        {
            'todoListId1': [
                {id: '1', title: 'HTML', isDone: true},
                {id: '2', title: 'CSS', isDone: true},
                {id: '3', title: 'REACT/REDUX', isDone: false}
            ],
            'todoListId2': [
                {id: '1', title: 'Bread', isDone: true},
                {id: '2', title: 'Milk', isDone: false},

            ]
        }


    const endState = TasksReducer(startState, removeTaskAC('2', 'todoListId2'))

    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId2'].length).toBe(1);
    expect(endState['todoListId2'].every((t: { id: string; }) => t.id !== '2')).toBeTruthy();
});
test('Task should be added', () => {
    const startState =
        {
            'todoListId1': [
                {id: '1', title: 'HTML', isDone: true},
                {id: '2', title: 'CSS', isDone: true},
                {id: '3', title: 'REACT/REDUX', isDone: false}
            ],
            'todoListId2': [
                {id: '1', title: 'Bread', isDone: true},
                {id: '2', title: 'Milk', isDone: false},

            ]
        }
    const newTask: TaskType = {id: '4', title: 'aaa', isDone: false};
    const endState = TasksReducer(startState, addTaskAC(newTask, 'todoListId1'))
    expect(endState['todoListId1'].length).toBe(4);
    expect(endState['todoListId2'].length).toBe(2);
    expect(endState['todoListId1'][3]).toEqual({id: '4', title: 'aaa', isDone: false});

})
test('Task filter should be changed', () => {
    const startState =
        {
            'todoListId1': [
                {id: '1', title: 'HTML', isDone: true},
                {id: '2', title: 'CSS', isDone: true},
                {id: '3', title: 'REACT/REDUX', isDone: false}
            ],
            'todoListId2': [
                {id: '1', title: 'Bread', isDone: true},
                {id: '2', title: 'Milk', isDone: false},

            ]
        }
    const endState = TasksReducer(startState, changeTaskStatusAC('3', 'todoListId1', true))
    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId2'].length).toBe(2);
    expect(endState['todoListId1'][2].isDone).toBe(true);
})
test('Task title should be changed', () => {
    const startState =
        {
            'todoListId1': [
                {id: '1', title: 'HTML', isDone: true},
                {id: '2', title: 'CSS', isDone: true},
                {id: '3', title: 'REACT/REDUX', isDone: false}
            ],
            'todoListId2': [
                {id: '1', title: 'Bread', isDone: true},
                {id: '2', title: 'Milk', isDone: false},

            ]
        }
    const endState = TasksReducer(startState, changeTaskTitleAC('3', 'todoListId1', 'new Title'))
    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId2'].length).toBe(2);
    expect(endState['todoListId1'][2].title).toBe('new Title');
})



