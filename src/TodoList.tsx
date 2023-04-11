import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';
import {Simulate} from 'react-dom/test-utils';
import keyPress = Simulate.keyPress;


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValueType) => void
    addTasks: (title: string) => void

}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        (setNewTaskTitle(e.currentTarget.value))
    }

    const isAddTaskNotPossible = newTaskTitle.length === 0 || newTaskTitle.length > 15
    const onKeyPressHandler =
        isAddTaskNotPossible ? undefined
            : (e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                    props.addTasks(newTaskTitle)
                    setNewTaskTitle('')

                }
            }
    const onClickHandler = () => {
        props.addTasks(newTaskTitle)
        setNewTaskTitle('')
    }

    const titleTooLongWarning = newTaskTitle.length > 15 && <div>title should be shorter</div>


    const onClickAllHandler = () => props.changeFilter('all')
    const onClickActiveHandler = () => props.changeFilter('completed')
    const onClickCompletedHandler = () => props.changeFilter('active')


    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input placeholder={'enter your text'}
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}/>
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={() => {
                        onClickHandler()
                    }}>Add task
                </button>
                {titleTooLongWarning}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickRemoveHandler = () => props.removeTask(t.id)

                        return (
                            <li>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button
                                    onClick={onClickRemoveHandler}>Delete
                                </button>
                            </li>
                        )
                    })}

            </ul>
            <div>
                <button onClick={onClickAllHandler}>All</button>
                <button onClick={onClickActiveHandler}>Active</button>
                <button onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}
export default TodoList;