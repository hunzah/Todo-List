import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';
import {Simulate} from 'react-dom/test-utils';
import keyPress = Simulate.keyPress;


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValueType) => void
    addTasks: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter:FilterValueType

}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        (setNewTaskTitle(e.currentTarget.value))
    }


    const isAddTaskNotPossible = newTaskTitle.length === 0 || newTaskTitle.length > 15
    const onKeyPressHandler =
        isAddTaskNotPossible ? undefined
            : (e: KeyboardEvent<HTMLInputElement>) => {
                setError(null)
                if (e.key === 'Enter') {
                    props.addTasks(newTaskTitle)
                    setNewTaskTitle('')
                }

            }


    const onClickHandler = () => {
    if (newTaskTitle.trim() === ''){
        setError('Title is required')
    } else
        props.addTasks(newTaskTitle.trim())
        setNewTaskTitle('')
    }

    const titleTooLongWarning = newTaskTitle.trim().length > 15 && <div>title should be shorter</div>


    const onClickAllHandler = () => props.changeFilter('all')
    const onClickActiveHandler = () => props.changeFilter('active')
    const onClickCompletedHandler = () => props.changeFilter('completed')


    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input placeholder={'enter your text'}
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error? 'error':''}/>
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={() => {
                        onClickHandler()
                    }}>Add task
                </button>
                {error && <div className={'error-message'}>{error}</div>}
                {titleTooLongWarning}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickRemoveHandler = () => props.removeTask(t.id)
                        const onChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked)

                        }

                        return (
                            <li className={t.isDone? 'is-done':''} key={t.id}>
                                <input type="checkbox" onChange={onChangeCheckBox} checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button
                                    onClick={onClickRemoveHandler}>Delete
                                </button>
                            </li>
                        )
                    })}

            </ul>
            <div>
                <button className={props.filter==='all'?'active-filter':''} onClick={onClickAllHandler}>All</button>
                <button className={props.filter==='active'?'active-filter':''} onClick={onClickActiveHandler}>Active</button>
                <button className={props.filter==='completed'?'active-filter':''} onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}
export default TodoList;