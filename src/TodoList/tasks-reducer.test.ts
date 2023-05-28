import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducer';
import {TaskType} from './TodoList';
import {TasksStateType} from '../App';
import {addTodoAC, removeTodoAC} from './todolist-reducer';



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


    const endState = tasksReducer(startState, removeTaskAC('2', 'todoListId2'))

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
    const endState = tasksReducer(startState, addTaskAC(newTask, 'todoListId1'))
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
    const endState = tasksReducer(startState, changeTaskStatusAC('3', 'todoListId1', true))
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
    const endState = tasksReducer(startState, changeTaskTitleAC('3', 'todoListId1', 'new Title'))
    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId2'].length).toBe(2);
    expect(endState['todoListId1'][2].title).toBe('new Title');
})

test('new property with new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

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
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = removeTodoAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});